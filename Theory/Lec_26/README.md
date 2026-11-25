# Theory Lecture 26: Django Custom Execution Logging Middleware

- **Name:** Prince Kandari
- **SAP ID:** 590014595
- **Course:** Backend Development (B.Tech Full Stack)

---

## 📋 Overview
Demonstrates authoring and registering custom middleware in **Django**. Specifically implements `SimpleLoggingMiddleware` to calculate and log the exact request-response latency of every HTTP transaction using Python's high-precision `time.perf_counter()`.

## 📁 Key Files
- `student_system/students/middleware.py`: Custom middleware class implementation.
- `student_system/student_system/settings.py`: Middleware registration under `MIDDLEWARE`.
- `student_system/manage.py`: Django management runner.

## 🚀 How to Run
```bash
cd Theory/Lec_26/student_system
python manage.py migrate
python manage.py runserver
```
Observe terminal console logs showing request execution times.
