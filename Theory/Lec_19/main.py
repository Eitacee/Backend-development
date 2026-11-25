from fastapi import FastAPI, HTTPException, Depends, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date
import math

from database import engine, get_db, Base
from models import Student, Course, Department, Enrollment
from schemas import (
    StudentCreate,
    StudentUpdate,
    StudentResponse,
    StudentListResponse,
    CourseCreate,
    CourseResponse,
    DepartmentCreate,
    DepartmentResponse,
    EnrollmentCreate,
    EnrollmentResponse,
    ErrorResponse,
    BranchEnum,
)

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management API",
    description="API for managing students, courses, departments, and enrollments",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to Student Management API",
        "docs": "/docs",
        "redoc": "/redoc",
    }


# ==================== STUDENTS ====================
@app.get("/students", response_model=StudentListResponse, tags=["Students"])
def list_students(
    branch: Optional[BranchEnum] = Query(None, description="Filter by branch"),
    department_id: Optional[int] = Query(None, description="Filter by department"),
    search: Optional[str] = Query(None, description="Search by name or email"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db),
):
    query = db.query(Student)

    if branch:
        query = query.filter(Student.branch == branch)
    if department_id:
        query = query.filter(Student.department_id == department_id)
    if search:
        query = query.filter(
            (Student.name.ilike(f"%{search}%"))
            | (Student.email.ilike(f"%{search}%"))
        )

    total = query.count()
    total_pages = math.ceil(total / limit) if total > 0 else 1
    offset = (page - 1) * limit

    students = query.offset(offset).limit(limit).all()

    return {
        "data": students,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


@app.get("/students/{student_id}", response_model=StudentResponse, tags=["Students"])
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )
    return student


@app.post(
    "/students",
    response_model=StudentResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Students"],
)
def create_student(student: StudentCreate, db: Session = Depends(get_db)):
    existing = db.query(Student).filter(Student.email == student.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    if student.department_id is not None:
        dept = db.query(Department).filter(Department.id == student.department_id).first()
        if not dept:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Department with ID {student.department_id} not found",
            )

    db_student = Student(**student.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


@app.put("/students/{student_id}", response_model=StudentResponse, tags=["Students"])
def update_student(
    student_id: int,
    student: StudentUpdate,
    db: Session = Depends(get_db),
):
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    if student.department_id is not None:
        dept = db.query(Department).filter(Department.id == student.department_id).first()
        if not dept:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Department with ID {student.department_id} not found",
            )

    update_data = student.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_student, field, value)

    db.commit()
    db.refresh(db_student)
    return db_student


@app.delete(
    "/students/{student_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Students"],
)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    db.delete(db_student)
    db.commit()
    return None


# ==================== COURSES ====================
@app.get("/courses", response_model=List[CourseResponse], tags=["Courses"])
def list_courses(
    department_id: Optional[int] = Query(None, description="Filter by department"),
    credits: Optional[int] = Query(None, ge=1, le=6, description="Filter by credits"),
    db: Session = Depends(get_db),
):
    query = db.query(Course)

    if department_id:
        query = query.filter(Course.department_id == department_id)
    if credits:
        query = query.filter(Course.credits == credits)

    return query.all()


@app.post(
    "/courses",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Courses"],
)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    existing = db.query(Course).filter(Course.id == course.id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Course already exists",
        )

    if course.department_id is not None:
        dept = db.query(Department).filter(Department.id == course.department_id).first()
        if not dept:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Department with ID {course.department_id} not found",
            )

    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


@app.get("/courses/{course_id}", response_model=CourseResponse, tags=["Courses"])
def get_course(course_id: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )
    return course


@app.delete(
    "/courses/{course_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Courses"],
)
def delete_course(course_id: str, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )
    db.delete(course)
    db.commit()
    return None


# ==================== ENROLLMENTS ====================
@app.get(
    "/students/{student_id}/enrollments",
    response_model=List[EnrollmentResponse],
    tags=["Enrollments"],
)
def list_student_enrollments(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    return db.query(Enrollment).filter(Enrollment.student_id == student_id).all()


@app.post(
    "/students/{student_id}/enrollments",
    response_model=EnrollmentResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Enrollments"],
)
def create_enrollment(
    student_id: int,
    enrollment: EnrollmentCreate,
    db: Session = Depends(get_db),
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found",
        )

    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    existing = db.query(Enrollment).filter(
        Enrollment.student_id == student_id,
        Enrollment.course_id == enrollment.course_id,
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Already enrolled in this course",
        )

    db_enrollment = Enrollment(
        student_id=student_id,
        **enrollment.model_dump(),
    )
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


@app.delete(
    "/students/{student_id}/enrollments/{course_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Enrollments"],
)
def delete_enrollment(
    student_id: int,
    course_id: str,
    db: Session = Depends(get_db),
):
    enrollment = db.query(Enrollment).filter(
        Enrollment.student_id == student_id,
        Enrollment.course_id == course_id,
    ).first()

    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found",
        )

    db.delete(enrollment)
    db.commit()
    return None


# ==================== DEPARTMENTS ====================
@app.get("/departments", response_model=List[DepartmentResponse], tags=["Departments"])
def list_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()


@app.post(
    "/departments",
    response_model=DepartmentResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Departments"],
)
def create_department(department: DepartmentCreate, db: Session = Depends(get_db)):
    existing = db.query(Department).filter(Department.name == department.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Department already exists",
        )

    db_department = Department(**department.model_dump())
    db.add(db_department)
    db.commit()
    db.refresh(db_department)
    return db_department


@app.get("/departments/{department_id}", response_model=DepartmentResponse, tags=["Departments"])
def get_department(department_id: int, db: Session = Depends(get_db)):
    department = db.query(Department).filter(Department.id == department_id).first()
    if not department:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Department not found",
        )
    return department


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
