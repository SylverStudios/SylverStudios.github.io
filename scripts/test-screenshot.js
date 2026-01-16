const { takeScreenshot } = require('./screenshot.js');

async function testScreenshot() {
    try {
        // Test with a specific post path
        const testPost = '/blog/2025/07/23/ai-pdfing-in-2025.html';

        console.log('Testing screenshot functionality...');
        console.log(`Taking screenshot of: ${testPost}`);

        const screenshotPath = await takeScreenshot(testPost);

        console.log('✅ Screenshot test successful!');
        console.log(`Screenshot saved to: ${screenshotPath}`);

    } catch (error) {
        console.error('❌ Screenshot test failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    testScreenshot();
} 