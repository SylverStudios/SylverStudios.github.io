---
layout: post
title:  "What I learned from 7 years of Elm Development"
date:   2025-01-12 6:00:00 -0500
categories: blog
author: Aaron
author_twitter: shamshirz
image: /assets/elm/elmLogo1.png?v=1
---
My development perspective on using Elm, and when it will serve you. [![Elm-lang logo]({{ "/assets/elm/elmLogo1.png" | relative_url }}){:class="excerpt-image"}](https://elm-lang.org/)

**Note about Shamshirz**

*This post reflects my experience working extensively with [Elm](https://elm-lang.org/) at a [B2B insurance startup](http://corvusinsurance.com/) from 2017 to acquisition in 2024, as the 2nd Engineer.*

I'm looking at a new year of big changes and I want to share my appreciation and advocacy through reflection. **Elm is my Gold Standard, best in class UI development kit.** I had experience with SSR templating languages, vanilla JS sites, and React just prior to picking up Elm. Elm was my first introduction to a pleasant type systems (👎 unlike Java). The type system is friendly, clarifies thinking, and provides the best feedback loop I’ve experienced in engineering. I learned that Elm can be rocket fuel and I hope to articulate when I saw it accelerate us as well as when I saw the signs that it may not be the best fit. Elm isn’t without its limitations, but allow me to convince you why it's worth it, dear reader.

## Why Elm Shines
The type system is simple and delightful. The compiler is fast, capable, and descriptive enough to be a coding assistant without the need of an LLM. Problem solving is mostly modeling types to reflect your needs and the code writes itself. The initial hurdle is adapting to the syntax and the flow of data through the Model, Update, and View functions. The language is small! Once you’re past the basics, you’ll find it easy—and fun—to dive into discussions and improve your work. In contrast, the JS ecosystem often demands familiarity with language oddities, dependency sprawl ([leftpad](https://en.wikipedia.org/wiki/Npm_left-pad_incident)), and each author’s unique style. Elm avoids this entirely. A standard formatter ensures consistent, readable code across all projects. The compiler’s precision was so effective that we rarely felt the need to write tests.

**Running Elm in production genuinely changed how I saw front end development.** The compiler’s feedback was the end of the loop, rather than manual UI testing after a change. The compiler will assert whether you’ve covered every possible case and handled every operation that could fail. The implications are enormous and easily overlooked. No debugging in the browser locally, in Staging, in Production, or trying to reproduce a problem a user saw in their browser. It’s very hard to truly appreciate the lack of something found in many little moments, but the overall impact was profound. I didn’t view UI work as tedious or error prone. The only negative that I experienced was that Elm became “boring”;it didn’t need me. I had complete confidence that Elm could guide new engineers to success and adding my experience wouldn’t bring any added benefit. I subscribe to Dan McKinley's ideal that [“boring technology”](https://mcfunley.com/choose-boring-technology) is a good thing that allows you to put energy elsewhere. We know when Elm shines and we know it's failure modes quite well. Elm's static nature and tiny language size make it surprisingly "boring" without the need for dozens of years of use like Postgres. The important decision to make is whether you are willing to accept the trade-off that Elm requires in order to benefit.

## Trade-offs to consider
Elm is wonderful because of its limitations. One amazing property of Elm is that it guarantees zero runtime errors. To provide that guarantee you aren’t allowed allowed to integrate JS directly into the Elm runtime. Everything external to the runtime has to go through a [Port](https://guide.elm-lang.org/interop/ports). This is doable, but the code that ports require is not pretty and is not fun to work with. We implemented them very infrequently in part because we didn’t need as much from outside of Elm as we expected, but undoubtedly also because of the difficulties of working with them. We got by with simple ports for GraphQL subscriptions and page scrolling, but as others benefit from things like WebSockets and you miss out, you will notice the inaccessibility of advancements made outside of Elm.

**We ran into issues occasionally, but compared to experiences with other frameworks it was a *much* smaller drag on our productivity.** We had a compiler slowdown that impacted development, but [Evan Czaplicki](https://x.com/evancz?lang=en&mx=2), the creator of Elm, gave us some input to resolve it. We got massive benefits from the [`elm-graphql`](https://github.com/dillonkearns/elm-graphql) library (generates an Elm SDK for our GraphQL API), but it was a big implementation cost and still isn’t intuitive enough for engineers to grok quickly.

For Elm or any UI framework, the accidental complexity, [popularized by Fred Brooks](https://en.wikipedia.org/wiki/No_Silver_Bullet), that comes with a separate build system for UI should to be considered. I continue to learn this lesson regularly. This is maintenance and time to your build pipeline. This was not obvious to me when we started with a SPA build step, but since the rise of Elixir LiveView I can’t stop seeing the added burden of a separate UI framework.

## 10/10
If the limitations are acceptable for the project I’m working on, then Elm is my preferred way to develop UI. When I prototype, it’s most often with Elm. I spend my time thinking through the types and what I really want to accomplish rather than chasing around errors. It folds well into my dev environment too. I use (and adore) the [cursor](https://www.cursor.com/) editor, and with Elm’s compiler, I can immediately feed it back to the LLM and I generally get away with having a conversation with the composer tool and no coding needed 🤯.

Elm is a walled garden, for better or for worse. I love that it hasn’t needed any changes, bug fixes, or updates to keep working perfectly. It feels frozen in amber, in a perfect working state. You can achieve business and personal success with Elm. It got us to an acquisition and the reliability and dev satisfaction far out-weighed the limitations. **If you’re an engineer seeking a delightful UI experience, I can’t recommend Elm enough.** Especially if you are new to f[unctional programming](https://en.wikipedia.org/wiki/Functional_programming) or s[tatic typing](https://stackoverflow.com/questions/1517582/what-is-the-difference-between-statically-typed-and-dynamically-typed-languages), this is a beautiful way to learn.

{: .note }
> Have thoughts to share? Want to learn more details? I'd love to hear from you! [Send me an email](mailto:aaron.a.votre@gmail.com)

*my editors: [RJ Dellecese](https://github.com/rjdellecese) and [Sam Roberts](https://github.com/samgqroberts)*