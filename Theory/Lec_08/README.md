# Theory Lecture 08: FastAPI Server-Side HTML Rendering (Jinja2)

- **Name:** Prince Kandari
- **SAP ID:** 590014595
- **Course:** Backend Development (B.Tech Full Stack)

---

## 📋 Overview
Demonstrates server-side HTML template rendering in **FastAPI** using the **Jinja2Templates** engine, combining FastAPI's fast request handling with server-rendered views.

## 📁 Files
- `main.py`: FastAPI server configured with `Jinja2Templates(directory="templates")`.
- `templates/home.html`: Homepage template.
- `templates/students.html`: Dynamic students table template.

## 🚀 How to Run
```bash
cd Theory/Lec_08
pip install fastapi uvicorn jinja2
uvicorn main:app --reload
```
