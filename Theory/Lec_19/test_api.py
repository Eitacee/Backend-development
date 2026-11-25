"""
Automated validation script to test all endpoints as required by Lecture 19 Lab Exercise.
"""
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def run_tests():
    print("=" * 60)
    print("RUNNING LAB EXERCISE API TESTS")
    print("=" * 60)

    # 1. Root
    res = client.get("/")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    print("[PASS] GET / -> 200 OK")

    # 2. List Students & Pagination
    res = client.get("/students?page=1&limit=2")
    assert res.status_code == 200
    data = res.json()
    assert "data" in data and "total" in data and "page" in data and "total_pages" in data
    print(f"[PASS] GET /students (Pagination: page={data['page']}, total={data['total']}, total_pages={data['total_pages']})")

    # 3. Filtering by Branch
    res = client.get("/students?branch=CSE")
    assert res.status_code == 200
    cse_students = res.json()["data"]
    assert all(s["branch"] == "CSE" for s in cse_students)
    print(f"[PASS] GET /students?branch=CSE (found {len(cse_students)} students)")

    # 4. Search Filter
    res = client.get("/students?search=Akshat")
    assert res.status_code == 200
    search_results = res.json()["data"]
    assert len(search_results) >= 1
    print(f"[PASS] GET /students?search=Akshat (found {len(search_results)} match)")

    # 5. Create Student (POST /students)
    test_email = "test.student@upes.ac.in"
    new_student_payload = {
        "name": "Test Student",
        "email": test_email,
        "branch": "IT",
        "enrollment_date": "2024-08-15"
    }
    res = client.post("/students", json=new_student_payload)
    if res.status_code == 409:
        print("[INFO] Student already exists, continuing...")
        res = client.get(f"/students?search={test_email}")
        created_id = res.json()["data"][0]["id"]
    else:
        assert res.status_code == 201, f"Expected 201, got {res.status_code}: {res.text}"
        created_id = res.json()["id"]
        print(f"[PASS] POST /students -> 201 Created (ID: {created_id})")

    # 6. Duplicate Student (Conflict 409)
    res_conflict = client.post("/students", json=new_student_payload)
    assert res_conflict.status_code == 409, f"Expected 409, got {res_conflict.status_code}"
    print("[PASS] POST /students (Duplicate Email) -> 409 Conflict")

    # 7. Get Single Student
    res = client.get(f"/students/{created_id}")
    assert res.status_code == 200
    print(f"[PASS] GET /students/{created_id} -> 200 OK")

    # 8. Update Student (PUT /students/{id})
    res = client.put(f"/students/{created_id}", json={"branch": "CE"})
    assert res.status_code == 200
    assert res.json()["branch"] == "CE"
    print(f"[PASS] PUT /students/{created_id} -> Updated branch to CE")

    # 9. List Courses & Filter
    res = client.get("/courses")
    assert res.status_code == 200
    print(f"[PASS] GET /courses -> 200 OK ({len(res.json())} courses found)")

    # 10. Create Course (POST /courses)
    course_payload = {
        "id": "CS301",
        "title": "Cloud Computing",
        "credits": 3
    }
    res = client.post("/courses", json=course_payload)
    if res.status_code == 409:
        print("[INFO] Course CS301 already exists")
    else:
        assert res.status_code == 201
        print("[PASS] POST /courses -> 201 Created (CS301)")

    # 11. Nested Student Enrollments (POST /students/{id}/enrollments)
    enroll_payload = {
        "course_id": "CS301",
        "semester": "Semester 5",
        "grade": "A"
    }
    res = client.post(f"/students/{created_id}/enrollments", json=enroll_payload)
    if res.status_code == 409:
        print("[INFO] Student already enrolled in CS301")
    else:
        assert res.status_code == 201
        print(f"[PASS] POST /students/{created_id}/enrollments -> 201 Created")

    # 12. List Enrollments (GET /students/{id}/enrollments)
    res = client.get(f"/students/{created_id}/enrollments")
    assert res.status_code == 200
    print(f"[PASS] GET /students/{created_id}/enrollments -> {len(res.json())} enrollments")

    # 13. Delete Enrollment
    res = client.delete(f"/students/{created_id}/enrollments/CS301")
    assert res.status_code == 204
    print(f"[PASS] DELETE /students/{created_id}/enrollments/CS301 -> 204 No Content")

    # 14. Delete Student
    res = client.delete(f"/students/{created_id}")
    assert res.status_code == 204
    print(f"[PASS] DELETE /students/{created_id} -> 204 No Content")

    # 15. Verify 404 Not Found after deletion
    res = client.get(f"/students/{created_id}")
    assert res.status_code == 404
    print(f"[PASS] GET /students/{created_id} -> 404 Not Found (Correctly deleted)")

    print("=" * 60)
    print("ALL 15 TESTS PASSED SUCCESSFULLY! 100% READY FOR DEMONSTRATION")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
