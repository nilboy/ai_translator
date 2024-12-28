# AI Web Translator

A powerful Chrome extension that provides real-time webpage translation using AI language models.

[中文文档](README.zh.md)

## Features

- **Full Page Translation**: Translate entire web pages with a single click or keyboard shortcut (Ctrl+M/Command+M)
- **Text Selection Translation**: Quick translation for selected text with a floating translation button
- **Multi-language Support**: Support translation between multiple languages including:
  - Chinese
  - English
  - Japanese
  - Korean
  - French
  - German
  - Spanish
  - Russian
  - Italian
  - Portuguese
  - Vietnamese
  - Thai
  - Arabic
- **Customizable Settings**: 
  - Custom API endpoint support
  - Configurable AI model selection
  - Target language selection
- **Modern UI/UX**:
  - Clean and intuitive interface
  - Dark mode support
  - Smooth animations and transitions
  - Interactive highlighting and synchronous scrolling

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Configuration

1. Click the extension icon to open settings
2. Enter your API Key
3. (Optional) Configure custom API endpoint
4. (Optional) Select AI model
5. Choose your target translation language
6. Click "Save Settings"

## Usage

### Full Page Translation
- Use keyboard shortcut `Ctrl+M` (Windows) or `Command+M` (Mac)
- Or click the extension icon and use the translate button

### Text Selection Translation
1. Select any text on the webpage
2. Click the translation icon that appears
3. View the translation in the popup window

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extension Manifest V3
- Supports custom API endpoints for flexibility
- Implements token usage tracking
- Features intelligent text segmentation and merging

## License

MIT License 