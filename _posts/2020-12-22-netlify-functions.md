---
layout: post
title: "A WOrking Title on Netlify Fxns"
date: 2020-12-22 21:02:00 -0500
category: blog
author: Aaron
author_twitter: shamshirz
image: /assets/spotify/spotify.png
---
* Title
* title image


Sharing my recent Spotify favorites with Elm and AWS
![Spotify Logo]({{ "/assets/spotify/spotify.png" | relative_url }}){:class="excerpt-image"}

## What
Use Netlify Fxn to call Spotify API > Providing my own AWS API

## Why
* No need to setup API gateway
* Can skip DynamoDB for key cache (need to prove)
* Can simplify code & deployment by leaning on netlify

## Potential Problems
* Will I call the Spotify API too much?
* Can request caching on Netlify's side remove the need for a DynamoDB

## How
Netlify Fxn
  * Has `client_id` & `refresh_token` as environment variables (build time, not available to the client)
  * Always creates a new `access_token`
    * Downside to this, if we call it frequently we are doing extra work
    * Can we cache the result so the netlify proxy can return the old result

Client side call
`Get /my/netlify/fxn`
  Server Side Call
  (lean on the cache, call lambda unless we already have a valid result)
  From there, server side request to Spotify with creds


things to prove
  1. Can the existing AWS function be simplified to always refresh the access token and be put into a netlify function
  2. Can the Netlify fxn cache be used to only return results sometimes'


Things I need to know
* Netlify - how does their proxy caching work
* Netlify - fxns, how they work, add JS code
* Spotify - might not need to change anything


Prove
  1. ✅ I can run a netlify FXN
  2. ✅ I can cache that result so the fxn isn't run every time the page is viewed
  3. ✅ That fxn can call Spotify and return the right results

To Do
  1. Update Elm UI to call new route (temp)
    * New release on spotify-highlights UI repo
  2. Deploy function with sylverstudios site
  3. Add New Blog post
  4. Update Elm UI to call final route (sylverstud.io domain)
  5. Deprecate last post, replace live component with Photo


What would be the best accomplishment for me?
* New blog post - working view included
* Update to Old Post

## The Stuff
Spotify gives us access to a very suitable API. The goal here is to have something call this API, handle authentication, and bring the results to our blog. Later, I use this goal to scope the work and build this PoC.
<!-- Includes header, styling, & link to the Repo -->
{% include spotifyArtistsV2.html %}


## Thanks

## Resources