# Blog Post Screenshot Workflow

This repository includes an automated workflow that takes screenshots of blog posts when they are modified in pull requests.

## How It Works

1. **Trigger**: When a PR is opened or updated with changes to files in the `_posts/` directory
2. **Detection**: The workflow identifies which blog posts were modified
3. **Build**: Jekyll site is built and served locally
4. **Screenshot**: Playwright takes full-page screenshots of each modified post using the correct URL structure (`/blog/YYYY/MM/DD/post-slug.html`)
5. **Upload**: Screenshots are uploaded as artifacts and added to PR comments

## Files Added

- `.github/workflows/screenshot-posts.yml` - GitHub Actions workflow
- `scripts/screenshot.js` - Node.js script for taking screenshots
- `scripts/test-screenshot.js` - Local testing script
- Updated `package.json` with Playwright dependency

## Local Testing

To test the screenshot functionality locally:

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

2. Start your Jekyll server:
   ```bash
   bundle exec jekyll serve
   ```

3. Run the test script:
   ```bash
   node scripts/test-screenshot.js
   ```

## GitHub Actions Workflow

The workflow will automatically:

- ✅ Detect changes to `_posts/` files
- ✅ Build the Jekyll site
- ✅ Take screenshots of modified posts
- ✅ Upload screenshots as artifacts
- ✅ Add screenshots to PR comments
- ✅ Handle errors gracefully

## Configuration

### Environment Variables

- `JEKYLL_URL` - URL of the Jekyll server (default: http://localhost:4000)
- `MODIFIED_FILES` - Comma-separated list of modified files (set by GitHub Action)

### Screenshot Settings

- **Viewport**: 1200x800 pixels
- **Format**: PNG
- **Type**: Full page screenshot
- **Output**: `screenshots/` directory

## Troubleshooting

### Common Issues

1. **Jekyll server not starting**: Ensure Ruby and Jekyll are properly installed
2. **Playwright installation fails**: Try `npx playwright install --with-deps`
3. **Screenshots are blank**: Check that the Jekyll server is running and accessible
4. **Workflow not triggering**: Ensure PR contains changes to `_posts/` files

### Debug Mode

To run with verbose logging:

```bash
DEBUG=pw:api node scripts/screenshot.js
```

## Customization

### Modify Screenshot Settings

Edit `scripts/screenshot.js` to change:
- Viewport size
- Screenshot format
- Wait times
- Output directory

### Add Different Triggers

Edit `.github/workflows/screenshot-posts.yml` to:
- Trigger on different events
- Add more file patterns
- Customize the comment format

## Dependencies

- **Playwright**: Browser automation for screenshots
- **Node.js**: Runtime for the screenshot script
- **Ruby/Jekyll**: Blog site generation
- **GitHub Actions**: CI/CD automation 