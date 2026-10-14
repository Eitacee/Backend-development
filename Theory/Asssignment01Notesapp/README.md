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


