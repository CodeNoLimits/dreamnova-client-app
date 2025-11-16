#!/bin/bash
# Deploy script for Netlify

set -e

echo "🚀 Deploying DreamNova Client App to Netlify..."

# Check if netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm i -g netlify-cli
fi

# Build the app
echo "🔨 Building application..."
npm run build

# Deploy to Netlify
echo "☁️ Deploying to Netlify..."
netlify deploy --prod --dir=out

echo "✅ Deployment complete!"
