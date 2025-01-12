# The new and improved website!

[sylverstudios.dev](https://sylverstudios.dev)

The goal is to make this a safe and easy place to post anything we want. Games, apps, ideas, whatever. If you're unsure, make a draft and push a branch, it won't go live and everyone else can give feedback.

## Prerelease Checklist

- [ ] Social media meta looks good - [test here](https://tweethunter.io/tweetpik/twitter-card-validator)

## Deployment

- [Sylverstudios.dev](https://sylverstudios.dev) Netlify deploys this from Master
  - PRs are deployed via Netlify to temporary addresses as well
- Github will build/deploy master to [SylverStudios.github.io](https://SylverStudios.github.io)
  - Netlify functions won't work here?
- [Sylverstud.io](https://sylverstud.io)
  - Do we still own this domain? We should redirect it

## How can I contribute?

Open a PR, add a new `post` file (Post format: `YEAR-MONTH-DAY-title.MARKUP`). If the file is under drafts, it won't need the date. Run it locally to make sure everything is working. Pretty straight forward. If you're using vscode or cursor, the dev container should handle everything for you

```bash
vscode ➜ /workspaces/SylverStudios.github.io (master) $ bundle exec jekyll serve --drafts
```

<details><summary>Development Environment setup - Mac</summary>
<p>

Are you me? Have you not properly setup ruby on your old mcBook? Some of these steps will relate to that issue, ignore if not applicable.

### Ruby Setup

We need `ruby` installed, at the correct version, to run `jekyll`.
In order to easily chose our ruby version, we will first install the tool [`rbenv`](https://github.com/rbenv/rbenv#installation).
(Important Note! You must complete all of the rbenv installation steps, including updating your bash_profile).

After install `rbenv`, we will use it to set up the version of ruby required by jekyll, namely ruby 2.6.0:

```bash
rbenv install 2.6.0
# Should see output regarding Downloading and Installing ruby 2.6.0
rbenv local 2.6.0
# Sets the ruby version to 2.6.0
ruby --version
# Should see output verifying that the ruby version is indeed 2.6.0
```

### Jekyll Setup

Next we will set up Jekyll's dependencies in this project specifically.

```bash
cd to/the/project # top-level
# install jekyll & bundler
gem install jekyll bundler
# install dependencies tracked by bundler
bundle install
```

Voila! At this point the environment should support everything we need to develop.
You can verify this by running the main development command:

```bash
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

- ✅ Github Pages are adding
- ✅ Netlify Pages include
