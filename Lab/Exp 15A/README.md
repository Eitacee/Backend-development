# Experiment 15: Django To-Do Application

- **Name:** Prince Kandari

**Student Information:**  
- **SAP ID:** 590014595  
- **Subject:** Backend Development Lab  
- **Topic:** Django Framework (MVT Architecture, SQLite ORM, Static Files & Modular Templating)

---

## 1. Objective
To install, configure, and build a full-featured To-Do web application using the **Django** framework and **SQLite** database.

By completing this experiment, you will:
- Understand Django's **MVT (Model-View-Template)** architecture.
- Learn the role of key files (`manage.py`, `settings.py`, `urls.py`, `models.py`, `views.py`).
- Master essential `manage.py` subcommands (`makemigrations`, `migrate`, `createsuperuser`, `runserver`, `shell`, `test`).
- Implement complete **CRUD (Create, Read, Update, Delete)** database operations with Django's ORM.
- **Lab Assignment Tasks Completed:**
  1. **Static Files Serving:** Configured `STATICFILES_DIRS` and served custom CSS (`static/css/style.css`) and JavaScript (`static/js/main.js`).
  2. **Modular Templating:** Implemented template inheritance (`{% extends 'base.html' %}`) and reusable components (`{% include 'includes/navbar.html' %}`, `{% include 'includes/footer.html' %}`, `{% include 'todo/includes/task_item.html' %}`).

---

## 2. Project Directory Structure

```text
Exp 15A/
├── manage.py                     # Administrative CLI tool
├── db.sqlite3                    # SQLite database engine
├── README.md                     # Comprehensive lab report and documentation
│
├── todo_project/                 # Project configuration package
│   ├── __init__.py               # Marks directory as a Python package
│   ├── asgi.py                   # ASGI entry point (async servers)
│   ├── settings.py               # Main configuration (apps, DB, templates, static)
│   ├── urls.py                   # Root URL routing table
│   └── wsgi.py                   # WSGI entry point (production web servers)
│
├── todo/                         # Django Application: 'todo'
│   ├── migrations/               # Database schema versioning files
│   │   ├── 0001_initial.py       # Initial migration for Task model
│   │   └── __init__.py
│   ├── management/               # Custom management commands
│   │   └── commands/
│   │       └── seed_data.py      # Pre-populates database and admin superuser
│   ├── __init__.py
│   ├── admin.py                  # Model registration & custom admin panel
│   ├── apps.py                   # App configuration
│   ├── models.py                 # Database schema definition (Task model)
│   ├── tests.py                  # Automated unit test suite
│   ├── urls.py                   # App-specific URL endpoints
│   └── views.py                  # HTTP request handlers & CRUD business logic
│
├── static/                       # Static assets (Lab Assignment Requirement)
│   ├── css/
│   │   └── style.css             # Modern stylesheet (responsive card UI & animations)
│   └── js/
│       └── main.js               # Interactivity (delete confirmation, auto-focus)
│
└── templates/                    # Modular templates (Lab Assignment Requirement)
    ├── base.html                 # Master template with {% block content %}
    ├── includes/
    │   ├── navbar.html           # Reusable header component via {% include %}
    │   └── footer.html           # Reusable footer component via {% include %}
    └── todo/
        ├── task_list.html        # Main dashboard extending base.html
        ├── add_task.html         # Form view extending base.html
        └── includes/
            └── task_item.html    # Modular task item card via {% include %}
```

---

## 3. Key Components & Implementation

### A. The Data Model (`todo/models.py`)
Defines the `Task` entity with three attributes:
```python
from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

### B. CRUD Views (`todo/views.py`)
- **Read (`task_list`):** Retrieves all tasks sorted chronologically (`-created_at`), computes summary statistics (total, pending, completed), and passes them to the template.
- **Create (`add_task`):** Handles `GET` (renders form) and `POST` (creates record in SQLite via ORM).
- **Update (`toggle_task`):** Toggles `completed` boolean flag (`task.completed = not task.completed`) and saves.
- **Delete (`delete_task`):** Deletes target task using `task.delete()` and redirects to dashboard.

### C. URL Routing
- **App URLs (`todo/urls.py`):**
  - `''` &rarr; `task_list` (`name='task_list'`)
  - `'add/'` &rarr; `add_task` (`name='add_task'`)
  - `'toggle/<int:task_id>/'` &rarr; `toggle_task` (`name='toggle_task'`)
  - `'delete/<int:task_id>/'` &rarr; `delete_task` (`name='delete_task'`)
- **Project URLs (`todo_project/urls.py`):**
  - `path('', include('todo.urls'))`
  - `path('admin/', admin.site.urls)`

### D. Lab Assignment 1: Serving Static Files
Configured in `todo_project/settings.py`:
```python
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```
In templates, static files are loaded using:
```django
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<script src="{% static 'js/main.js' %}"></script>
```

### E. Lab Assignment 2: Modular Templating (`extends` & `include`)
- **Base Layout (`templates/base.html`):** Provides the HTML structure, typography, CSS styling, and defines `{% block content %}{% endblock %}`.
- **Includes:**
  - Header & Navbar: `{% include 'includes/navbar.html' %}`
  - Footer: `{% include 'includes/footer.html' %}`
  - Task Item Card: `{% include 'todo/includes/task_item.html' with task=task %}`
- **Inheritance:**
  - `task_list.html` and `add_task.html` start with `{% extends 'base.html' %}`.

---

## 4. How to Run the Application

### Step 1: Run Migrations
```bash
python manage.py makemigrations todo
python manage.py migrate
```

### Step 2: Seed Sample Tasks & Create Superuser
A custom management command is provided to instantly seed 7 sample tasks and create an admin user:
```bash
python manage.py seed_data
```
- **Admin Username:** `admin`
- **Admin Password:** `admin123`
- **Admin Email:** `admin@example.com`

*(Alternatively, create your own admin via `python manage.py createsuperuser`)*

### Step 3: Run the Development Server
```bash
python manage.py runserver
```
Visit the following in your web browser:
- **To-Do Web App:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Add New Task:** [http://127.0.0.1:8000/add/](http://127.0.0.1:8000/add/)
- **Django Admin Panel:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 5. Verification & Testing

Run the automated test suite covering models, views, and templates:
```bash
python manage.py test
```
**Output:**
```text
Creating test database for alias 'default'...
.......
----------------------------------------------------------------------
Ran 7 tests in 0.061s

OK
Destroying test database for alias 'default'...
```

---

## 6. Summary of Essential `manage.py` Commands

| Command | Purpose |
| :--- | :--- |
| `python manage.py startapp <app_name>` | Generates a new Django application module |
| `python manage.py makemigrations` | Generates database migration files from `models.py` |
| `python manage.py migrate` | Applies pending migrations to SQLite database |
| `python manage.py createsuperuser` | Creates an administrator account for `/admin/` |
| `python manage.py runserver` | Starts lightweight local development server |
| `python manage.py test` | Runs the automated Django test suite |
| `python manage.py shell` | Opens interactive Python shell loaded with Django models |
| `python manage.py check` | Inspects project for configuration issues |
| `python manage.py showmigrations` | Lists all migrations and their execution status |
| `python manage.py seed_data` | Custom command to populate sample tasks and admin account |

---

## 7. Conclusion
In Experiment 15, we successfully set up and built a full Django To-Do web application utilizing SQLite and the MVT architectural pattern. All requirements—from database modeling, ORM queries, view logic, and URL routing to custom static file serving and modular template design (`extends` & `include`)—were implemented, verified, and thoroughly tested.
