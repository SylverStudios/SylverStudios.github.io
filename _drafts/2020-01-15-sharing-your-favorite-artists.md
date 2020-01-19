---
layout: post
title: "Sharing your Favorite Artists"
date: 2020-01-15 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/teller-sprite-twitter.png
---

I love Spotify. It captures a reflection of myself that cane be hard to observe. Often my recent music taste can give a better summary of myself than I can. Conveniently, they also have a nice API that can make sharing that with your friends pretty easy too.

<!--more-->

## What I get out of it

Practice. Show part of myself without having to overcome lots of the difficulty of writing personal reflections with external readers in mind.

## Breaking down the project

Some context for these decisions, my main priority is completion of the project rather than ideals. This is as much a project of practicing scoping & prioritization as it is a technical exploration. I already have some experience with AWS, so that's the path of least resistance. We have this static website available, so that's the easiest place to host - aka no server available. That lead to thinking a lambda would be the easiest place to have live code running, and I can have it manage credentials that I don't want the client (this blog post) the have access too.

The easiest way to trigger a lambda is via an [API Gateway](https://aws.amazon.com/api-gateway/). Instead of adding auth to that route, I am going to simply enable Cross Origin Requests from our domain. So the only domain that can make requests to the lambda are this one.

How will we manage the conversation with Spotify? They have a public API, but it requires app credentials and uses refresh tokens. Luckily Lambdas have a really easy way to communicate with [DynamoDB](https://aws.amazon.com/dynamodb/) where we can grab existing keys and update the refresh token periodically.

Last up. We are going to use [Elm](https://elm-lang.org/) to convert the API response into something pretty for the post. I really like elm, and it's an easy target to drop into a static page.

* Setting up AWS for Storage & Security
* Using the Spotify API from a Lambda
* Displaying Spotify Data with Elm

## Architecture

Img here plz

## End Result

Elm here will live data

