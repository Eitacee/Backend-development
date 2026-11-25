"""
Script to seed the SQLite database with initial sample data for demonstration.
"""
from datetime import date
from database import engine, SessionLocal, Base
from models import Department, Student, Course, Enrollment

# Ensure tables exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    print("Seeding database...")
    
    # 1. Departments
    dept_cse = db.query(Department).filter_by(name="Computer Science & Engineering").first()
    if not dept_cse:
        dept_cse = Department(name="Computer Science & Engineering")
        db.add(dept_cse)

    dept_ece = db.query(Department).filter_by(name="Electronics & Communication").first()
    if not dept_ece:
        dept_ece = Department(name="Electronics & Communication")
        db.add(dept_ece)
        
    db.commit()
    db.refresh(dept_cse)
    db.refresh(dept_ece)

    # 2. Courses
    c1 = db.query(Course).filter_by(id="CS101").first()
    if not c1:
        c1 = Course(id="CS101", title="Data Structures and Algorithms", credits=4, department_id=dept_cse.id)
        db.add(c1)

    c2 = db.query(Course).filter_by(id="CS201").first()
    if not c2:
        c2 = Course(id="CS201", title="Backend Development & REST APIs", credits=4, department_id=dept_cse.id)
        db.add(c2)

    c3 = db.query(Course).filter_by(id="EC101").first()
    if not c3:
        c3 = Course(id="EC101", title="Digital Electronics", credits=3, department_id=dept_ece.id)
        db.add(c3)

    db.commit()

    # 3. Students
    s1 = db.query(Student).filter_by(email="akshat@upes.ac.in").first()
    if not s1:
        s1 = Student(
            name="Akshat Mamgain",
            email="akshat@upes.ac.in",
            branch="CSE",
            enrollment_date=date(2024, 8, 1),
            department_id=dept_cse.id,
        )
        db.add(s1)

    s2 = db.query(Student).filter_by(email="aarav@upes.ac.in").first()
    if not s2:
        s2 = Student(
            name="Aarav Sharma",
            email="aarav@upes.ac.in",
            branch="CSE",
            enrollment_date=date(2024, 8, 1),
            department_id=dept_cse.id,
        )
        db.add(s2)

    s3 = db.query(Student).filter_by(email="diya@upes.ac.in").first()
    if not s3:
        s3 = Student(
            name="Diya Verma",
            email="diya@upes.ac.in",
            branch="ECE",
            enrollment_date=date(2024, 8, 1),
            department_id=dept_ece.id,
        )
        db.add(s3)

    db.commit()
    db.refresh(s1)

    # 4. Enrollments
    e1 = db.query(Enrollment).filter_by(student_id=s1.id, course_id="CS201").first()
    if not e1:
        e1 = Enrollment(student_id=s1.id, course_id="CS201", semester="Semester 5", grade="A")
        db.add(e1)

    e2 = db.query(Enrollment).filter_by(student_id=s1.id, course_id="CS101").first()
    if not e2:
        e2 = Enrollment(student_id=s1.id, course_id="CS101", semester="Semester 4", grade="A+")
        db.add(e2)

    db.commit()
    print("Database successfully seeded!")
except Exception as e:
    db.rollback()
    print("Error seeding database:", e)
finally:
    db.close()
