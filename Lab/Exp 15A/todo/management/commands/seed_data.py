from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from todo.models import Task

class Command(BaseCommand):
    help = 'Seeds initial sample tasks and creates an admin superuser'

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("Superuser 'admin' created (password: admin123)."))
        else:
            self.stdout.write(self.style.WARNING("Superuser 'admin' already exists."))

        sample_tasks = [
            ("Set up Django project and virtual environment", True),
            ("Configure SQLite database & run initial migrations", True),
            ("Implement Task model with title, completed, and timestamp", True),
            ("Demonstrate modular templating with extends and include", True),
            ("Configure and serve static CSS and JavaScript files", True),
            ("Test CRUD operations (Create, Read, Update, Delete)", False),
            ("Review Django admin panel and manage task records", False),
        ]

        created_count = 0
        for title, completed in sample_tasks:
            task, created = Task.objects.get_or_create(title=title, defaults={'completed': completed})
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {created_count} sample tasks."))
