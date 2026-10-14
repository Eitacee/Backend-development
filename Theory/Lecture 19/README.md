# Student Management REST API (Lecture 19)

FastAPI project based on the code and structure in the supplied Lecture 19 PDF.
It includes student CRUD endpoints, filtering and pagination, department endpoints,
course endpoints, and nested student-enrollment endpoints.

## Setup

Python 3.10+ recommended.

```bash
python -m venv .venv
```

Windows:
```powershell
.venv\Scripts\Activate.ps1
```

macOS/Linux:
```bash
source .venv/bin/activate
```

Install packages:
```bash
pip install -r requirements.txt
```

Run the API:
```bash
python main.py
```

Open interactive API docs:
- http://127.0.0.1:8000/docs

The SQLite database `students.db` is created automatically on first run.

## Example requests

Create a student:
```bash
curl -X POST http://127.0.0.1:8000/students ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Aarav\",\"email\":\"aarav@example.com\",\"branch\":\"CSE\",\"enrollment_date\":\"2024-08-01\"}"
```

List/filter students:
```bash
curl "http://127.0.0.1:8000/students?branch=CSE&page=1&limit=5"
```

Get student:
```bash
curl http://127.0.0.1:8000/students/1
```

Update student:
```bash
curl -X PUT http://127.0.0.1:8000/students/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"branch\":\"ECE\"}"
```

Delete student:
```bash
curl -X DELETE http://127.0.0.1:8000/students/1
```

## Main endpoints

- `GET /students` — list, filter, search and paginate students
- `GET /students/{student_id}` — retrieve one student
- `POST /students` — create a student
- `PUT /students/{student_id}` — update a student
- `DELETE /students/{student_id}` — delete a student
- `GET /departments` and `POST /departments` — departments
- `GET /courses` and `POST /courses` — courses
- `GET /students/{student_id}/enrollments` — list a student's enrollments
- `POST /students/{student_id}/enrollments` — enroll a student in a course
- `DELETE /students/{student_id}/enrollments/{course_id}` — remove an enrollment

Note: The PDF's course schema code appears to omit the `id` field from `CourseCreate`,
although the endpoint checks and stores `course.id`. This project includes that required
field so the course-creation endpoint works. It also includes a department create/list
endpoint to make the supplied department model usable.
