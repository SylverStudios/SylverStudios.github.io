## WIP: Attempt to consolidate content and make it super easy to update

I think the page should be visible [SylverStudios.github.io](https://SylverStudios.github.io)

Here are some possible todo / consolidates

## How can I contribute?

Are you me? Have you not properly setup ruby on your old macbook? Some of these steps will relate to that issue, ignore if not applicable.

```bash
# macOS rb is 2.2 and insane. Must rbenv
# https://github.com/rbenv/rbenv/issues/938

rbenv versions
rbenv local 2.6.0

# install jekyll & bundler
cd to/the/project
gem install jekyll bundler

# Run in dev mode, include drafts `--drafts`
bundle exec jekyll serve

```

Post format: `YEAR-MONTH-DAY-title.MARKUP`

## Whats weird?

The `_includes` folder will overwrite the template styles. The only file in there right now is `head.html` and the only difference is that it adds a link for the favicon.

Google analytics is included when we build for production: `JEKYLL_ENV=production jekyll build`
We should confirm that when github builds the project they set that flag - unsure so far.

## Status updates?

There is a `project` in this repo that should act as the list of things to do.