---
layout: post
title:  "Circuit Simulator: What makes a game?"
date:   2019-02-10 11:15:01 -0500
category: blog
author: Aaron
---
_The story of how we absolutely nailed our first game._
<!-- This is an image, with a class, and on click links to the game :face-palm: -->
[![CircuitGame sample view of 2 logic gates]({{ "/assets/circuitFeatureImage.png" | relative_url }}){:class="excerpt-image"}]({{ site.baseurl }}{% post_url 2019-01-21-circuit-simulator %})
<!-- End excerpt -->

Circuit Simulator really is a _simulator_ for electrical circuits, calling it a sandbox is even a stretch. You can toggle the input and logic gates in the circuit and they you get to see what happens. That's it. Has some cute interactivity, but there really isn't a goal, just, "explore logic! Learning is fun!". A noble cause, but not particularly engaging.


### History

Sam and I picked it up in October of 2015. We had each worked on a few small games, and had planned ideas together, but this was our first time coding together. We decided on the most vanilla JS possible, with a goal of producing something over worrying about pushing our boundaries too much. You can see the origins of these blossoming, young professional devs in the [CircuitGame Repo](https://github.com/SylverStudios/CircuitGame).

Solving circuit diagrams in school was one of the few things I liked about the electrical engineering classes I took, so I figured everyone felt that way :face-palm:. The first pass at circuit simulator was not only impossible, but it was completely devoid of fun. We called it a smashing success.

### Development

It can't be known exactly how the topic came up, but Sam and I were talking about how much fun it would be to make a game about electrical circuits. Much white boarding and coding on the couch together ensued. The really exciting part of development was that each circuit was a Directed Acyclic Graph, which meant Sam and I got to write fun recursive functions. This was the main motivator for the project, we never really thought about how someone might "play" these circuits.

In just a few days, Sam produced a great engine to create solvable circuits. At the same time, I was working on UI generation tool that could traverse the graphs that Sam produced and render a nice little interactive circuit diagram. That was the whole game, given a graph, draw it, toggle the gates and see if they user had won. We had a very loose definition of winning here. We had some serious fire about this project, hence all of the haste to build without much forethought.


### Reception

Somewhere amidst all of this fun and excitement, it turns out the most people don't really like to solve circuit diagrams… I was so enamored by the nice Paintbrush created logic gate icons, that I never realized that the purpose of a game is to accomplish something, not just enjoy the crispness of the icons. At the end of the day, we had created a real franken-game. Existing somewhere between proud, embarrassed, and bullishly ignorant, we published the game on our original site under the title Circuit Game. It wasn't actually a game, but the effort was in, and there was a feeling a accomplishment that spread throughout the Mansion (our house) despite the weird outcome.

### Retrospective

Recently, the team went to an game developer conference in boston ([Boston Fig](https://www.bostonfig.com/talks/)). While we were there, I heard an interesting take on game development, where a game is…

> the voluntary attempt to overcome unnecessary obstacles
>
> -- <cite>[The Grasshopper -1978](https://www.goodreads.com/book/show/803547.The_Grasshopper)</cite>

As Sam pointed out, "if the metric is unnecessariness [sic], then this is the best Game ever created.". That being said, I'm back on the side of calling Circuit Simulator a game, and it's going in the game category gosh-darnit!


In the end, you may not love simulating circuits, but you will be able to feel our misplaced love and determination. [Don't be shy, go play!]({% post_url 2019-01-21-circuit-simulator %})

In loving memory of the Circuit Game idea,

`#sylverFamily`
