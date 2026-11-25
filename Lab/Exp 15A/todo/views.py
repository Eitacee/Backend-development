from django.shortcuts import render, redirect, get_object_or_404
from .models import Task

def task_list(request):
    tasks = Task.objects.all().order_by('-created_at')
    total_count = tasks.count()
    completed_count = tasks.filter(completed=True).count()
    pending_count = total_count - completed_count
    context = {
        'tasks': tasks,
        'total_count': total_count,
        'completed_count': completed_count,
        'pending_count': pending_count,
    }
    return render(request, 'todo/task_list.html', context)

def add_task(request):
    if request.method == 'POST':
        title = request.POST.get('title', '').strip()
        if title:
            Task.objects.create(title=title)
        return redirect('task_list')
    return render(request, 'todo/add_task.html')

def toggle_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.completed = not task.completed
    task.save()
    return redirect('task_list')

def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)
    task.delete()
    return redirect('task_list')
