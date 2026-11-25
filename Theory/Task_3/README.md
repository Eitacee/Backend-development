# Theory Task 3: FastAPI REST Application with Pydantic Validation

- **Name:** Prince Kandari
- **SAP ID:** 590014595
- **Course:** Backend Development (B.Tech Full Stack)

---

## 📋 Overview
Demonstrates building high-performance asynchronous RESTful APIs using **FastAPI** and **Pydantic v2** data schemas.

## 💡 Core Features
- Automatic request data validation with `BaseModel`.
- Interactive Swagger UI documentation (`/docs`) and ReDoc (`/redoc`).
- Student record CRUD operations with automatic JSON serialization.

## 📁 Key Files
- `main.py`: FastAPI application, Pydantic schemas, and endpoint handlers.

## 🚀 How to Run
```bash
cd Theory/Task_3
pip install fastapi uvicorn
uvicorn main:app --reload
```
Open `http://127.0.0.1:8000/docs` to test endpoints.
