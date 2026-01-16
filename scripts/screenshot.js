const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(postPath, outputDir = 'screenshots') {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1200, height: 800 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });

    const page = await context.newPage();

    try {
        // Navigate to the local Jekyll server
        const baseUrl = process.env.JEKYLL_URL || 'http://localhost:4000';
        const postUrl = `${baseUrl}${postPath}`;

        console.log(`Taking screenshot of: ${postUrl}`);

        await page.goto(postUrl, { waitUntil: 'networkidle' });

        // Wait for content to load
        await page.waitForTimeout(2000);

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Generate filename from post path
        const filename = postPath.replace(/[\/\\]/g, '_').replace(/\.html$/, '') + '.png';
        const screenshotPath = path.join(outputDir, filename);

        // Take full page screenshot
        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        console.log(`Screenshot saved to: ${screenshotPath}`);
        return screenshotPath;

    } catch (error) {
        console.error(`Error taking screenshot of ${postPath}:`, error);
        throw error;
    } finally {
        await browser.close();
    }
}

async function getModifiedPosts() {
    // This function would be called by the GitHub Action
    // to determine which posts were modified
    const modifiedFiles = process.env.MODIFIED_FILES?.split(',') || [];
    const posts = modifiedFiles.filter(file =>
        file.startsWith('_posts/') &&
        (file.endsWith('.md') || file.endsWith('.html'))
    );

    return posts.map(post => {
        // Convert _posts/2025-01-12-elm-after-7-years.md to /blog/2025/01/12/elm-after-7-years.html
        const match = post.match(/_posts\/(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|html)/);
        if (match) {
            const [, year, month, day, slug] = match;
            return `/blog/${year}/${month}/${day}/${slug}.html`;
        }
        return null;
    }).filter(Boolean);
}

async function main() {
    try {
        const posts = await getModifiedPosts();

        if (posts.length === 0) {
            console.log('No modified posts found');
            return;
        }

        console.log(`Found ${posts.length} modified posts:`, posts);

        const screenshots = [];
        for (const post of posts) {
            try {
                const screenshotPath = await takeScreenshot(post);
                screenshots.push(screenshotPath);
            } catch (error) {
                console.error(`Failed to screenshot ${post}:`, error);
            }
        }

        // Write screenshots list to file for GitHub Action
        fs.writeFileSync('screenshots/screenshots.txt', screenshots.join('\n'));
        console.log(`Generated ${screenshots.length} screenshots`);

    } catch (error) {
        console.error('Screenshot generation failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { takeScreenshot, getModifiedPosts }; 