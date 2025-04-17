---
layout: post
title: "AI development Mindset: Coach"
date:   2025-04-16 7:00:00 -0500
categories: blog
tags: [ai, mindset, how-to]
author: Aaron
author_twitter: shamshirz
image: /assets/robot-clipboards.png
---

How I'm thinking about AI development from a new perspective![robots holding clipboards: ai image]({{ "/assets/robot-clipboards.png" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"} {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->

Over the past year, I have transitioned from self-exploration of AI to building an AI adoption plan for a team of 30 engineers and now back to solo daily use of AI. My opinion on what AI offers and how I interact with it has changed dramatically. A change in perspective about collaborating with AI enables the most significant productivity gains.

# Treat AI Like a New Engineer
My most significant improvement in my dev workflow with AI has come from a mindset shift: My AI is a superhuman engineer with zero awareness. A fast, tireless contractor who knows everything except my business, users, and codebase. They just showed up, and I need to manage them.

{: .callout }
> If you wouldn't expect a brand-new dev to succeed without context, you shouldn't expect it from your AI.

You don't have to use AI, just like you don't _have_ to use a new engineer on every project. But if you do, your job is to provide an environment where it can thrive—and to recognize when a task isn't a fit. AI shines with a clear, broad context, a strong feedback loop, and a well-defined goal.

#### 📝 Aside: Be real about what AI is

{: .note }
AI is not magic. That said, it’s not a person, and you need to handle some limitations. It's extremely fast, absurdly knowledgeable, has no business awareness, memory limited to the length of your session, and only "sees" your code base in slivers at a time. That's not a knock—it's just the job description. Accept its strengths and weaknesses, and it can do fantastic work. In general, let your guiding principle be “treat AI like a new engineer,” and be aware of tactics to work within its limitations.

# Tactical Advice for Working with AI

1. **Provide Clear Context**
   - What does your business do, and why does this problem matter?
   - Define clear goals and outcomes
   - Set explicit boundaries and constraints

2. **Review Like a PR**
   - Give specific, actionable feedback
   - Iterate on changes systematically
   - You're a coach, not a mentor, tell it what to do

3. **Know When Not to Use AI**
   - Simple tasks that you already know and can complete as fast as you can type
   - Minor changes very specific to your code base
   - When the change depends on specific data (bug with a specific user in your logs)

```bash
# bad
> "make this controller able to accept a PUT request"

# good - and ideally mostly automatically added
> "Our Customer Service business has an opportunity to accept incoming updates from MegaCorp. 
If we can accept their requests we can save users hours. Their documentation is at mega-corp.net/docs (Tell me if you can't read them)
they will be sending us the Money object via a PUT request, and @nice-example.code is a file that does something similar, implement it like that.
Be sure to use TDD practices and run the @verify script after everychange before you tell me it's done.
"
```

If that example seems long, you're right. This makes a difference, and it's why I script the bulk of that context. AND there comes a point where you will absolutely have diminishing returns because thorough input is so valuable; the result needs to be high value to be worth it.

# The Bottom Line

AI shines with a clear, broad context, a strong feedback loop, and a well-defined goal. I talked about this as it related to Elixir in my last post [Elixir's Advantage in the Era of AI]({{ site.baseurl }}{% post_url 2025-03-15-elixir-ai %}). I've seen some great results so far, and the mindset is what leads to creating the best prompts and the proper context. I will explore using Claude Code for scaffolding and Cursor for polish soon. Stay tuned!

I'm also experimenting with using Substack to provide a newsletter. Let me know if you have any thoughts, and subscribe to get these pushed directly to your HUD contact lenses.

## [Aaron on the Sylverstudios Substack](https://sylverstudios.substack.com/?r=1u7tgy&utm_campaign=pub-share-checklist)


Praise the editors: [Sam Roberts](https://github.com/samgqroberts) & Dan Janowski
