# The new and improved website!
[SylverStudios.github.io](https://SylverStudios.github.io) & [Sylverstud.io](https://sylverstud.io)

The goal is to make this a safe and easy place to post anything we want. Games, apps, ideas, whatever. If you're unsure, make a draft and push a branch, it won't go live and everyone else can give feedback.

## How's it work?

* Github will build/deploy master to [SylverStudios.github.io](https://SylverStudios.github.io)
* Heroku will build/deploy master to [Sylverstud.io](https://sylverstud.io)
* Branches won't get deployed, and it doesn't push drafts live, so feel free to try things out.

## How can I contribute?

Open a PR, add a new `post` file (Post format: `YEAR-MONTH-DAY-title.MARKUP`). If the file is under drafts, it won't need the date. Run it locally to make sure everything is working. Pretty straight forward.

```bash
bundle exec jekyll serve --drafts
```

<details><summary>Ruby Mac help</summary>
<p>

Are you me? Have you not properly setup ruby on your old macbook? Some of these steps will relate to that issue, ignore if not applicable.

```bash
# macOS rb is 2.2 and insane. Must rbenv
# https://github.com/rbenv/rbenv/issues/938

rbenv versions
rbenv local 2.6.0

# install jekyll & bundler
cd to/the/project
gem install jekyll bundler

# Run in dev mode, displays drafts
bundle exec jekyll serve --drafts

```

</p>
</details>

## Whats weird?

### `_includes` Folder

Overwrite the template styles.
Example: The `head.html` is copied from `Minima` our current theme, the only difference is that it adds a link for the favicon.

### Analytics

Auto included when we build for production: `JEKYLL_ENV=production jekyll build`
We should confirm that when github builds the project they set that flag - unsure so far.
