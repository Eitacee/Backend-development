# My Notes

A simple **Notes Management Application** built with **Node.js**, **Express**, **EJS**, and **MongoDB**.

## Features
- 📋 View all notes (sorted newest first)
- ➕ Add new notes (with title, content, category)
- ✏️ Edit existing notes *(Bonus)*
- 🗑️ Delete notes
- 🔍 Search notes by title *(Bonus)*
- 🏷️ Filter notes by category *(Bonus)*
- 🎨 Responsive UI with Bootstrap 5 *(Bonus)*

## Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Template Engine | EJS |
| Database | MongoDB |
| Driver | mongodb (v6) |
| CSS | Bootstrap 5 + custom CSS |

## Project Structure
```
my-notes/
├── app.js               ← Main server & routes
├── package.json
├── views/
│   ├── index.ejs        ← All notes (home page)
│   ├── new.ejs          ← Add note form
│   └── edit.ejs         ← Edit note form (bonus)
└── public/
    └── css/
        └── style.css    ← Custom styles
```

## MongoDB Configuration
| Setting | Value |
|---|---|
| URL | `mongodb://127.0.0.1:27017` |
| Database | `notes_lab` |
| Collection | `notes` |

## Running the Application

### Prerequisites
- Node.js installed
- MongoDB running on `127.0.0.1:27017`

### Steps

```bash
# 1. Go to the project directory
cd my-notes

# 2. Install dependencies (already done if you cloned this)
npm install

# 3. Start the server
node app.js

# 4. Open in browser
http://localhost:3000
```

## Routes
| Method | Route | Description |
|---|---|---|
| GET | `/` | Display all notes (with optional `?search=` and `?category=`) |
| GET | `/notes/new` | Show add-note form |
| POST | `/notes` | Insert a new note |
| GET | `/notes/:id/edit` | Show edit form |
| POST | `/notes/:id/edit` | Update note |
| POST | `/notes/:id/delete` | Delete a note |
