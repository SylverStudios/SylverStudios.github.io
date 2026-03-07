---
layout: post
title: "Looking Back, Moving Forward: 2025 Recap"
date:   2026-03-09 10:00:00 -0500
categories: blog
tags: [reflection, ai, career, personal, elixir, agents, claude-code]
author: Aaron
author_twitter: shamshirz
image: /assets/images/elixir-conf-small.jpg
---

[![Speaking at ElixirConf 2025]({{ "/assets/images/elixir-conf-small.jpg" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](#) Gave a conference talk. Overdid it. Took a break. Now, here's what it looks like when coding agents stop being just your tool and become everyone's. {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->

## Been a while
2025 was a whirlwind. Riding the wave of joining [Bright Harbor](https://brightharbor.com/) and a world overcome with AI, I also submit a talk to Elixir Conf USA and got to give it at the end of August. I love speaking events, and it redirected my focus from blogging to conference prep. Despite my AI focus, I actually gave that talk on Event Sourcing in Elixir. In reflection, I overdid it, overcommitted a bit, and spent the end of the year recovering. I've been eager to get back to writing and a bit hesitant because I want to do a better job of pacing myself.

Last year I wrote 9 posts that I'm quite proud of, and they absolutely provided me with the opportunity to write as a form of thinking. This year's goal is to keep it up, and go slower. Writing is a good habit for me and I'm better off pacing myself and making it all year (this is not my natural tendency).


## What changed
I wrote multiple posts on developing with AI, from trying to sell the idea to coworkers and friends in the beginning, to how my mindset had changed and what support can be built for the AI to do a better job. Since then I've been thinking a lot about second order effects on what "development" is. I'm a big believer right now that software engineering isn't a dieing craft, but the way that we practice it most certainly is. I want to explore that more this year. I was so optimistic about AI and I didn't anticipate how much development would change and how fast it would keep happening. For now, I'm preparing myself for more changes to come and starting to think more about what it looks like when the technical challenges are not the bottleneck anymore.


## What's ahead
The central ideas I can't stop thinking about revolve around small teams and building [compounding teams](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents). I've been sold on coding agents since last year, but we've gone beyond that. It's not about how many agents I can run on my laptop anymore—it's about giving that same power to everyone on the team.

My big concern today is "code governance". We have an onslaught of code from engineers and non-engineers. Am I reviewing code for an AI to fix or for a human to consider the product implication? The distinction makes a big difference for how and what we write, as well as what we can expect.

Let me make this concrete. We run Claude Code locally for engineers with all the learnings from 2025; claude.md, tests, feedback scripts. That works great. But we've also deployed remote agents with full dev environments that anyone on the team can prompt, and this is where things get interesting. We're in full discovery mode: what works, what doesn't, and how do we even evaluate success? Expect me to ramble through solutions all year.

{: .example-image-container }
![Slack conversation with Shelly, our AI coding agent]({{ "/assets/images/slack-shelly.png" | relative_url }})
{: .figure-caption }
*Prompting our AI agent in Slack to handle a PR—addressing review comments, merging main, and resolving conflicts. No engineer required.*

The tl;dr dear reader, I'm back, I'm looking forward to an even wilder year, and I'm going to try and write down what I'm thinking more frequently and with less formality. If you are interested to chat, or you have an idea of your own to discuss, I'd love to make time. I had a lot of really good conversations last year with new folks that have wrinkled my brain and I relish the opportunity to entice YOU into that position. I may enjoy networking now.


<div class="substack-button" style="text-align: center; margin: 2em 0;">
  <a href="https://sylverstudios.substack.com/?r=1u7tgy&utm_campaign=pub-share-checklist" class="button" style="display: inline-block; padding: 0.8em 1.5em; background-color: #FF6719; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background-color 0.2s;">Visit Substack to Subscribe</a>
</div>