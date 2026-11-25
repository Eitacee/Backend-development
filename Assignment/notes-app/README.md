# Assignment - Browser Notes Application

## Aim
To build an interactive and responsive web-based Notes Application with complete CRUD functionality (Create, Read, Update, Delete) and client-side persistence using the HTML5 `localStorage` API.

## Student Information
- **Name:** Akshat Mamgain
- **SAP ID:** 590014875

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+, DOM Manipulation, LocalStorage API)

## Files
- `index.html` — Application structure including note input textarea, submission button, and dynamic notes display container.
- `style.css` — Clean styling, responsive layout, card styling for individual notes, and action button formatting.
- `script.js` — Client-side logic for adding, reading, updating, and deleting notes, alongside syncing with `localStorage`.

## Features
- **Add Notes**: Create notes with automatic generation of creation and last updated timestamps.
- **View Notes**: Displays all stored notes in organized cards.
- **Edit Notes**: Inline prompt allowing users to modify existing note content while preserving the initial creation timestamp.
- **Delete Notes**: Removes specific notes by unique ID and updates storage.
- **Persistent Storage**: Uses `localStorage` so notes survive browser refreshes and restarts.

## How to Run
Open `index.html` directly in any web browser:
```bash
start Assignment/notes-app/index.html
```

## Learning Outcome
Strengthened proficiency in event handling, DOM manipulation, JSON serialization/deserialization (`JSON.stringify`/`JSON.parse`), and client-side data persistence with `localStorage`.
