from django.test import TestCase, Client
from django.urls import reverse
from .models import Task

class TaskModelTest(TestCase):
    def setUp(self):
        self.task = Task.objects.create(title="Learn Django MVT")

    def test_task_creation(self):
        """Test task creation and default values."""
        self.assertEqual(self.task.title, "Learn Django MVT")
        self.assertFalse(self.task.completed)
        self.assertIsNotNone(self.task.created_at)

    def test_str_representation(self):
        """Test the string representation of the Task model."""
        self.assertEqual(str(self.task), "Learn Django MVT")

class TaskViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.task1 = Task.objects.create(title="Task 1", completed=False)
        self.task2 = Task.objects.create(title="Task 2", completed=True)

    def test_task_list_view(self):
        """Test task_list view rendering and context."""
        response = self.client.get(reverse('task_list'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/task_list.html')
        self.assertTemplateUsed(response, 'base.html')
        self.assertTemplateUsed(response, 'todo/includes/task_item.html')
        self.assertContains(response, "Task 1")
        self.assertContains(response, "Task 2")
        self.assertEqual(response.context['total_count'], 2)
        self.assertEqual(response.context['completed_count'], 1)
        self.assertEqual(response.context['pending_count'], 1)

    def test_add_task_get(self):
        """Test GET request to add_task page."""
        response = self.client.get(reverse('add_task'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todo/add_task.html')
        self.assertTemplateUsed(response, 'base.html')

    def test_add_task_post(self):
        """Test POST request to add_task creates a new task."""
        response = self.client.post(reverse('add_task'), {'title': 'New Test Task'})
        self.assertRedirects(response, reverse('task_list'))
        self.assertTrue(Task.objects.filter(title='New Test Task').exists())

    def test_toggle_task(self):
        """Test toggling task completed status."""
        self.assertFalse(self.task1.completed)
        response = self.client.get(reverse('toggle_task', args=[self.task1.id]))
        self.assertRedirects(response, reverse('task_list'))
        self.task1.refresh_from_db()
        self.assertTrue(self.task1.completed)

        # Toggle back to False
        response = self.client.get(reverse('toggle_task', args=[self.task1.id]))
        self.task1.refresh_from_db()
        self.assertFalse(self.task1.completed)

    def test_delete_task(self):
        """Test deleting a task."""
        task_id = self.task1.id
        response = self.client.get(reverse('delete_task', args=[task_id]))
        self.assertRedirects(response, reverse('task_list'))
        self.assertFalse(Task.objects.filter(id=task_id).exists())
