---
layout: post
title: "Elixir, Remote Agents, Flame, how it's working for us"
date:   2026-03-15 10:00:00 -0500
categories: blog
tags: [elixir, ai, agents, flame, claude-code, infrastructure]
author: Aaron
author_twitter: shamshirz
image: /assets/images/shelly-thumbnail.png
---



### Notes about overall idea
It's not really about symphony, that was just a good catalyst to write the post
The interface being slack is a side note as well, but it sets the practical tone of the project
The Combination of Elixir to manage concurrent processes across the erlang cluster + Fly.io being able to spawn a new short lived, but full machine is the secret sauce




<!-- EXCERPT: one to two sentence hook for the homepage list. Ends before the comment below. -->
[![One Slack message, many ships]({{ "/assets/images/shelly-thumbnail.png" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](#) OpenAI shipped Symphony — an Elixir orchestrator for AI coding agents. It's legitimately well-engineered, and it's a signal that BEAM is the right runtime for this. But we built something that goes a step further. {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text -->

## Symphony Is a Signal <- needs a different title, it's not about symphony
## Remote Agents are all the rage

OpenAI recently released their Elixir agent orchestration library [symphony](link) and it inspired me to share about our internal agent, Shelly. Symphony is a streamlined example of the power of Elixir to run parallel processes, in their model, Symphony listens to external tickets through Linear, and then spawns local Claude agents on the current host in separate processes and separate workspaces. This is an opportunity to keep singing the praises of Elixir loudly and push our momentum. Their project is great because it can be easily run locally as a demo, but I am going to flex how Shelly takes that a step further by doing this remotely with fully provisioned and ephemeral fly.io machines for each code agent.


### 👈 I think i need something here that introduces "shelly"
Also probably being confusing using Shelly, Drake, Ship, and Admiral. need to cleanly define those and maybe simplify - only refer to her as shelly? removes Drake (which is actually the apps name).

<!-- TODO: 1 short paragraph
- OpenAI shipped Symphony — an Elixir-based agent orchestration system
- Polls a Linear board, spins up local workspaces, dispatches Codex agents
- ~96% Elixir, OTP supervision trees, GenServer polling loop, clean reconciliation
- It's legitimately well-engineered — and it proves the BEAM is the right runtime for this
- But we built something that goes a step further
-->

## The Interface Is Slack, Not a Ticket Board

A key product decision that drove us was the need to be extremely accessible to anyone on the team. Similar to Symphony using Linear as a non-technical interface, we are using slack and specifically tagging a slack bot (`@shelly`), and then threading a conversation which cooresponds to it's own deployed code agent, so each Slack thread is a conversation with the same deployed agent. Also, we often have followup questions or feedback and to handle that we keep the agent running so that on additional messages to the thread, the message is routed to the running machine and your get feedback as quickly as if you were running claude code locally.

<!-- TODO: ~2 paragraphs
- Anyone on the team can prompt an agent mid-conversation, naturally, in Slack
- Not just engineers running pipelines — the whole team can ask the agent to take a swing
- No ticket, no dashboard, no state machine — just @-mention Shelly in the thread
- Ship reuse within threads: deterministic voyage_id means follow-up messages reach the same agent
  with full context intact — like talking to a colleague in a thread
- Compare to Symphony: must create a Linear issue in the right project and state; results via ticket state changes
- [TODO: include Slack screenshot if available]
-->

## Each Task Gets Its Own Machine

We targetted individual deployable units to supoort a couple critical elements; scale to zero, consistency with local dev environment, and security. Each agent runs in a freshly created fly.io machine that runs for the duration of that agents work and nothing more. We currently are okay with a cold start and it scales to zero when no one is asking questions at night and as many as we need during the day to handle quick questions, or hour long `plan.md` implementations. We didn't want to create a bespoke environment that we would need to keep in-sync and instead we rely on our `.devcontainer` that we use locally for development. Each agent starts its session up to date with our latest env, preinstalled dependencies, and MCP servers available. Lastly, we have a docker file based from our container that adds linux level user grouping and sets up internet access through a proxy, and all around allows us to heavily restrict access from these machines. We built it with the expectation that malisious code execution is inevitable, and the blast radius should be as small as possible.

<!-- TODO: ~2-3 paragraphs
- Introduce FLAME: Chris McCord's library for running code on freshly spawned machines
  "Think Lambda, but the remote machine runs your entire Elixir app"
- Flow: Slack message → FLAME.place_child → new Fly.io machine boots → full app running
- The single call that makes it happen:
  FLAME.place_child(Drake.Fleet, {Drake.Ship, ship_opts}, link: false)
- Pool config: min: 0 (no pre-warmed runners), max: 10 concurrent machines, one task per runner
- Ships run the full bhdev Docker image: Elixir, Node, Python, Postgres, Playwright + Chrome, git, GitHub CLI
- Because it's the full dev environment, agents can: run the test suite, take browser screenshots, create PRs, post results back to Slack
- Self-terminating after 10 minutes of inactivity — no cleanup required, the machine just goes away
- Compare to Cursor Cloud Agents: same idea of isolated ephemeral sessions, but here the whole app runs on the runner
- Compare to Symphony: workspace-level isolation (directories on a shared host)
-->

```elixir
# Pool config — no pre-warmed machines, fully on-demand
{
  FLAME.Pool,
  # Sir Francis Drake
  name: Drake.Fleet,
  min: 0,
  max: 10,
  max_concurrency: 1,
  idle_shutdown_after: :timer.seconds(30),
  boot_timeout: 120_000
}
```

```elixir
# One function determines the entire startup path
def ship?, do: FLAME.Parent.get() != nil

def start(_type, _args) do
  if Drake.Fleet.ship?() do
    start_ship()   # Empty — FLAME manages the Ship
  else
    start_drake()  # Full supervision tree: FLAME pool, Slack, HTTP
  end
end
```

{: .example-image-container }
![Shelly voyage lifecycle: from Slack message to machine shutdown]({{ "/assets/images/shelly-timeline.png" | relative_url }})
{: .figure-caption }
*The full voyage: one Slack message boots a Fly.io machine, Shelly works autonomously, posts results back, then shuts down after a 10-minute warm window.*

## The Erlang Cluster Is the Superpower

The threat model and security could be many posts on its own, but the coolest part to highlight is that each agent is actually running `claude` through an elixir process (ClaudeCode Lib Link) that is running our application as part of the cluster. That allows the agent to make tool calls that call back to the main node (we call it the admiral) and ask permission, that node may even make API calls with priviledged access and return results to the "ship" (that's what we call agent nodes). As far as claude knows, it just uses the `send_slack` tool and behind the scenes we use elixir to send a message back to the admiral node, the admiral actually sends the slack to the thread associated with that ship. The ship never has a slack token on the machine or in the conversation! We use this pattern with all of the local tools we offer claude that need a credential we don't want pushed to some public git repo.

My teammate John and I got the MVP of this working in 1 week and it's been wild ever since. Not only is it being used by the whole team, but it feels natural! We got really lucky (smart? forward looking? omnipitent?) that we chose the tools that we did because that is really what made this practical. Elixir natively enables clustering that made controlling remote nodes trivial. Fly.io has a streamlined model for deploying apps plus Chris McCord's FLAME (https://hexdocs.pm/flame/FLAME.html) library enable running functions on ephemeral remote machines. I've been waiting for an appropriate usecase for FLAME, and this was absolutely it. Our app monitors all of the remote machines as members of the cluster, and FLAME handles spawning them and destroying the machine via Fly.io's API. The last element was the ClaudeCode (LINK) library that is basically Elixir's Claude SDK. The project is very much not designed as a public project, but this model can be replicated for any environment you'd want an agent to run in.

<!-- TODO: ~1-2 paragraphs
- When FLAME boots a new Fly machine, the new node automatically joins the Erlang distributed cluster
- Symphony doesn't have this — it's isolated processes you're hoping finish
- What cluster membership enables:
  - Main node can see every running agent in real-time (Drake.Voyages.list())
  - Ships can call back to the main node via GenServer.call over Erlang distribution (transparent, typed, pattern-matched)
  - Process monitors work across machine boundaries — ETS cleanup is automatic on ship death
  - PIDs, references, Erlang terms flow freely between nodes with no serialization layer
- The credential isolation story: credentials live only on the main (admiral) node
  Ships request privileged ops via GenServer.call to the Voyage Handler — a compromised ship literally cannot see credentials
- Deploy notification: on deploy, the main node iterates all active voyages and posts
  "This task was interrupted by a deploy. Please re-send your request." to every active Slack thread
-->

```elixir
# Ships call back to the main node for credentials — transparently, across machine boundaries
tool :github_token, "Get a GitHub auth token (valid 1 hour)" do
  def execute(_params, frame) do
    GenServer.call(frame.assigns.admiral_pid, {:tool_call, :github_token, %{}})
  end
end
```

{: .example-image-container }
![Erlang distributed cluster with Drake primary node and FLAME machines]({{ "/assets/images/shelly-architecture.png" | relative_url }})
{: .figure-caption }
*Each FLAME machine joins the Erlang cluster. The primary node (Drake) can observe every running ship and ships call back for privileged operations.*

## Why This Feels Native to Elixir

Reflecting on OpenAI's Symphony, it's so satisfying to see organizations appreciating the power of Elixir for orchestration. I want to emphasize how much further it can be taken. Running multiple agents locally is a great proof on concept. To take advantage of that for the whole team, local distribution boxes you into a single amount of CPU etc that you always pay for whether its being utilized or not and can run out when your whole team wants to get into the fun. The beauty of Elixir clustering is that communicating across nodes is the same whether it's local or across the network! This also means each thread starts with a fresh, perfect state, and no way to impact other running agents (this is the same philosphy of elixir processes).

<!-- TODO: ~1 paragraph
- This isn't bolting agent behavior onto Elixir — it's using the primitives the community already knows
- FLAME, OTP supervision trees, Erlang distribution, GenServer — these aren't workarounds, they're the architecture
- Symphony proved the pattern works. Drake shows it can be extended into something that runs your whole engineering workflow
- The BEAM's process model maps beautifully onto agent coordination: isolated, message-passing, observable, fault-tolerant
-->

## Still Figuring It Out

<!-- TODO: short closing paragraph
- Still in discovery mode — learning what agents are actually good at day-to-day
- [TODO: any numbers to share? Boot times, tasks completed, something that makes it feel real]
- [TODO: mention if claude_code Elixir library is open source — could be a strong community hook]
- Reach out if you're thinking about this space — always happy to compare notes
-->

Shelly has been a great boon to us so far. Our CTO uses it to kick off dev tasks between calls to avoid creating new worktrees for small tasks, our PM uses it to explore new ideas and understand how the system works today, our disaster experts have been using it to improve their day to day when they wish they had a tool (this is not just scaling, these improvements likely wouldn't happen otherwise). Because shelly can run the tests, inspect the browser, etc that we would do locally, the PR quality is just as good as local claude, and now when we have PR feedback, the remote agent can address it! It's not all perfect, but it's more than worth it for us. We see ~2 minute cold starts (our dev container is huge currently, playwright is part of the problem), errors on an agent can be hard to surface, there are network complexities, but overall it's not just a speculative, "this will be worth the investment", it has already paid back the time we've put in after just 4 weeks. I'm toying around with the next phase, which isn't just more MCPs, but specifically linking to things like Sentry to automatically start triage agents, and prod log access so that our agents can self correct their own errors. Not these agents push PRs that we review, we aren't completely unhinged.

If you're interested, reach out! I'd love to chat about this stuff and I'd be happy to write in more depth of share specifics if it's valuable to anyone.


* Symphony link - https://github.com/openai/symphony