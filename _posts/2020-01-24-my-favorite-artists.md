---
layout: post
title: "My Favorite Artists And You Can Too!"
date: 2020-01-24 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/spotify/spotify.png
---

Sharing my recent Spotify favorites with Elm and AWS
![Spotify Logo]({{ "/assets/spotify/spotify.png" | relative_url }}){:class="excerpt-image"}


<!--more-->
This year a friend and I shared past playlists as a way to catch up and realized they were a great way to journal. The best way to share that time and experience with each other was to listen to the playlists on our own and at our own pace. This was a surprising, no-pressure way to share myself and I wanted to explore it even more.

## Live Sharing

How can I share a snapshot of myself, without it becoming dated, and without it being an overwhelming task? So far, I had the core data about me - Spotify - and the idea that I wanted it to stay current.

> [`/top/artists`](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/){:target="_blank"}<br>
> Get the current user’s top artists or tracks based on calculated affinity.

Spotify gives us access to a very suitable API. The goal here is to have something call this API, handle authentication, and bring the results to our blog. Later, I use this goal to scope the work and build this PoC.
<!-- Includes header, styling, & link to the Repo -->
{% include spotifyArtists.html %}


## How it Works

Breaking down this project mostly came down to speed and ease of development. The goal is a product for enjoyment sake, and the highest priority is getting it out the door. The biggest decision is platform; do I want to host a server? what language do I want to write it in (Elixir is my most natural right now)? Cost isn't a huge concern, but maintenance is.

Those questions lead me to [**Lambda**]((https://aws.amazon.com/lambda/){:target="_blank"}) as the backbone (I already use lots of AWS), and I can connect that with an [**API Gateway**](https://aws.amazon.com/api-gateway/){:target="_blank"} & [**DynamoDB**](https://aws.amazon.com/dynamodb/){:target="_blank"} for a fully serverless stack. This also means I can lean on CORs to only allow our website to access the Lambda, saving me a little auth code.

The Lambda is a wrapper around the Spotify API. The API gateway exposes that lambda to our website, and the DynamoDB table stores the Api token. This way, the only origin that can hit the API is our website, and the lambda knows how to handle authenticating with Spotify as my account only. That decoupled the serverless-side from the UI, which is a tiny Elm app that knows how to request and decode from the AWS endpoint.

`Elm -> API Gateway -> Lambda (DynamoDB) -> Spotify API`

## Lessons Worth Remembering

The AWS setup and the Spotify authentication both took more time and brain power than I expected. Josh Spicer wrote a fantastic & detailed post about his process making a similar Serverless Spotify tool that was great for getting through some of that ([Spotify "Now Playing" with AWS Lambda](https://joshspicer.com/spotify-now-playing){:target="_blank"}).


### AWS Resources with SAM

After adding the DynamoDB table, I started to worry about all of the AWS resource setup and organization. I discovered the AWS [Serverless Application Model - SAM](https://aws.amazon.com/serverless/sam/){:target="_blank"} and the [Sam Cli](https://github.com/awslabs/aws-sam-cli){:target="_blank"}. Together, these allow you to define your serverless stack in a single config file and deploy via the CLI. This was a game changer.

* Codified the Project Boundaries
* Easily Reproducible (**Infrastructure as Code**)
* Sped up Development, Testing, and Deployment
* My inner Engineer and PM were in Alignment 😊

### Scoping well saved me

A secondary part of this project was to practice some non-technical skills around scoping and attempting to write blog posts __before__ doing the fun technical tasks. I'm still reflecting on the success of those, and I highly suggest giving [Shape Up](https://basecamp.com/shapeup/1.1-chapter-02){:target="_blank"} a read if you're also interested in practicing your ability to get work out the door.


### Want to know more?

There are a lot of exciting technical bits to this project and realizations made along the way. Send us an email or a comment on the if you want to know more.

* [SylverStudios-Github](https://github.com/SylverStudios){:target="_blank"}
* <a class="u-email" href="mailto:sylverstudiosdev@gmail.com">sylverstudiosdev@gmail.com</a>
