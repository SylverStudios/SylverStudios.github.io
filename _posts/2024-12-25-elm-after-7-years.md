---
layout: post
title:  "What I learned from 7 years of Elm Development"
date:   2024-12-25 12:00:00 -0500
categories: blog
author: Aaron
author_twitter: shamshirz
image: /assets/elm/elm.webp
---
My development perspective on using Elm, and when it will serve you. [![Elm-lang logo]({{ "/assets/elm/elm.webp" | relative_url }}){:class="excerpt-image"}](https://elm-lang.org)

**Note about Shamshirz**

*This post reflects my experience working extensively with [Elm](https://elm-lang.org) at a [B2B insurance startup](http://corvusinsurance.com/) from 2017 to acquisition in 2024, as the 2nd Engineer.*

I'm looking at a new year of big changes and I want to share my appreciation and advocacy through reflection. Elm is my Gold Standard, best in class UI development kit. I had experience with SSR templating languages, vanilla JS sites, and React just prior to picking up Elm. Elm was my introduction to a pleasant type systems (👎 Java). The type system is friendly, clarifies thinking, and it provides the best feedback loop I’ve experienced in engineering. I learned that Elm can be rocket fuel and I hope to articulate the the conditions for success that we encountered. Elm isn’t without its limitations, but allow me to convince you why it's worth it, dear reader.

## Why Elm Shines
The type system is simple and delightful. The compiler is fast, capable, and descriptive enough to be a coding assistant without the need of an LLM. Problem solving is mostly modeling types to reflect your needs and the code writes itself. The biggest hurdle is adapting to the syntax the flow of data. The language is small! Once you are past basics, you can participate in any discussion and I always found it fun to iterate, learn, and improve. We even found that it was unnecessary to write tests. 

Running Elm in production genuinely changed how I saw front end development. The compiler’s feedback was the end of the loop, rather than manual UI testing after a change. The compiler will assert whether you’ve covered every possible case and handled every operation that could fail. The implications are enormous and easily overlooked. No debugging in the browser locally, in Staging, in Production, or trying to reproduce a problem a user saw in their browser. It’s very hard to truly appreciate the lack of something found in many little moments, but the overall impact was profound. I didn’t view UI work as tedious and error prone. The only negative that I experienced was that Elm became “boring”, it didn’t need me. I had complete confidence that Elm could guide new engineers to success and adding my experience wouldn’t bring any added benefit. I subscribe to Dan McKinley's ideal of [“boring technology”](https://mcfunley.com/choose-boring-technology) being a good thing that allows you to put energy elsewhere. We know when Elm shines and we know it's failure modes quite well. The important decision to make is whether you are willing to accept the trade that Elm requires in order to benefit.

## Trade-offs to consider
Elm is wonderful because of it’s set limitations. To guarantee the error free runtime, you can’t just include browser friendly JS libraries. Everything external to the runtime has to go through a [Port](https://guide.elm-lang.org/interop/ports) ("Ports allow communication between Elm and JavaScript"). This is doable, but it is not pretty code, it is not fun work, and we implemented them very infrequently. This is partially due to not needing as much as we expected from outside of Elm, but it was undoubtedly a barrier as well. We got by with simple ports for graphql subscriptions (pubsub) and page scrolling, but as others benefit from things like WebSocket, you will notice the inaccessibility.

We ran into issues occassionally, but compared to experiences with other frameworks it was a _much_ smaller drag on our productivity. We had a compiler slowdown that impacted development, but Evan Czaplicki, the creator of Elm, gave us some input to resolve it. We got massive benefits from the elm-graphql library (generates an Elm SDK for our graphql API), but it was a big implementation cost and still isn’t intuitive enough for engineers to grok quickly.

For Elm or any UI framework, the accidental complexity, [popularized by Fred Brooks](https://en.wikipedia.org/wiki/No_Silver_Bullet), that comes with a separate build system for UI should to be considered. I continue to learn this lesson regularly. This is maintenance and time to your build pipeline. This was not obvious to me when we started with a SPA build step, but since the rise of Elixir LiveView I can’t stop seeing the added burden of a separate UI framework.

## 10/10
If the limitations are acceptable for the project I’m working on, then Elm is my preferred way to develop UI. When I prototype, it’s most often with Elm. I spend my time thinking through the types and what I really want to accomplish rather than chasing around errors. It folds well into my dev environment too. I use (and adore) the [cursor](https://www.cursor.com) editor, and with Elm’s compiler, I can immediately feed it back to the LLM and I generally get away with having a conversation with the composer tool and no coding needed 🤯.

Elm is a walled garden for better or for worse. I love that it hasn’t needed any changes, bug fixes, or updates to keep working perfectly. It feels frozen in amber, in a perfect working state. You can achieve business and personal success with Elm. It got us to an acquisition and the reliability and dev satisfaction far out-weighted the limitations. If you’re an engineer seeking a delightful UI experience, I can’t recommend Elm enough. Especially if you are new to [Functional programming](https://en.wikipedia.org/wiki/Functional_programming) or [Static Typing](https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages), this is a beautiful way to learn.

*If you’ve had a different experience to share or you’d like specific details or just to chat, send me an email: X.*