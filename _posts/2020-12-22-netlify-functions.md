---
layout: post
title: "Using Netlify Functions & Spotify API"
date: 2020-12-22 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/spotify/netlify-full-logo-light.svg
---

Revamping my [Spotify post]({{ site.baseurl }}{% post_url 2020-01-24-my-favorite-artists %}) to use Netlify Functions.
![Spotify Logo]({{ "/assets/spotify/netlify-full-logo-light.svg" | relative_url }}){:class="excerpt-image"}

<!--more-->
[Netlify Functions](https://docs.netlify.com/functions/build-with-javascript/#unbundled-javascript-function-deploys) piqued my interest this year and I re-implemented an AWS serverless API to test them out! The existing project is described in [this post from Jan 2020]({{ site.baseurl }}{% post_url 2020-01-24-my-favorite-artists %}), where I set up Dynamo, API Gateway, Lambda, and IAM Permissions for a ~80 line Lambda.

My hunch was that Netlify Functions would simplify getting a serverless function deployed. In addition, one of the original problems was that Spotify provides a new refreshed token every hour, so I had set up DynamoDB to store that key. My hypothesis is that single Key Value store could be replaced by having Netlify cache the result of the lambda and only expire it once a day.

<!-- Includes header, styling, & link to the Repo -->
{% include spotifyArtistsV2.html %}

☝️ Live! `Elm -> Netlify function -> Spotify API`

## Scoping the Project
1. Learn Netlify functions and remove the AWS serverless boilerplate.
2. Re-architect the solution to not need a DB.
3. I'd like to do the whole thing in a few days!


### Cache Netlify Function Results
The API token expired more frequently than the Spotify Data itself! I wanted to prove that Netlify would cache results so I would only need to execute the lambda once a day. If I could prove that, then the Lambda could always request a refreshed token and I wouldn't have to feel as bad about the API pressure I was putting on Spotify.

Luckily, Netlify has a [great starter repo](https://github.com/netlify/functions) that you can fork and it deploys immediately. Here is a demo app proving that caching on the server works - [Netlify Cached Function Example](https://github.com/shamshirz/netlify-functions-example/blob/master/src/lambda/cached.js)

![dev tools displays cached request age]({{ "/assets/spotify/cachedByNetlify.png" | relative_url }})

### Call Spotify API
The first step was to write the Spotify request for a Node runtime. It only took [about 50 lines](https://github.com/SylverStudios/SylverStudios.github.io/pull/44) and that was all Netlify needs to deploy a function! Netlify can deploy [Unbundled Javascript Functions](https://docs.netlify.com/functions/build-with-javascript/#unbundled-javascript-function-deploys) which cuts code because we don't need to worry about a build process. A huge perk here is that your repo ends up with only the most essential code, as a trade-off, because Netlify does so much for you behind the scenes, it moves some of development feedback into Netlify logs instead of your locally environment.

[SylverStudios Github.io repo](https://github.com/SylverStudios/SylverStudios.github.io/pull/44)
```javascript
exports.handler = async (event, context) => {
  return getAccessToken()
    .then(result => { return getTopArtists(result.body) })
    .then(success => {
      // Tell netlify to cache this response if possible
      success.headers = {
        'Cache-Control': 'max-age=86400, public',
        'content-type': 'application/json'
      }
      return success
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
};
```


## Results

When looking at the completed function, it's amazing to see how far serverless offerings have come in 1 year! Last year when working with the Serverless CLI and AWS directly, it was do-able, but there was a lot to manage and a lot of opportunity for error.

This repo has the single file of code that's important to the app and that's it! Overall, the experience was really easy. There are a lot of different examples and docs out there and it's easy to find ones that are out of date, but the overall simplicity of what "serverless" means in terms of Netlify has been a real joy.


### Resources
* [Netlify Functions](https://docs.netlify.com/functions/build-with-javascript/#unbundled-javascript-function-deploys)
* [AWS Serverless Spotify Post]({{ site.baseurl }}{% post_url 2020-01-24-my-favorite-artists %})
* [Netlify Example Functions Repo](https://github.com/netlify/functions)
* [Blog Post PR w/ Netlify Function](https://github.com/SylverStudios/SylverStudios.github.io/pull/44)
* [Elm code to display Spotify Data](https://github.com/SylverStudios/spotify-highlights/tree/master/ui)
