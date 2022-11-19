---
layout: post
title: "Fly.io and Phoenix"
date: 2022-11-18 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/flyBrandmark.svg
---

Experimenting with [Fly.io](https://fly.io) and [Phoenix](https://www.phoenixframework.org/). ![Fly.io Brandmark]({{ "/assets/flyBrandmark.svg" | relative_url }}){:class="excerpt-image"}

<!--more-->

When I explore an idea, I want to test it out all the way through deployment. There is no better way to challenge my assumptions about libraries (ie. comparing HTTP clients) or ideas (SQLite is the future of storage) than working through publishing. Currently, I dread this step because it’s either 💰, headaches or hard work. I can’t speak highly enough of [ngrok](https://ngrok.com) when I share something with friends or treat myself as a real user rather than localhost. I want to go a step further. [Fly's blog](https://fly.io/blog/) has been posting some fantastic material lately and their “inbound” marketing caught me.

My default had been Heroku, RIP free tier, but I never loved the workflow. Specific Elixir alternatives like [Gigalixir](https://www.gigalixir.com) are out there but didn’t catch my attention. On the other end of the spectrum, AWS fills me with mixed feelings of terror and boredom. I hadn’t found a compelling example until Fly.

Making an account and creating the starter app were easy, guided experiences. That’s how it should be, and better than usual, I actually felt equipped to step away from the guide and try on my own. The `fly` CLI is fantastically simple, with great feedback especially while deploying.

"Speed Run" [Fly Docs](https://fly.io/docs/speedrun/)

```sh
brew install flyctl
fly auth signup
fly auth login
fly launch --image flyio/hellofly:latest
```

I budgeted a lot more headaches than I experienced and that convinced me. I had the mental bandwidth left to pursue my other explorations immediately. I experimented with [`floki`](https://hexdocs.pm/floki/Floki.html), [`req`](https://github.com/wojtekmach/req), [Liveview](https://github.com/phoenixframework/phoenix_live_view), and SQLite. Instead of fighting with deployment, I explored those tools in a real app and the extra energy came from Fly providing the platform. If you’re interested in seeing any of those, or just a Fly deployment in the wild, the [repo lives here.](https://github.com/shamshirz/speed)

Fly is my new default playground for exploration and full deployment isn’t a `Maybe DeployPlatform` anymore. I’m stoked to add deployment satisfaction to my normal exploration flow. It used to be such a bother I would skip the joy that comes with allowing real traffic. In hindsight, “no duh” that a tedious deployment process would cause me to lose motivation. #AppCareIsSelfCare

### _P.S._

The experience brought up another feeling. Cognitive dissonance around full-stack applications. I enjoy Elixir, Fly is awesome, I adore Elm, `elm-graphql` is a godsend, and I see the value in Liveview. That said, I struggle to rationalize full-time servers and DB instances in the face of how accessible serverless functions + static sites have become. For my needs, 24/7 service is a waste. I’m exploring these ideas now…

#### _P.P.S._

- I’m not affiliated with Fly.io, I just really them.
- Shout out to my editors 🙇‍♂️ - [RJ Dellecese](https://github.com/rjdellecese) and [Sam Roberts](https://github.com/samgqroberts)
