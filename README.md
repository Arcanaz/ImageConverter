# Image to ICO Converter

This is a web-based tool that allows users to upload an image (PNG, JPG, etc.) and convert it into an ICO file, which is commonly used for website favicons.

## Features

- **Image Preview**: See a preview of how the image will look when converted to an ICO format.
- **Conversion to ICO**: Upload an image, and it will be converted to a `.ico` file ready for download.
- **Optimized for Favicon**: Converts images to the ideal size for favicons, typically 256x256 pixels.

## Usage

1. **Visit the web app**.
2. **Upload an image** (PNG, JPG, or other formats).
3. **View the preview** of the image, as it will appear in the ICO format.
4. **Click the "Convert to ICO"** button to download the converted `.ico` file.

## Technical Stack

- **Frontend**:
  - **Svelte**: A fast and modern JavaScript framework for building user interfaces.
  - **TypeScript**: A superset of JavaScript that adds static types for better developer experience.
  - **Vite**: A fast and efficient build tool for modern web projects.

- **Backend**:
  - **Express**: A web framework for building API endpoints and handling requests.
  - **Multer**: Middleware for handling file uploads.
  - **Sharp**: Image processing library used to resize and format images.
  - **png-to-ico**: Converts resized PNG images to the ICO format.
