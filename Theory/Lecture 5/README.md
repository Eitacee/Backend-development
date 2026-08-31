# Lecture 05 - RESTful APIs and FastAPI

This folder contains the code examples from the uploaded Lecture 05 PDF.

## Main Task

The `Task_1_FastAPI_Crud/main.py` file implements the Student Management API from the lecture:

- GET all students
- GET a student by ID
- POST a new student
- PUT/update a student
- DELETE a student
- Filter students by branch

## Install

```bash
pip install fastapi uvicorn
```

Or:

```bash
pip install -r requirements.txt
```

## Run

From the Task_1_FastAPI_Crud folder:

```bash
uvicorn main:app --reload
```

Swagger UI:

```text
http://localhost:5000/docs
```

ReDoc:

```text
http://localhost:5000/redoc
```

The lecture also demonstrates running Uvicorn programmatically with:

```bash
python main.py
```
