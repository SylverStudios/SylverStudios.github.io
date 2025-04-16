---
layout: post
title: AI Architecture and Scaffolding with Claude Code
date:   2025-04-23 7:00:00 -0500
categories: blog
tags: [ai, claude, claude-code, architecture, tdd, tutorial]
author: Aaron
author_twitter: shamshirz
image: /assets/anthropic-logo.jpeg
---

I walk through using [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) to plan and start projects.[![anthropic logo]({{ "/assets/anthropic-logo.jpeg" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://www.anthropic.com/) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->

This is a follow-up to better explain my approach to using AI coding tools in [AI development Mindset: Coach]({{ site.baseurl }}{% post_url 2025-04-09-ai-developer-mindset %}). This is how I start projects that are big enough to warrant atleast a 15 minute planning session before starting. I have scripts that I use to handle the rote work described here, but it's really important to talk through (and experience) it first hand to help you build up your own tools. I found this article by Manuel Kießling, [Senior Developer Skills in the AI Age: Leveraging Experience for Better Results](https://manuel.kiessling.net/2025/03/31/how-seasoned-developers-can-achieve-great-results-with-ai-coding-agents/) really similar to how I see a lot of this work and wanted to show what it looks like for my work.

# The Prompt Template

Every session starts with the same context structure:

1. **Business Context**: What does our business do?
2. **App Purpose**: What does our app do?
3. **New Problem**: What are we trying to solve and for who?
4. **Desired Outcome**: What does success look like?

{: .callout }
> Prompt by explaining the business context first. Then define outputs and guardrails.

# The PLAN.md Structure

I have Claude turn this context into a PLAN.md file that includes:

1. A restatement of the context, problem statement, and outcome
2. A milestone breakdown, where each milestone includes:
   - A testable unit of work
   - An automated test to prove it's done

If I already have architectural ideas, I include them. If not, I'll ask for three architecture options—always including one wild-card idea to stretch creativity—before moving to the milestone plan. I use [Claude Code Custom Slash Commands](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials#create-custom-slash-commands) for this, where I have a template plan file including the business context and a real sample project that we did and it was the fully completed PLAN doc that I ended with.

# The Development Loop

Once the plan looks good, I give it the go-ahead: "Start on milestone 1. Use TDD. Update the PLAN.md with progress. And always run the verify.sh script after changes to be sure everything is working." It's important to note that the biggest boost we are unlocking allows Claude Code to make changes, fix them, and continue on it's own until the whole plan is complete, running completely autonomously with no additional input from me for ~5-8 minutes. The plan needs to be clear and the [feedback script](google.com), just all of our deterministic testing/linting/even dev server, is so fast and easy that CC can **self-iterate** accurately and with clear next steps.. This is the Critical Victory that I've seen from CC that Cursor can't match yet.

When the first diff is ready, I treat it like a PR. I review each file and leave feedback in the prompt as a numbered list. I expect working, test-passing code after 1–2 rounds and hitting that or not is a reflection on my ability to prompt.
```
> 1. File A duplicates File B—centralize that logic.
2. Rename ActionItem to NextSteps, and update tests and callers.
3. Use an adapter pattern around the HTTP client—see File D for reference.
4. Refactor UI code to match patterns from File E.
```

# Managing Changes

I stage diffs as I go—if something's mostly right, I keep it but haven't committed yet. That way, I can trace each "chain of thought" to 1 commit, and incremental improvements of that commit are managed through staged diffs. Typically, I get 1–2 commits from this stage. Sometimes I don’t like the changes it makes, which is why I rely on staging to avoid losing anything useful. I drop the incoming changes, and provide the same review with the added context that it was wrong and I removed the changes. You can use anything to solve this, I just find the diff view of staged changes versus unstaged to be the easiest to compare.

# When to Use Claude Code

Claude Code is much slower and more expensive than the Cursor Agent. Even the simplest task will take minutes, not seconds. I often complete a project that's reasonably big ~2-3 PRs and spend $5 to $10. Personally, if this speeds me up 10%, it's easily worth the cost, and I'll multi-task while claude works (🙊). Only accept this overhead while you're making broad or complex changes. Stop when the structure and relationship between files is where you want it, even if you have specific code changes you still want to implement. 

# Time Expectations

For a typical feature, I budget:
- 15m of context + planning
- 30–60m of architecture + initial build
- 30m of refinement (next post)
- 15m of self-review + polish

The reward isn't just speed—it's focus. I get to spend more time making thoughtful decisions and typing boilerplate less. Claude Code takes minutes, not seconds, so I use that to explore a separate change in parallel, read docs, or continue designing the next change. The fundamental change is that I am able to keep my perspective on the level of architecture and code organization more, and implementation less. Next up, I'll walk through what I do after Claude Code, where I really like the Cursor Agent.

Praise the editor: [Sam Roberts](https://github.com/samgqroberts) 