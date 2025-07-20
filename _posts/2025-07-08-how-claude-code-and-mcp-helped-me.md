---
layout: post
title: How Claude Code and MCP Helped Me Build a Custom Phoenix 404 Page
date:   2025-07-08 1:00:00 -0400
categories: blog
tags: [ai, claude, claude-code, mcp, phoenix, puppeteer, automation, tutorial]
author: Aaron
author_twitter: shamshirz
image: /assets/puppeteer-logo.png
---

Agents have changed how I code. The slowest part of the dev loop is now me! [![puppeteer logo]({{ "/assets/puppeteer-logo.png" | relative_url }}){:class="excerpt-image" style="border-radius: 8px; width: 80px; height: auto;"}](https://pptr.dev/) {%- if page.tags -%}{% for tag in page.tags %}<a href="{{site.baseurl}}/archive.html#{{tag | slugize}}">#{{ tag }}</a> {% endfor %}{%- endif -%}
<!-- Ends the excerpt text, it includes the image -->

In my [Cursor post]({{ site.baseurl }}{% post_url 2025-04-30-ai-for-refinement %}), I demonstrated how I utilized a verification script to assist Claude Code in verifying its work. However, until recently, UI changes still required me to manually run the server and take screenshots, which I would then share with Cursor along with feedback. Note that this was still a significant improvement, as it could now perform the design UI iteration with screenshots.

I've been [MCP](https://www.anthropic.com/news/model-context-protocol) curious, but I had not, until now, seen a valuable practical application. Enter [Puppeteer](https://www.npmjs.com/package/@modelcontextprotocol/server-puppeteer). With a Puppeteer MCP, Claude Code can drive the browser. The agent can navigate, interact, and take screenshots without requiring my intervention. What's significant here is that there's now one fewer step where I am the bottleneck. **Claude can self-review and provide a visual critique, which will then improve before I have to evaluate it manually.**

{: .example-image-container }
![MCP FSM Diagram]({{ "/assets/mcp-fsm.webp" | relative_url }})
{: .figure-caption }
*Top: My previous workflow, Claude can self-iterate via automated tests. Bottom: Current workflow, Claude can self-iterate via tests, and UI QA via Puppeteer. Saving me a step in the process*

Part of my inspiration for this was an article about [Programming with Agents](https://crawshaw.io/blog/programming-with-agents), because it illustrated the importance of enabling feedback and even how a simple `bash` tool is enough to unlock a massive boost in LLM capability. Now to the meat.

# Let's build a custom Phoenix 404

I love the playful 404 pages, like [GitHub's 404](https://github.com/fake-address). I've always wanted to add one to my apps, but the combo of limited artistic ability, time, and it never feeling like a priority prevented me from making one.

Exploring MCP finally gave me the right opportunity. You can try this out in less than an hour. Setting up Puppeteer via NPX was a mix of super simple and, as a result, extremely confusing when it wasn't working. It's just one configuration, and it *should* run. This project is essentially design-driven; it's a public route with no interactivity, providing a perfect example to focus on tooling.

{: .example-image-container }
![404 Example Design]({{ "/assets/404-example.webp" | relative_url }})
{: .figure-caption }
*Left: Mock made by ChatGPT | Center: First attempt from Claude | Right: Finished product*


# Start with a target UX

I brainstormed ideas with ChatGPT and generated an image I liked. You can see it above; ideally, Claude Code can do this for me one day as well. (This took a couple of turns to refine my idea and tweak the design language and art) I gave it info on our business, the tone I was looking for, the thematic style, how I wanted users to feel (*calm*), and what they might already be feeling (*stressed, frustrated, exasperated, desperate*).


# Implement with Claude & Puppeteer

I started a Claude Code session with my design file in my repo and directions that were not clear enough, eventually landing on quite structured instructions and a link to the [Phoenix custom error docs](https://hexdocs.pm/phoenix/custom_error_pages.html). Claude nailed the normal coding challenges, getting a custom error page working in its first prompt and making a nice automated test. This is a huge improvement from the past because it can so effectively read the doc link I provided. It even taught me how they work (skipping the "layout" work that pages use and containing the body and layout in the HTML).

I eventually got good results and an effective self-review by asking for these steps to be followed:

> use puppeteer to visit a specific route `/nonsense`, take a screenshot, compare that screenshot to the design file, make notes of each difference between the images, address the top 3 differences, repeat until the browser looks reasonably close to the design and would provide a nice user experience.

This took a couple of turns as I realized what I was looking for and gave some specific feedback for responsive design, which did a great job with different resolutions.

# I got a 404 I was happy with, and I didn't code.

The agent ran the loop: `code -> browser -> screenshot -> compare -> repeat`. I only nudged it when needed. Phoenix made it easy to wire up, especially by including the docs URL in my instructions. The main point I want to convey is that we're no longer simply generating code with the agent. Instead, the agent now actively participates in development activities. Generating code is just one of its functions, rather than a peripheral tool I use for development. Each piece like this, where I can get out of the loop, brings us closer to the agent-based future.

Bonus: I read a similar article on [Agentic Coding](https://lucumr.pocoo.org/2025/06/12/agentic-coding/), but with a huge emphasis on the speed of your iteration tools. If you're already getting success from things like I mentioned above, this article will take it a step further. This assumes that your AI tooling needs to be able to evaluate its work and revise it; the next goal is then to make that feedback as fast as possible.

If you've been working on your AI workflow, I'd love to hear about it and share ideas. I'm still not entirely convinced that MCPs hold significant value for me right now, but I'm starting to see their potential.

<div class="substack-button" style="text-align: center; margin: 2em 0;">
  <a href="https://sylverstudios.substack.com/?r=1u7tgy&utm_campaign=pub-share-checklist" class="button" style="display: inline-block; padding: 0.8em 1.5em; background-color: #FF6719; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; transition: background-color 0.2s;">Visit Substack to Subscribe</a>
</div>

Praise the editor: [Sam Roberts](https://github.com/samgqroberts) 