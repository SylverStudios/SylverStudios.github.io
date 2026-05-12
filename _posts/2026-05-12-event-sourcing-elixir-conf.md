---
layout: post
title: "What Event Sourcing Changed in My Head"
date: 2026-05-12
categories: blog
tags: [elixir, phoenix, liveview, event-sourcing, elixirconf, architecture, commanded]
youtubeId: HN7kaWljVik
image: /assets/images/elixir-conf-small.jpg
author: Aaron
author_twitter: shamshirz
---
[![ElixirConf 2025 — LiveView & event sourcing talk]({{ "/assets/images/elixir-conf-small.jpg" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://www.youtube.com/watch?v=HN7kaWljVik&t=49s) My ElixirConf talk is on YouTube. The bigger shift for me since then is how we *frame* problems. Not whether we pick CRUD or events. {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text -->

It's been about six months since I spoke at ElixirConf 2025 and the recording is finally on YouTube. It's good to look back and notice how my perspective has shifted since then.

{% include youtubePlayer.html id=page.youtubeId start=49 %}

---

### More than where the data lives

Event Sourcing as an architecture pattern is great, but the biggest win is that it's changed the way I, and my team, view problems and think about development. It's one of those things that you don't notice is changing and then when you look back, you can't believe you didn't see it. It's a bit more reflective, but not unlike the sensation of understanding recursion for the first time.

To oversimplify, before practicing ES I would think of user problems and the product in terms of "what data and where does it live." eg. we do an interview and find out users are dying to create reminders for themselves to help them remember to follow up with people if we haven't heard from them in a while. When my only lens was CRUD, I would often jump right past what users need to accomplish and what outcome they need and start thinking about what data is required for a reminder, and what associations it needs to link to different tables in the app. When there was only 1 path forward, I didn't even realize I was skipping questions that I ought to be asking myself. Now, because I might want to design this as a traditional CRUD or as events, there is a technical reason to investigate what the impact to the user should actually be, and what action is happening, the data comes after solving that problem.

### It's always the journey, not the destination

I previously thought not all problems were a good fit for ES with the aim of finding a way to decide that quickly. That's where I was looking for the wrong thing; the work I was trying to skip was the value. What's valuable to me now is the interrogation of the problem to decide if we should go with CRUD or ES, not which one ends up a better fit. Since discovering this, we've been building better understandings of our users' problems and we have a more capable vocabulary to discuss them.

If you're Event Sourcing curious, check out the talk. I talk about our experience from the first year, and the benefits to your business and eng team. Beware: it will persuade you to implement event sourcing at your job, or find some place that you can. Let me know what you think, if enough folks watch, then maybe YouTube will notice my copyright infringement and wouldn't that be a great sign of success 😉

<div class="substack-button" style="text-align: center; margin: 2em 0;">
  <a href="https://sylverstudios.substack.com/?r=1u7tgy&utm_campaign=pub-share-checklist" class="button" style="display: inline-block; padding: 0.8em 1.5em; background-color: #FF6719; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background-color 0.2s;">Visit Substack to Subscribe</a>
</div>
