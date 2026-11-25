# Backend Theory

- **Name:** Prince Kandari
- **SAP ID:** 590014595

This directory contains the theoretical concepts, lectures, code demonstrations, and implementations covered in the **Backend Development Theory** curriculum.

The topics are organized unit-wise and cover server-side programming, API design, database modeling, ORM/ODM, custom middleware, containerization, and reverse-proxy deployment.

---

## 📚 Syllabus & Lecture Directory

### Unit 1: Foundations of Backend Development & Templating
* **[`Task 1`](./Task_1)** – Express server with EJS dynamic view templating (`views/home.ejs`, `views/students.ejs`).
* **[`Task 2`](./Task_2)** – Flask microframework starter with route handling and debugging.
* **[`Task 3`](./Task_3)** – FastAPI REST application with Pydantic `BaseModel` schema validation and CRUD operations.
* **[`Task 4`](./Task_4)** – Express.js session handling with `express-session` middleware.
* **[`Lec 06`](./Lec_06)** – Comprehensive Cookie and Session demos in Express (`cookies/app.js`, `session/app.js`).
* **[`Lec 07`](./Lec_07)** – Interactive client-side To-Do List using browser `localStorage` and JSON serialization.
* **[`Lec 08`](./Lec_08)** – FastAPI server-side HTML rendering using `Jinja2Templates`.

### Unit 2: Database Modeling, Validation, ORM & REST APIs
* **[`Lec 19 (Student API)`](./Lec_19)** – Full-featured FastAPI RESTful API backed by SQLAlchemy ORM and SQLite, featuring relational models (`Student`, `Course`, `Department`, `Enrollment`), pagination, filtering, seed data, and test client suites.
* **[`Data Model Validation`](./Unit2_Data_Model_Validation)** – Modern Pydantic v2 validation techniques (`Field`, `EmailStr`, min/max constraints, metadata).
* **[`ODM (Mongoose)`](./Unit2_ODM)** – MongoDB Object Data Modeling with schema constraints (`enum`, `trim`, `lowercase`, `unique`).
* **[`ORM (SQLAlchemy)`](./Unit2_ORM)** – Python Relational Object Mapping with bidirectional relationships (`back_populates`), SQLite integration, and Pipfile dependency locking.

### Unit 3: Web Architecture & Middleware
* **[`Lec 25 (Express API)`](./Lec_25/express-api)** – Minimalist Express REST API starter with JSON body parsing middleware.
* **[`Lec 26 (Student System)`](./Lec_26/student_system)** – Django Student Management system featuring custom request execution logging middleware (`SimpleLoggingMiddleware` with `time.perf_counter()`).
* **[`Lec 29 (Student Project)`](./Lec_29)** – Django endpoints and unit tests for student records.

### Unit 4: Microservices & Deployment
> **Note:** The Dockerized FastAPI microservice and containerization tutorials are maintained in a dedicated separate repository: see `fastapi-docker` repository.

