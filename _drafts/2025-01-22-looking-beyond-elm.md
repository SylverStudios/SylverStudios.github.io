---
layout: post
title:  "Looking Beyond Elm: Why LiveView Is My Next Tool of Choice"
date:   2025-01-22 12:00:00 -0500
categories: blog
tags: [elixir, liveview, phoenix, elm]
author: Aaron
author_twitter: shamshirz
image: /assets/phoenix.jpeg
---
LiveView and why I'm excited to move forward. [![LiveView logo]({{ "/assets/phoenix.jpeg" | relative_url }}){:class="excerpt-image"}](https://hexdocs.pm/phoenix_live_view/welcome.html) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}

<!-- Ends the excerpt text, it includes the image -->


This is a reflection on my [love letter to Elm]({% post_url 2025-01-12-elm-after-7-years %}), to make myself better understand why I'm ready to move forward. I've been watching [LiveView](https://hexdocs.pm/phoenix_live_view/welcome.html) for a long time and it's passed my threshold as an Elm holdout by becoming mature enough to depend on, easy to develop with, and a leader in showcasing the benefits of modern [SSR](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering). As my goals grow and change, I need my toolkit to as well. I'm looking forward at more experimentation and exploration with LiveView as the medium. **LiveView's simplified API, 2-way communication, and end-to-end UI testing makes it the best tool for modern use cases** and I'm stoked to see just how much there is to gain.

I'm excited to push LiveView to explore its potential. The shift to SSR and a unified language for frontend and backend unlocks some incredible benefits. **By removing the separate frontend language and active development of the API layer, the [cognitive load](https://minds.md/zakirullin/cognitive) to create a product is dramatically reduced.** This removes hundreds of lines of code I've come to accept in the past and simplifies the mental model of data flow. These advantages are a result of comfortable SSR templating ([heex](https://hexdocs.pm/phoenix/components.html#heex)) and tight websocket integration, which make the client experience nearly indistinguishable from a traditional SPA. Seamless, real-time updates with server push allow SSR to compete directly with modern JS-driven SPAs. In Elixir, process-driven concurrency makes leveraging these benefits even easier. LiveView assigns an in-memory process to each connected client, allowing seamless communication by sending messages directly to these processes using Elixir's built-in primitives—no special DSL or complex logic required. These all reduce cognitive load and reduce code, which means fewer and faster decisions. Finally, this means faster implementation and better iteration speed.

To be fair to Elm, I'm going to miss it and its unparalleled strengths. The truly unique degree of confidence provided by its error-proof runtime and compile-time checks made it a delight. **Elm excels in building complex UIs in API driven environments.** But for my next chapter, I'm focused on exploring new territory and delivering innovative products, where LiveView aligns perfectly with fast iterations over the stability I loved from Elm.

Every tool has its place, and **LiveView is the right choice for where I'm headed.** Elm is an excellent choice for many scenarios, but my joy comes from providing services that users love, and discovery requires iteration. I'm confident with LiveView I can reduce iteration time, yielding more cycles, faster feedback, and ultimately more progress in less time. I'm excited to see how far LiveView and I can go on this journey.

{: .note }
> Have thoughts to share? Want to learn more details? I'd love to hear from you! [Send me an email](mailto:aaron.a.votre@gmail.com)

*You know em', you love em', my editors: [RJ Dellecese](https://github.com/rjdellecese) and [Sam Roberts](https://github.com/samgqroberts)*
