---
layout: post
title: "Native Elm Datepicker"
date: 2019-06-16 02:51:00 -0500
category: blog
author: RJ
author_twitter: SylverStudios
image: /assets/elm-datepicker.png
---

_The pros and cons of using a native browser datepicker in Elm._

When browser support for date input types was worse (or non-existent), JavaScript datepickers were a common solution if you needed to allow a user to enter a date on a form. These days, browser support is much better, making native browser datepickers a much more viable option. If you need a datepicker in Elm, there is a package that will meet your needs ([CurrySoftware/elm-datepicker](https://github.com/CurrySoftware/elm-datepicker)), but it is more cumbersome than the native browser option, which in Elm is pretty easy to use.

To use the native browser datepicker in Elm all you need to do is add an input tag, capture its input events with [`Html.Events.onInput`](https://package.elm-lang.org/packages/elm/html/1.0.0/Html-Events#onInput), and parse the value of the input event for a date. The value will be a string containing a date in the ISO 8601 format (YYYY-MM-DD).

Here is very simple Ellie example demonstrating how it works:

<iframe src="https://ellie-app.com/embed/3RjFHN9sHzca1" style="width:100%; height:400px; border:0; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

The two main shortcomings of using the native browser datepicker vs. the Elm package linked above are:

1. Browser support is not universal, although it is pretty good. According to caniuse.com ([reference](https://caniuse.com/#feat=input-datetime)), at the time of writing, the date input type is not supported by IE (though it is by Edge), IE Mobile, Sarafi, or Opera Mini.
2. The native browser datepicker is much less stylable, and looks different in each browser. The MDN docs provide some helpful [examples](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) of its appearance in different browsers.

If none of these are concerns for you, the native browser datepicker might be the way to go!
