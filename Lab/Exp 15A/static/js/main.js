// Static JavaScript demonstration for Django Experiment 15
document.addEventListener('DOMContentLoaded', () => {
    // Confirm before deleting tasks
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to delete this task?')) {
                e.preventDefault();
            }
        });
    });

    // Auto-focus task input on add_task page
    const taskInput = document.querySelector('input[name="title"]');
    if (taskInput) {
        taskInput.focus();
    }
});
