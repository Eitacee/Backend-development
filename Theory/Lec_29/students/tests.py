from django.test import TestCase
from django.urls import reverse


class StudentAPITest(TestCase):

    def test_health_endpoint(self):
        response = self.client.get(reverse("health-check"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class StudentRouteTest(TestCase):

    def test_student_detail_returns_id(self):
        response = self.client.get(
            reverse("student-detail", kwargs={"student_id": 42})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["student_id"], 42)