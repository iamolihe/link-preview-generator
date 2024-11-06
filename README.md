# Link Preview Generator

A Chrome extension to create link previews from any website.

## Overview

The **Link Preview Generator** is a Chrome extension that allows you to easily create link previews by extracting metadata from websites. It captures essential information like the page title, description, image URL, and domain, helping you generate a preview snippet that can be copied to your clipboard and used in your content.

## Screenshots

### Extension Popup

<img width="336" alt="Extension Popup" src="https://github.com/user-attachments/assets/040be0ab-b9fb-458d-a9b3-61aadf64edc5">

### Generated Link Preview

<img width="491" alt="Generated Link Preview" src="https://github.com/user-attachments/assets/cceaa2cb-3195-468f-8500-fb381e22bef7">

## Motivation

I built this extension for our Squarespace site, [Nextgen-Strategists](https://nextgen-strategists.com), to streamline the process of creating link previews for our content.

## Features

- **Automatic Metadata Extraction**: Pulls in link, title, description, image URL, and domain from the current page.
- **Manual Editing**: Allows you to edit any field manually if the automatic extraction doesn't capture everything.
- **Clipboard Integration**: Copies the customized snippet directly to your clipboard.
- **State Preservation**: Keeps your data intact even if you close and reopen the extension.
- **Clear Fields Option**: Provides a button to clear all fields manually or automatically after copying.

## Requirements

To generate a link preview, the following information is required:

- **Link**: The URL of the page.
- **Title**: The title of the page.
- **Description**: A brief description of the page.
- **Image URL**: The URL for the preview image.
- **Domain**: The domain of the website.

## Installation

To install and use the extension:

1. **Clone the Repository**:

   ```bash
   gh repo clone iamolihe/link-preview-generator
   ```
2. **Load the extension in chrome**:
  - Open Google Chrome and navigate to chrome://extensions/.
  - Enable Developer mode by toggling the switch in the top right corner.
  - Click on Load unpacked and select the directory where you cloned the repository.

For more detailed instructions, refer to the [Chrome Extension Getting Started Guide](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

## Usage

1. Navigate to a Website: Go to the webpage from which you want to generate a link preview.
2. Open the Extension: Click on the Link Preview Generator icon in the Chrome toolbar.
3. Fill the Fields:
  - Click on Fill Fields to automatically populate the fields with data extracted from the current page.
  - If any information is missing or incorrect, you can manually enter or edit it.
4. Copy the Snippet:
  - Click on Copy to Clipboard to copy the generated snippet.
  - The fields will automatically clear after copying.
5. Use the Snippet: Paste the snippet wherever you need it, such as in your website's content editor or a social media post.

## Contributing

I may update this project in the future based on our usage requirements. If you have suggestions, feature requests, or would like to contribute, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
