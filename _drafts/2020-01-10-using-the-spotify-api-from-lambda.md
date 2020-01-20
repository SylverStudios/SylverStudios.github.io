---
layout: post
title: "Using the Spotify API from Lambda"
date: 2020-01-10 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/teller-sprite-twitter.png
---

Build a serverless stack for accessing the Spotify API from your website

<!--more-->

# Technical In Depth - Lambda

## TODO

* Spotify & Lambda icons for blog image

## What we need to do

* AWS account (on your own)
* Spotify Account & Developer account ([^1])
* Lambda: Request Spotify Data
* DynamoDB: Store Spotify Tokens
* ApiGateway: Allow us to curl our Spotify Data

## Thinking it through

<b>💫 We want our lambda to wrap around the Spotify API so when we hit it, we are returned our recent top 5 artists.<b>


1. Build the right request for Spotify (easy)
2. Pass Spotify API Key (easy)
3. Pass Spotify Refresh Token (medium)


When I'm staring down a a project like this. The first thing I ask myself is, what do I know the least about? I have a plan for the first two, but having a refresh token with an expiration date throws a wrench in the plan. We need to have a way to update the Lambda to use the new token every time it expires.

We have some options; Get a new refresh token every request, Store & update the token where a lambda can access it, Use a different auth strategy, Scheduled lambda to get a new token and update the first lambda.

At the time of writing this, I'm thinking to myself, "being wasteful with a new refresh token every time is a small cost to pay" and I think if I were to do it again, I would do that approach as my MVP. For this example though, I was excited about using Dynamo and stored the key in there. This adds some complexity though. Now we check that our token is still good, and if it's not we request a new one and store it in Dynamo.

Since I hadn't worked with Dynamo in a while, I decided to do some discovery there first. Get as many unknowns out of the way as possible.

### Describing the Infrastructure

We use the AWS Serverless Application Model[^3] to describe our infrastructure as code & deploy that stack using the SAM CLI[^4]. This makes it much easier to keep track of what you're working with and describe the architecture to others. If it's your first time seeing this, don't worry, it was my first time using it too!

Check out the repo here: [Spotify Highlights AWS Code](https://github.com/SylverStudios/spotify-highlights)

This makes it insanely easy to deploy a serverless application stack.
Everything is built in to attach an API gateway to your Lambda and spin up any other resources you need!


### Dynamo

We need a single table and most likely we will have a single entry! (this seems a little crazy, there is probably a more appropriate tool for this job)

We need to store the Refresh Token, the start or expiration time should be all we need, but I'll store both, just in case.

(img maybe?)

### Lambda

Warning: this is not code that should be an example of how to write Python. I'm getting the job done here, and I'm not completely proud of it.

(img - or big code block?)


## References

* [^1]: [Spotify "Now Playing" with AWS Lambda](https://joshspicer.com/spotify-now-playing)
* [^2]: [Spotify Highlights AWS Code](https://github.com/SylverStudios/spotify-highlights)
* [^3]: [AWS Serverless Application Model](https://aws.amazon.com/serverless/sam/)
* [^4]: [AWS SAM cli](https://github.com/awslabs/aws-sam-cli)
* [^5]: [Spotify Authorization Documentation](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
