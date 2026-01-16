#!/bin/bash

echo "🚀 Setting up Playwright screenshot workflow for local development..."

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install --with-deps

# Create screenshots directory
echo "📁 Creating screenshots directory..."
mkdir -p screenshots

echo "✅ Setup complete!"
echo ""
echo "To test the screenshot functionality:"
echo "1. Start Jekyll server: bundle exec jekyll serve"
echo "2. Run test: npm run test-screenshot"
echo ""
echo "The workflow will automatically run on PRs with changes to _posts/" 