# Backend Development

**Student Name:** Prince Kandari  
**SAP ID:** 590014595  

This repository contains the coursework, lab experiments, theory lectures, assignments, and architectural demonstrations for the **Backend Development** curriculum.

---

## 📁 Repository Structure

```text
BackendDevelopment/
├── Lab/                     # Practical laboratory experiments & exam projects
│   ├── Exp 1/ / Exp_01/     # HTML5 master element showcase & documentation
│   ├── Exp2/                # Comprehensive 6-part CSS styling master lab
│   ├── Exp 7-8/ / Exp7_8/   # Modern ES6 JavaScript To-Do app
│   ├── Exp 12/ / Exp12_A/   # Express.js server, route/query params, EJS views
│   ├── Exp 12B/ / Exp12_B/  # State management: Cookies & Sessions
│   ├── Exp 13A/ / mongoose-demo/ # MongoDB ODM integration with Mongoose
│   ├── Exp 15A/ / Exp15/    # Baseline Django To-Do application
│   ├── Exp15B/              # Multi-app Django system & modern Python uv management
│   └── Exam01B/ / eisenhower-todo/ # Eisenhower Matrix SSR To-Do Application
│
├── Theory/                  # Theory concepts, lectures, and architecture demos
│   ├── Theory_class1/       # Foundations of Backend, Client-Server & HTTP
│   ├── Task_1/              # Express.js + EJS dynamic SSR templating
│   ├── Task_2/              # Flask microframework fundamentals
│   ├── Task_3/              # FastAPI + Pydantic CRUD
│   ├── Task_4/              # Express session management
│   ├── Lec_06/              # Express cookies & session management
│   ├── Lec_07/              # LocalStorage persistent task list
│   ├── Lec_08/              # FastAPI with Jinja2 HTML rendering
│   ├── Lec_19/              # Relational REST API with FastAPI & SQLAlchemy
│   ├── Unit2_Data_Model_Validation/  # Pydantic v2 data validation
│   ├── Unit2_ODM/           # Mongoose schema constraints & lifecycle methods
│   ├── Unit2_ORM/           # SQLAlchemy bidirectional relationships
│   ├── Lec_25/              # Express API starter with JSON middleware
│   ├── Lec_26/              # Django custom timing/logging middleware
│   └── Lec_29/              # Django student project endpoints & tests
│
├── Assignment/              # Coursework assignments & technical research
│   ├── notes-app/           # Assignment 1: LocalStorage Note Taking App
│   └── Assignment2_PostgreSQL_JSONB/  # Assignment 2: PostgreSQL JSONB Research
│
├── fastdoc/                 # Student Management Express REST API
├── .gitignore
└── README.md
```

> **Note on Docker FastAPI Application:**  
> The containerized Docker FastAPI microservice and reverse-proxy deployment is maintained in a dedicated standalone repository.

---

## 🧪 Lab Experiments (`Lab/`)

| Experiment | Directory | Core Concepts & Technologies |
| :--- | :--- | :--- |
| **Exp 1** | [`Lab/Exp_01`](./Lab/Exp_01) | HTML5 semantic structure, forms, multimedia, canvas, SVG & viva prep |
| **Exp 2** | [`Lab/Exp2`](./Lab/Exp2) | 6-Part CSS Lab: External, Internal, Inline, Selectors, Flexbox/Grid, Animations |
| **Exp 7 & 8** | [`Lab/Exp7_8`](./Lab/Exp7_8) | ES6 Classes (`class Task`), spread operator, destructuring, event delegation |
| **Exp 12(A)** | [`Lab/Exp12_A`](./Lab/Exp12_A) | Express routes, query calculator, response formats, and EJS dynamic rendering |
| **Exp 12(B)** | [`Lab/Exp12_B`](./Lab/Exp12_B) | Session & Cookie management (`cookie-parser`, `express-session`) |
| **Exp 13** | [`Lab/mongoose-demo`](./Lab/mongoose-demo) | MongoDB ODM with Mongoose: schema constraints, user auth & password hashing |
| **Exp 15** | [`Lab/Exp15/django_todo_app`](./Lab/Exp15/django_todo_app) | Django MVT baseline task management system with SQLite & ORM |
| **Exp 15B** | [`Lab/Exp15B`](./Lab/Exp15B) | Multi-app Django system (`todo`, `tasks`, external API proxy `student_api`) & `uv` package manager |
| **Exam 01B** | [`Lab/Exam01B`](./Lab/Exam01B) | Eisenhower Matrix To-Do App (SSR, Express, MongoDB native driver, EJS) |

---

## 📖 Theory & Lectures (`Theory/`)

### Unit 1: Foundations & Templating
* **[`Theory/Theory_class1`](./Theory/Theory_class1)** – Fundamentals of Backend Engineering, HTTP, and Server Architecture.
* **[`Theory/Task_1`](./Theory/Task_1)** – Express.js + EJS SSR dynamic templating (`views/home.ejs`, `views/students.ejs`).
* **[`Theory/Task_2`](./Theory/Task_2)** – Flask microframework routing and response handling.
* **[`Theory/Task_3`](./Theory/Task_3)** – FastAPI CRUD API with Pydantic `BaseModel` schema validation.
* **[`Theory/Task_4`](./Theory/Task_4)** – Express session tracking and state control.
* **[`Theory/Lec_06`](./Theory/Lec_06)** – Cookie parser & session middleware in Express (`cookies/app.js`, `session/app.js`).
* **[`Theory/Lec_07`](./Theory/Lec_07)** – Client-side task persistence using `localStorage`.
* **[`Theory/Lec_08`](./Theory/Lec_08)** – FastAPI server-side rendering with `Jinja2Templates`.

### Unit 2: Database Modeling, Validation & ORM/ODM
* **[`Theory/Lec_19`](./Theory/Lec_19)** – Enterprise RESTful API with FastAPI + SQLAlchemy (relational models, pagination, test suite).
* **[`Theory/Unit2_Data_Model_Validation`](./Theory/Unit2_Data_Model_Validation)** – Pydantic v2 data model validation (`Field`, `EmailStr`, min/max constraints).
* **[`Theory/Unit2_ODM`](./Theory/Unit2_ODM)** – Mongoose Object Data Modeling with validation rules and enum checks.
* **[`Theory/Unit2_ORM`](./Theory/Unit2_ORM)** – SQLAlchemy Object Relational Mapping with bidirectional `back_populates` relationships.

### Unit 3: Architecture & Custom Middleware
* **[`Theory/Lec_25`](./Theory/Lec_25/express-api)** – Express API with JSON body parsing middleware.
* **[`Theory/Lec_26`](./Theory/Lec_26/student_system)** – Django custom request timing middleware (`SimpleLoggingMiddleware`).
* **[`Theory/Lec_29`](./Theory/Lec_29)** – Django student API endpoints and test suite.

---

## 📝 Assignments (`Assignment/`)

1. **[`Assignment 1: Notes App`](./Assignment/notes-app)**  
   Interactive note-taking web application with dynamic DOM rendering, editing, and `localStorage` persistence.
2. **[`Assignment 2: PostgreSQL JSONB Analysis`](./Assignment/Assignment2_PostgreSQL_JSONB)**  
   In-depth research on PostgreSQL `JSONB`, comparing relational SQL and document-based NoSQL storage, indexing techniques (GIN), query operators (`->`, `->>`, `@>`), and performance benchmarks.

---

## 🛠️ Technologies Used

| Category | Technologies |
| :--- | :--- |
| **Languages** | JavaScript (ES6+), Python 3.11+, HTML5, CSS3, SQL |
| **Backend Frameworks** | Express.js, FastAPI, Django, Flask |
| **Templating Engines** | EJS, Jinja2 |
| **Databases & ORM/ODM** | MongoDB, Mongoose, PostgreSQL, SQLite, SQLAlchemy |
| **Package Managers & Tools** | npm, pip, `uv`, Pipenv |

