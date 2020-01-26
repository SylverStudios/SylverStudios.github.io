---
layout: post
title: "My Favorite Artists And You Can Too!"
date: 2020-01-24 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/spotify.png
---

Sharing my recent Spotify 🎧 favorites with Elm and AWS
![Spotify Logo]({{ "/assets/spotify/spotify.png" | relative_url }}){:class="excerpt-image"}


<!--more-->
I love Spotify. My music taste can often give a better summary of myself than I can. Conveniently, they also have a nice API that can make sharing that with your friends pretty easy too 😏

This year a friend and I shared past playlists as a way to catch up and realized they were a great way to journal. The best way to share that time and experience with each other was to listen to the playlists on our own and at our own pace. This was a surprising, no-pressure way to share myself and I wanted to explore it even more.

## Live Sharing

How can I share a snapshot of myself, without it becoming dated, and without it being an overwhelming task? So far, I had the core data about me - Spotify - and the idea that I wanted it to stay current. There is a very suitable API for the task that will give a list of your most listened to artists over a time range. I found this to be a great starting point. I broke down my wild ideas into a project scoped for a reasonable amount of time and ended up with a serverless API to fetch my top Spotify artists plus a UI widget for the blog to display it 👇. [See how on our Github](https://github.com/SylverStudios/spotify-highlights)

{% include spotifyArtists.html %}


## How it Works

The structure is a Lambda wrapper around the Spotify API. I used an API gateway to expose the lambda, and a DynamoDB table to store the Api token. This way, the only origin that can hit the API is our website, and the lambda knows how to handle authenticating with Spotify! That decoupled the serverless-side from the UI, which is a tiny Elm app that knows how to request and decode from the AWS endpoint.

`Elm -> API Gateway -> Lambda (DynamoDB) -> Spotify API`

## Lessons Worth Remembering

The AWS setup and the Spotify authentication both ended up taking more time and brain power than I was expecting, but were manageable tasks. Josh Spicer wrote a fantastic & detailed post about his process making a similar Serverless Spotify tool that was great for getting through some of that ([Spotify "Now Playing" with AWS Lambda](https://joshspicer.com/spotify-now-playing)).

After adding the DynamoDB table, I started to worry about all of the AWS resources that I had setup and how to keep that work organized. I discovered the AWS [Serverless Application Model - SAM](https://aws.amazon.com/serverless/sam/) and the [Sam Cli](https://github.com/awslabs/aws-sam-cli). Together, these allow you to define your serverless stack in a single config file and deploy via the CLI. This was a game changer in many way.


* Codified the Project Boundaries
* Easily Reproducible (**Infrastructure as Code**)
* Sped up Development, Testing, and Deployment
* My inner Engineer and PM were in Alignment 😊

A secondary part of this project was to practice some non-technical skills around scoping and attempting to write blog posts __before__ doing the fun technical tasks. I'm still reflecting on the success of those, but I would highly suggest giving [Shape Up](https://basecamp.com/shapeup/1.1-chapter-02) a read if you're also interested in practicing your ability to get work out the door.


### Other Resources

* [Api Gateway](https://aws.amazon.com/api-gateway/)
* [Lambda](https://aws.amazon.com/lambda/)
* [DynamoDB](https://aws.amazon.com/dynamodb/)