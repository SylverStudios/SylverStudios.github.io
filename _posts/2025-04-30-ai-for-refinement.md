---
layout: post
title: Iterate and refine with the Cursor Agent
date:   2025-04-30 7:00:00 -0500
categories: blog
tags: [ai, cursor, ui, refactoring]
author: Aaron
author_twitter: shamshirz
image: /assets/cursor-logo.jpeg
---

I walk through using [Cursor in Agent Mode](https://docs.cursor.com/chat/agent) to refine and polish work.[![cursor logo]({{ "/assets/cursor-logo.jpeg" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://www.cursor.com/) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->

This is a follow-up to [AI Architecture and Scaffolding with Claude Code]({{ site.baseurl }}{% post_url 2025-04-10-ai-as-architect %}) in the [AI development Mindset: Coach]({{ site.baseurl }}{% post_url 2025-04-09-ai-developer-mindset %}) series. We continue from our scaffolding with [Claude Code]() to making refined changes, and for that I switch to Cursor. It's fast, visual, and great for polish. Let me show you how I use it for targeted refinement, UI updates, and test polishing.

# UI Edits with Screenshots

Cursor's multi-modal capabilities are extremely undervalued. Screenshots help your coworkers understand what you're aiming for, and Cursor is no exception! Here's my typical workflow:

1. Take a screenshot of the current app
2. Take a screenshot of the design
3. Prompt with specific changes:
   > "Make the app look more like the design. Flatten the form header, move the input to the left, and use the brand color for the background."

I iterate with more screenshots and feedback:
> "This is what the app looks like after that change. Compare again and align the button with the title, and remove the top padding."

# Refactoring and Test Updates

Cursor's also great for test updates and refactoring. I often ask:
> "Make @this_test.exs work like @my_gold_standard_test.exs. Share test setup. Reduce file length, keep coverage."

Context can be especially valuable here, I often find Cursor's agent turning to Elixir testing with the `Mox` library despite not using it. Cursor has it's own system for specific context injection through [Cursor Rules](https://docs.cursor.com/context/rules-for-ai) to address things like that once and for all! If you're interested in getting real deep on Cursor Rules, I found this article really impactful - [You are using Cursor AI incorrectly...](https://ghuntley.com/stdlib/) and a seperate user's [implementation example](https://ihorkatkov.github.io/blog/2025/from-skeptic-to-ai-believer/).

# The Review Process

As with Claude Code, I review each diff like a PR. Feedback goes directly into the prompt. I stage the changes I like. I commit once a full thought is resolved. Cursor's addition is the ability to reference Rules, and Notebooks where you can store extra context and even directly reference functions by starting to type `@function_name` and it will auto suggest as you type.

# Knowing When to Stop

Eventually, you'll hit the wall: if the change is small, tedious, or personal-style-based, stop asking AI and do it yourself. There are diminishing returns like Claude Code. Cursor is much faster, but I've annecdotally had it get stuck in more hopeless change loops. More specific changes need more description and start changing fewer and fewer lines, you will cross a point where you need to type more than the the changes that you know how to code.

{: .callout }
> Stop when your explanations are getting longer and changes are getting smaller.

# Heuristics for Success

1. **Use Visual Context**
   - Screenshots are worth a thousand words
   - Show before and after states
   - Reference existing patterns

2. **Keep Prompts Focused**
   - One change at a time (I cheat with numbered lists)
   - Be specific about what to change
   - Reference existing code

3. **Know Your Limits**
   - Stop when prompts get too long
   - Switch to manual changes for small tweaks
   - Use AI for what it's good at (css)

# The Bottom Line

Cursor shines when you need to turn good-enough code into nearly-production-ready polish—without writing every line yourself. It's uniquely powerful for UI work with images. and test refinement for UI, where visual context and pattern matching are key. If you liked this series, send word! I'm excited to share more if it's valuable to folks out there (or future me as well).

Praise the editor: [Sam Roberts](https://github.com/samgqroberts) 