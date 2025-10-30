# AGENTS.md

This document provides guidance for AI agents working on this project.

## Project Overview

This is a personal website and blog built with React. The website has two main parts:

1.  **Public-facing portfolio:** This showcases the owner's interests in engineering, music, and education.
2.  **Secret blog:** This is a hidden section of the website that can be accessed by a specific user interaction.

## Architecture

The project is a standard React application created with `create-react-app`.

*   `src/`: Contains all the source code for the application.
*   `public/`: Contains the public assets, including `index.html`.
*   `src/index.js`: The entry point of the application.
*   `src/App.js`: The main application component that handles routing.
*   `src/components/`: This directory does not exist, but component files are spread throughout the `src/` directory.

### Public-Facing Portfolio

The public-facing portfolio consists of the following pages:

*   **About:** `src/About.js`
*   **Engineering:** `src/Engineering.js`
*   **Music:** `src/Music.js`
*   **Education:** `src/Education.js`

These pages are linked in the main navigation bar in `src/CustomNavbar.js`.

### Secret Blog

The secret blog is hidden from the main navigation and can be accessed by clicking the "logoR" image in the top-left corner three times. This functionality is implemented in `src/CustomNavbar.js`.

The blog itself is implemented in `src/blog/Blog.js`. It features a desktop-like interface where blog posts are represented as icons that open in windows.

#### Blog Posts

Blog posts are stored as individual JSON files in the `src/blog/posts/` directory. Each post has a specific type, which determines the overlay component used to render it. There are two types of blog posts:

*   **Standard Photo/Text Post:** These posts are rendered using `src/blog/ImageOverlay.js` and have the following JSON structure:
    *   `title`: The title of the post (string).
    *   `date`: The date of the post (string).
    *   `image`: The filename of the image to be displayed (string).
    *   `text`: An array of strings, where each string is a paragraph.

*   **Music Post:** These posts are rendered using `src/blog/MusicOverlay.js` and have the following JSON structure:
    *   `title`: The title of the album or track (string).
    *   `artist`: The name of the artist (string).
    *   `albumArt`: The filename of the album art (string).
    *   `tracks`: An array of objects, where each object represents a track and has the following fields:
        *   `title`: The title of the track (string).
        *   `fileName`: The filename of the audio file (string).
        *   `duration`: The duration of the track (string).

## Development

### Getting Started

1.  Install dependencies: `npm install`
2.  Start the development server: `npm start`

### Testing

The test command is `npm test`, which executes `react-scripts test`. This command launches an interactive test runner that can hang in non-interactive environments.

### Frontend Verification

Frontend verification using Playwright can be difficult because the React application components may not render quickly enough, causing scripts to time out while waiting for selectors. A potential strategy to wait for the app to load is to wait for the `.desktop` class selector to be present in the DOM.
