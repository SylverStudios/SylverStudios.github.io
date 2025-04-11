---
layout: post
title:  Coaching AI to Reach Its Potential
date:   2025-04-08 7:00:00 -0500
categories: blog
tags: [ai, cursor, claude-code, how-to]
author: Aaron
author_twitter: shamshirz
image: /assets/elixir-logo.jpeg
---
My experience with AI-assisted coding [![anthropic logo]({{ "/assets/anthropic-logo.jpeg" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://www.anthropic.com/) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->


Over the past year, I went from self-exploration in AI to building a plan for a team of 40 engineers to adopt AI tooling, and now I'm back to working solo - no constraints. My opinion on what AI offers and how I interact with it has changed dramatically. I'll roughly summarize my journey as; asking too broadly for help, lowering expectations and asking really specific questions, raising expectations, and writing very verbose context, and now I'm finally thinking of my AI tooling as if it were a person so that I can put on their shoes. There is a lot of time and learning through that journey, but I want to try and describe to you, dear read, my perspective as it is today, in case you are at a similar place in your journey.

# Treat AI Like a Junior Engineer
The biggest improvement I've made in my dev workflow with AI has come from a mindset shift: My AI is a superhuman engineer with zero awareness. A fast, tireless contractor who knows everything except my business, users, and codebase. They just showed up, and I need to manage them.

{: .callout }
> If you wouldn't expect a brand-new dev to succeed without context, you shouldn't expect it from your AI.

You don't have to use AI, just like you don't _have_ to use a new engineer on every project. But if you do, your job is to provide an environment where it can thrive—and to recognize when a task isn't a fit. AI shines with a clear, broad context, a strong feedback loop, and a well-defined goal. I talked about this as it related to Elixir in my last post [LINK].


#### 📝 Aside: Be real about what AI is

{: .note }
AI is not magic. It's not your coworker. It's not learning your system over time. It's extremely fast, absurdly knowledgeable, has no business awareness, memory limited to the length of your session, and only "sees" your code base in slivers at a time. That's not a knock—it's just the job description. Accept its strengths and weaknesses, and it can do amazing work. But you have to meet it where it is.


It's easy to have AI produce code that you don't want. It's easy to get AI into a place where it is stuck in a loop, solving and unsolving the same wrong problem. It's easy to do the same with a new engineer on your team when they have no context. It's so common to see the wrong problem solved or the right problem solved in an overly complex way. I've been slowly building my dev workflow to prevent these problems. The results have been great, not just avoiding the weaknesses, but making the happy path much happier than I anticipated.

# Stage 1: Context and Design with Claude Code
I use Claude Code to define the work and produce the initial code. Every session starts with the same context; "What does our business do? What does our app do? What's the new problem we want to solve? What's the outcome we want to achieve?" I do that in a Claude command(LINK), but write it once and keep it around as a template.

I have Claude turn this into a PLAN.md file that includes:
	
1.	A restatement of the context, problem statement, and outcome.
2.	A milestone breakdown, where each milestone includes a testable unit of work and an automated test to prove it's done.

If I already have architectural ideas, I include them. If not, I'll ask for three architecture options—always including one wild-card idea to stretch creativity—before moving to the milestone plan. The output is a document that will be the "state" of your work and how an AI tool can keep track of progress.

{: .callout }
> Prompt by explaining the business context first. Then define outputs and guardrails.

Once the plan looks good, I give it the go-ahead: "Start on milestone 1. Use TDD. Update the PLAN.md with progress." When the first diff is ready, I treat it like a PR. I review each file and leave feedback in the prompt as a numbered list. I iterate like this until I like it and usually get to something solid in 1–2 more rounds.

```
> 1. File A duplicates File B—centralize that logic.
2. Rename ActionItem to NextSteps, and update tests and callers.
3. Use an adapter pattern around the HTTP client—see File D for reference.
4. Refactor UI code to match patterns from File E.
```

{: .callout }
Expect working, test-passing code after 1–2 rounds—this is feedback on your input.

I stage diffs as I go—if something's mostly right, I keep it but haven't committed yet. That way, I can trace each "chain of thought" to 1 commit, and incremental improvements of that commit are managed through staged diffs. Typically, I get 1–2 commits from this stage. Claude Code is much slower and more expensive than the Cursor Agent. Only accept the overhead while you're making broad or complex changes.
→ Stop when the structure and relationship between files is where you want it.

# Stage 2: Refine with Cursor and Examples

Once the structure is in place, I move to Cursor for targeted improvements. This is especially great for UI, because Cursor is multi-modal. This is extremely undervalued as far as I can tell, screenshots help your coworkers and Cursor is no exception! I'll take a screenshot of the current app, another of the design, and prompt:

> "Make the app look more like the design. Flatten the form header, move the input to the left, and use the brand color for the background."

For UI, use screenshots. Let AI see what you're aiming for. I iterate with more screenshots and feedback:
> "Align the button with the title, and remove the top padding."

Cursor's also great for test updates and refactoring. I often ask:
> "Make @this_test.exs work like @my_gold_standard_test.exs. Share test setup. Reduce file length, keep coverage."


As in Stage 1, I review each diff like a PR. Feedback goes directly into the prompt. I stage the changes I like. I commit once a full thought is resolved.

Eventually, I hit the wall: if the change is small, tedious, or style-based, I stop asking AI and do it myself. There are diminishing returns as more specific changes need more description and start changing fewer and fewer lines; be aware as that's happening.

{: .callout }
Stop when your explanation is a similar length to the diff.


# AI + Senior Engineers = 💰
I've seen improvements using these broad stages, and the tactical prompting changes. I really want to emphasize that experienced Engineers already bring business context and architectural intuition and that should mean they can squeeze even more out of an AI. I like personal measurement as a tool to understand the impact of my decisions and I have a subjective measure of "quality" that I can't articulate, but keep that constant for myself, my current expectations for myself are:

* 15m of context + planning
* 30–60m of architecture + initial build
* 30m of refinement
* 15m of self-review + polish

The reward isn't just speed—it's focus. I get to spend more time making thoughtful decisions and typing boilerplate less. Claude Code takes minutes, not seconds, so I use that to explore a separate change in parallel, read docs, or continue designing the next change. I'm trying to use it like another engineer on the team.

{: .note }
So much of a PR is subjective, and I hope to get even more specific in the future to post to demonstrate what a 2-hour expectation is.

Praise the editor: [Sam Roberts](https://github.com/samgqroberts)