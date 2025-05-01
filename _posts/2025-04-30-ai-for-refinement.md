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

In this post, I'll show you how I use [Cursor Agent Mode](https://docs.cursor.com/chat/agent) to refine UI and polish tests — fast, visually, and interactively.[![cursor logo]({{ "/assets/cursor-logo.jpeg" | relative_url }}){:class="long-excerpt-image"}](https://www.cursor.com/) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}

<!-- Ends the excerpt text, it includes the image -->


_It's a natural follow-up to our scaffolding with Claude Code, and a powerful tool for targeted improvements. Check out [AI Architecture and Scaffolding with Claude Code]({{ site.baseurl }}{% post_url 2025-04-23-ai-as-architect %}) in the [AI development Mindset: Coach]({{ site.baseurl }}{% post_url 2025-04-16-ai-developer-mindset %}) series. We continue from our scaffolding the project with help from [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)._

# UI Edits with Screenshots

Cursor's multi-modal capabilities are extremely undervalued. Screenshots help your coworkers understand what you're aiming for, and Cursor is no exception! Here's my typical workflow:

1. Take a screenshot of the current app
2. Take a screenshot of the design
3. Prompt with specific changes:
   > "Make the app look more like the design. Flatten the form header, move the input to the left, and use the brand color for the background."

I iterate with more screenshots and feedback:

{: .example-image-container }
![Cursor Agent Example with this blog posts styling issues]({{ "/assets/cursor-image-agent-example.png" | relative_url }})


# Refactoring and Test Updates

Cursor's also great for test updates and refactoring. I often ask:
> "Make @this_test.exs work like @my_gold_standard_test.exs. Share test setup. Reduce file length, keep coverage."

Just like UI edits, focused prompts and examples help.
When context matters (e.g., not using `Mox` in Elixir tests), [Cursor Rules](https://docs.cursor.com/context/rules-for-ai) let you inject project-specific instructions. If you want a deep dive, this article ([You are using Cursor AI incorrectly...](https://ghuntley.com/stdlib/)) and [this case study]((https://ihorkatkov.github.io/blog/2025/from-skeptic-to-ai-believer/)) were really impactful to me.

# The Review Process

As with Claude Code, I review each diff like a PR. Feedback goes directly into the prompt. I stage the changes I like. I commit once a full thought is resolved. Cursor's addition is the ability to reference Rules, and Notebooks where you can store extra context and even directly reference functions by starting to type `@function_name` and it will auto suggest as you type.

# Knowing When to Stop

Eventually, you'll hit the wall: if the change is small, tedious, or personal-style-based, stop asking AI and do it yourself. There are diminishing returns as code changes get smaller. More specific changes need more description and start changing fewer and fewer lines, you will cross a point where you need to type more than the the changes that you know how to code.

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

<div class="substack-button" style="text-align: center; margin: 2em 0;">
  <a href="https://sylverstudios.substack.com/?r=1u7tgy&utm_campaign=pub-share-checklist" class="button" style="display: inline-block; padding: 0.8em 1.5em; background-color: #FF6719; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background-color 0.2s;">Visit Substack to Subscribe</a>
</div>

Praise the editor: [Sam Roberts](https://github.com/samgqroberts) 