#!/bin/bash

# Deployment script for Mini-Link-It
# This script builds the React client and copies it to the Flask server

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directories
CLIENT_DIR="mini-link-it-client"
SERVER_DIR="mini-link-it-server/app"
BUILD_DIR="$CLIENT_DIR/build"

# Step 1: Build the React application
echo -e "\n${BLUE}📦 Building React application...${NC}"
cd "$CLIENT_DIR"

if ! npm run build:production; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

cd ..

# Step 2: Remove old build from server (if exists)
echo -e "\n${BLUE}🗑️  Removing old build from server...${NC}"
if [ -d "$SERVER_DIR/build" ]; then
    rm -rf "$SERVER_DIR/build"
    echo "Old build removed"
else
    echo "No old build found"
fi

# Step 3: Copy new build to server
echo -e "\n${BLUE}📋 Copying new build to server...${NC}"
cp -r "$BUILD_DIR" "$SERVER_DIR/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successfully copied to $SERVER_DIR${NC}"
else
    echo -e "${RED}❌ Failed to copy build${NC}"
    exit 1
fi

# Step 4: Deployment instructions
echo -e "\n${GREEN}✅ Build process complete!${NC}"
echo -e "\n${BLUE}📤 Next steps:${NC}"
echo "  1. Test the Flask app locally: cd $SERVER_DIR && flask run"
echo "  2. Deploy to your hosting platform (Fly.io, Heroku, etc.)"
echo ""
echo -e "${BLUE}To deploy to Fly.io (if configured):${NC}"
echo "  cd $SERVER_DIR && flyctl deploy"
echo ""
