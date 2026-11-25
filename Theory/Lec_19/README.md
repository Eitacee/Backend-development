# Lecture 19 - Implementing RESTful APIs: Building API Endpoints

## Course Outcome
**CO3** – Build complete RESTful API endpoints with proper request handling and response formatting.

## Student Information
- **Name:** Akshat Mamgain
- **SAP ID:** 590014875

## Technologies Used
- **FastAPI**
- **Uvicorn**
- **SQLAlchemy (ORM)**
- **SQLite Database**
- **Pydantic v2 (Validation & Schemas)**
- **python-dotenv**

---

## Project Structure
```
student_api/
├── main.py          # FastAPI application & API endpoints
├── models.py        # SQLAlchemy ORM models (Department, Student, Course, Enrollment)
├── schemas.py       # Pydantic schemas for request validation & response formatting
├── database.py      # Database engine, SessionLocal, and get_db dependency
├── seed_data.py     # Script to populate initial sample data for demonstration
├── test_api.py      # Automated API endpoint verification suite
├── requirements.txt # Python package dependencies
├── .env             # Environment variables (DATABASE_URL)
└── README.md        # Documentation and demonstration guide
```

---

## Lab Exercise Checklist

- [x] **1. Complete Student Management CRUD API**: Full Create, Read, Update, and Delete operations for Students.
- [x] **2. Filtering**: Query parameter filtering on `GET /students` (by `branch`, `department_id`, and `search`).
- [x] **3. Pagination**: `page`, `limit`, `total`, and `total_pages` returned in `StudentListResponse`.
- [x] **4. Course Endpoints**: `POST /courses` and `GET /courses` with conflict validation.
- [x] **5. Nested Student Enrollments**: `POST` and `GET` for `/students/{student_id}/enrollments` and `DELETE /students/{student_id}/enrollments/{course_id}`.
- [x] **6. Error Handling**: Proper HTTP status codes (`200 OK`, `201 Created`, `204 No Content`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`).
- [x] **7. Swagger UI Documentation**: Fully interactive interactive documentation at `/docs`.

---

## How to Run the Server

### 1. (Optional) Populate Sample Data
To preload departments, courses, students, and enrollments:
```bash
python seed_data.py
```

### 2. Start the FastAPI Server
```bash
python main.py
```
Or with uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The server will start at:
- **API Base URL:** `http://127.0.0.1:8000`
- **Interactive Swagger UI:** `http://127.0.0.1:8000/docs`
- **ReDoc Documentation:** `http://127.0.0.1:8000/redoc`

### 3. Run Automated Endpoint Tests
```bash
python test_api.py
```

---

## API Endpoints Summary

### Students (`/students`)
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/students` | List students with filtering (`branch`, `department_id`, `search`) and pagination (`page`, `limit`) | 200 OK |
| `GET` | `/students/{student_id}` | Retrieve student by ID | 200 OK / 404 |
| `POST` | `/students` | Create a new student (Email uniqueness validated) | 201 Created / 409 |
| `PUT` | `/students/{student_id}` | Update existing student | 200 OK / 404 |
| `DELETE` | `/students/{student_id}` | Delete a student | 204 No Content / 404 |

### Courses (`/courses`)
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/courses` | List courses (optional filter by `department_id` and `credits`) | 200 OK |
| `POST` | `/courses` | Create a course | 201 Created / 409 |
| `GET` | `/courses/{course_id}` | Get course by course ID | 200 OK / 404 |
| `DELETE` | `/courses/{course_id}` | Delete course | 204 No Content / 404 |

### Student Enrollments (`/students/{student_id}/enrollments`)
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/students/{student_id}/enrollments` | List enrollments for a specific student | 200 OK / 404 |
| `POST` | `/students/{student_id}/enrollments` | Enroll student into a course | 201 Created / 404 / 409 |
| `DELETE` | `/students/{student_id}/enrollments/{course_id}` | Remove student enrollment | 204 No Content / 404 |

### Departments (`/departments`)
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/departments` | List all departments | 200 OK |
| `POST` | `/departments` | Create a department | 201 Created / 409 |
| `GET` | `/departments/{department_id}` | Get department by ID | 200 OK / 404 |

---

## Sample curl Commands for Demonstration

### 1. Create a Student
```bash
curl -X POST http://localhost:8000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aarav",
    "email": "aarav@upes.ac.in",
    "branch": "CSE",
    "enrollment_date": "2024-08-01"
  }'
```

### 2. List Students (with Filtering & Pagination)
```bash
curl "http://localhost:8000/students?branch=CSE&page=1&limit=5"
```

### 3. Get Student by ID
```bash
curl http://localhost:8000/students/1
```

### 4. Update Student
```bash
curl -X PUT http://localhost:8000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"branch": "ECE"}'
```

### 5. Create a Course
```bash
curl -X POST http://localhost:8000/courses \
  -H "Content-Type: application/json" \
  -d '{
    "id": "CS101",
    "title": "Data Structures & Algorithms",
    "credits": 4
  }'
```

### 6. Enroll Student in Course
```bash
curl -X POST http://localhost:8000/students/1/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": "CS101",
    "semester": "Semester 4",
    "grade": "A"
  }'
```

### 7. Delete a Student
```bash
curl -X DELETE http://localhost:8000/students/1
```
