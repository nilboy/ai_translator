#!/bin/bash

# Create a temporary directory
mkdir -p ai_translator

# Copy all necessary files
cp manifest.json ai_translator/
cp background.js ai_translator/
cp content.js ai_translator/
cp popup.html ai_translator/
cp popup.js ai_translator/
cp -r images ai_translator/
cp -r icons ai_translator/

# Create zip file
cd ai_translator
zip -r ../ai_translator.zip ./*
cd ..

# Clean up
rm -rf ai_translator

echo "Extension has been packaged to ai_translator.zip" 