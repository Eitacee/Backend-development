/**
 * Experiment 07 & 08: ES6, DOM Manipulation & Event Handling
 * Author: Student (SAP ID: 590014595)
 * Description: Modular, modern vanilla JavaScript illustrating ES6 features,
 * DOM dynamic tree mutations, and browser event-driven patterns.
 */

// ==========================================================================
// 1. ES6 CLASS DEFINITIONS & STATE MANAGEMENT
// ==========================================================================

/**
 * TaskItem Class representing a single to-do entry.
 * Demonstrates: ES6 Class, Constructor, Default Parameters, and Getters.
 */
class TaskItem {
    constructor({
        id = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title,
        category = 'Lab & Coding',
        priority = 'Medium',
        dueDate = '',
        completed = false,
        createdAt = new Date().toISOString()
    } = {}) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    // Toggle completion status
    toggle() {
        this.completed = !this.completed;
    }

    // Format display date
    get formattedDueDate() {
        if (!this.dueDate) return 'No due date';
        const date = new Date(this.dueDate);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }
}

/**
 * TaskManager Class handling all task operations, persistence, and filtering.
 * Demonstrates: ES6 Array Methods (filter, reduce, findIndex), Spread Operator, Destructuring.
 */
class TaskManager {
    constructor(storageKey = 'webLab_exp78_tasks') {
        this.storageKey = storageKey;
        this.tasks = this.loadFromStorage();
    }

    // Load from localStorage using nullish coalescing & JSON parsing
    loadFromStorage() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            // Re-instantiate TaskItem instances using map and object spread
            return parsed.map(item => new TaskItem({ ...item }));
        } catch (error) {
            console.error('Failed to load tasks from localStorage:', error);
            return [];
        }
    }

    // Save tasks to localStorage
    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    // Add task using spread operator
    addTask(taskData) {
        const newTask = new TaskItem(taskData);
        this.tasks = [newTask, ...this.tasks];
        this.saveToStorage();
        return newTask;
    }

    // Toggle task by ID
    toggleTask(taskId) {
        const target = this.tasks.find(t => t.id === taskId);
        if (target) {
            target.toggle();
            this.saveToStorage();
            return target;
        }
        return null;
    }

    // Delete task by ID using filter
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveToStorage();
    }

    // Clear completed tasks
    clearCompleted() {
        const initialCount = this.tasks.length;
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveToStorage();
        return initialCount - this.tasks.length;
    }

    // Load initial demo/sample tasks
    loadSampleData() {
        const samples = [
            { title: 'Revise ES6 Destructuring & Spread Syntax', category: 'Lab & Coding', priority: 'High', dueDate: '2026-10-18', completed: true },
            { title: 'Practice DOM querySelector and Event Delegation', category: 'Academics', priority: 'High', dueDate: '2026-10-20', completed: false },
            { title: 'Build Event Bubbling vs Capturing Experiment', category: 'Projects', priority: 'Medium', dueDate: '2026-10-22', completed: false },
            { title: 'Prepare Viva Voce Answers for Web Tech Lab', category: 'Academics', priority: 'Medium', dueDate: '2026-10-25', completed: false },
            { title: 'Submit Experiment 07 & 08 GitHub Repository Link', category: 'Lab & Coding', priority: 'Low', dueDate: '2026-10-30', completed: false }
        ];

        // Map and instantiate
        this.tasks = samples.map(data => new TaskItem(data));
        this.saveToStorage();
    }

    // Calculate metrics using reduce and object destructuring
    getMetrics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, pending, rate };
    }

    // Filter tasks by query and status
    getFilteredTasks(query = '', filter = 'all') {
        const sanitizedQuery = query.toLowerCase().trim();

        return this.tasks.filter(task => {
            // Match search query
            const matchesQuery = !sanitizedQuery ||
                task.title.toLowerCase().includes(sanitizedQuery) ||
                task.category.toLowerCase().includes(sanitizedQuery);

            if (!matchesQuery) return false;

            // Match active filter
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            if (filter === 'High') return task.priority === 'High';

            return true; // 'all'
        });
    }
}

// ==========================================================================
// 2. DOM UTILITIES & TOAST NOTIFICATION SYSTEM
// ==========================================================================

const Toast = {
    container: document.getElementById('toastContainer'),

    show(message, type = 'info', duration = 3000) {
        if (!this.container) return;

        // Create DOM element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            info: '💡'
        };

        // Template literal injection
        toast.innerHTML = `
            <span>${icons[type] || '🔔'}</span>
            <span>${message}</span>
        `;

        this.container.appendChild(toast);

        // Auto remove with transition
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px) scale(0.9)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};

// ==========================================================================
// 3. CAPSTONE CONTROLLER (TaskFlow Pro)
// ==========================================================================

class CapstoneController {
    constructor() {
        this.manager = new TaskManager();
        this.activeFilter = 'all';
        this.searchQuery = '';

        // If no tasks exist, load samples automatically
        if (this.manager.tasks.length === 0) {
            this.manager.loadSampleData();
        }

        this.cacheDom();
        this.bindEvents();
        this.render();
    }

    cacheDom() {
        // Elements
        this.taskForm = document.getElementById('taskForm');
        this.taskTitle = document.getElementById('taskTitle');
        this.taskCategory = document.getElementById('taskCategory');
        this.taskPriority = document.getElementById('taskPriority');
        this.taskDueDate = document.getElementById('taskDueDate');

        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.taskSearchInput = document.getElementById('taskSearchInput');
        this.clearSearchBtn = document.getElementById('clearSearchBtn');
        this.filterBtnGroup = document.getElementById('filterBtnGroup');

        // Metrics elements
        this.statTotal = document.getElementById('statTotal');
        this.statCompleted = document.getElementById('statCompleted');
        this.statPending = document.getElementById('statPending');
        this.statRate = document.getElementById('statRate');
        this.taskProgressBar = document.getElementById('taskProgressBar');
        this.activeTaskCount = document.getElementById('activeTaskCount');

        // Buttons
        this.loadSampleTasksBtn = document.getElementById('loadSampleTasksBtn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    }

    bindEvents() {
        // Form Submission with preventDefault
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Search Input (Real-time input event)
        this.taskSearchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.clearSearchBtn.classList.toggle('hidden', !this.searchQuery);
            this.renderTasks();
        });

        // Clear Search Button
        this.clearSearchBtn.addEventListener('click', () => {
            this.taskSearchInput.value = '';
            this.searchQuery = '';
            this.clearSearchBtn.classList.add('hidden');
            this.renderTasks();
            this.taskSearchInput.focus();
        });

        // Filter Buttons (Event Delegation on Filter Group)
        this.filterBtnGroup.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            // Remove active from siblings
            [...this.filterBtnGroup.children].forEach(child => child.classList.remove('active'));
            btn.classList.add('active');

            this.activeFilter = btn.dataset.filter;
            this.renderTasks();
        });

        // Task List Container: HIGH PERFORMANCE EVENT DELEGATION
        // Single event listener on parent <ul> for all dynamic items
        this.taskList.addEventListener('click', (e) => {
            const taskItemEl = e.target.closest('.task-item');
            if (!taskItemEl) return;

            const taskId = taskItemEl.dataset.id;

            // Handle Checkbox / Toggle Click
            if (e.target.closest('.task-checkbox-custom') || e.target.closest('.task-content-wrap')) {
                const updated = this.manager.toggleTask(taskId);
                if (updated) {
                    Toast.show(
                        updated.completed ? 'Task marked as completed! 🎉' : 'Task marked as pending.',
                        'info'
                    );
                    this.render();
                }
            }

            // Handle Delete Click
            if (e.target.closest('.btn-task-delete')) {
                this.manager.deleteTask(taskId);
                Toast.show('Task deleted.', 'error');
                this.render();
            }
        });

        // Load Samples Button
        this.loadSampleTasksBtn.addEventListener('click', () => {
            this.manager.loadSampleData();
            Toast.show('Sample tasks loaded successfully!', 'success');
            this.render();
        });

        // Clear Completed Button
        this.clearCompletedBtn.addEventListener('click', () => {
            const count = this.manager.clearCompleted();
            if (count > 0) {
                Toast.show(`Cleared ${count} completed task(s).`, 'info');
                this.render();
            } else {
                Toast.show('No completed tasks to clear.', 'info');
            }
        });

        // Global Keyboard Shortcut: Ctrl/Cmd + K to focus search
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.taskSearchInput.focus();
                this.taskSearchInput.select();
            }
        });
    }

    handleFormSubmit() {
        const title = this.taskTitle.value.trim();
        if (!title) return;

        // Object Destructuring for formData
        const taskData = {
            title,
            category: this.taskCategory.value,
            priority: this.taskPriority.value,
            dueDate: this.taskDueDate.value
        };

        this.manager.addTask(taskData);
        Toast.show('Task created successfully! 🚀', 'success');

        // Reset form fields
        this.taskTitle.value = '';
        this.taskDueDate.value = '';
        this.taskTitle.focus();

        this.render();
    }

    render() {
        this.renderMetrics();
        this.renderTasks();
    }

    renderMetrics() {
        // Destructure metrics object
        const { total, completed, pending, rate } = this.manager.getMetrics();

        this.statTotal.textContent = total;
        this.statCompleted.textContent = completed;
        this.statPending.textContent = pending;
        this.statRate.textContent = `${rate}%`;

        // Update CSS progress bar
        this.taskProgressBar.style.width = `${rate}%`;
        this.activeTaskCount.textContent = `${pending} active task${pending === 1 ? '' : 's'} remaining`;
    }

    renderTasks() {
        const filtered = this.manager.getFilteredTasks(this.searchQuery, this.activeFilter);

        // Clear existing items in DOM
        this.taskList.innerHTML = '';

        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        // Map over filtered tasks and create DOM nodes using ES6 Template Literals
        const fragment = document.createDocumentFragment();

        filtered.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            // Template literal interpolation
            li.innerHTML = `
                <div class="task-left">
                    <button type="button" class="task-checkbox-custom" aria-label="Toggle status">
                        ${task.completed ? '✓' : ''}
                    </button>
                    <div class="task-content-wrap">
                        <span class="task-title-text">${this.escapeHtml(task.title)}</span>
                        <div class="task-meta">
                            <span class="badge-tag badge-priority-${task.priority.toLowerCase()}">${task.priority}</span>
                            <span class="badge-tag badge-category">${task.category}</span>
                            <span>📅 ${task.formattedDueDate}</span>
                        </div>
                    </div>
                </div>
                <div class="task-actions">
                    <button type="button" class="btn-task-action btn-task-delete" title="Delete task" aria-label="Delete">
                        🗑️
                    </button>
                </div>
            `;

            fragment.appendChild(li);
        });

        this.taskList.appendChild(fragment);
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// ==========================================================================
// 4. ES6 SYNTAX SANDBOX CONTROLLER
// ==========================================================================

class Es6SandboxController {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        // Individual demo triggers
        document.querySelectorAll('.run-demo-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const demoKey = e.currentTarget.dataset.demo;
                this.executeDemo(demoKey);
            });
        });

        // Run All Tests button
        const runAllBtn = document.getElementById('runAllEs6Btn');
        if (runAllBtn) {
            runAllBtn.addEventListener('click', () => {
                const keys = ['variables', 'arrows', 'templates', 'destructuring', 'spread', 'arraymethods', 'classes', 'async'];
                keys.forEach((key, index) => {
                    setTimeout(() => this.executeDemo(key), index * 100);
                });
                Toast.show('Ran all ES6 test modules!', 'success');
            });
        }
    }

    executeDemo(key) {
        const outEl = document.getElementById(`out-${key}`);
        if (!outEl) return;

        let output = '';

        switch (key) {
            case 'variables': {
                // let vs const vs var & TDZ
                const pi = 3.14159;
                let mutableCount = 10;
                let scopeLog = [];

                scopeLog.push(`Initial let mutableCount = ${mutableCount}`);
                scopeLog.push(`Initial const pi = ${pi}`);

                {
                    let mutableCount = 999; // Block shadowed
                    const blockConst = 'Inside Block';
                    scopeLog.push(`Inside block: mutableCount = ${mutableCount}, blockConst = "${blockConst}"`);
                }

                scopeLog.push(`Outside block: mutableCount = ${mutableCount}`);
                output = scopeLog.join('\n');
                break;
            }

            case 'arrows': {
                // Arrow functions and lexical this
                const multiply = (x, y) => x * y;
                const person = {
                    name: 'Alex',
                    hobbies: ['Coding', 'Music'],
                    printHobbies() {
                        // Arrow function captures lexical 'this' from person
                        return this.hobbies.map(h => `${this.name} enjoys ${h}`).join('; ');
                    }
                };

                output = [
                    `multiply(7, 8) => ${multiply(7, 8)}`,
                    `Lexical this result => "${person.printHobbies()}"`
                ].join('\n');
                break;
            }

            case 'templates': {
                // String interpolation & expressions
                const item = 'Mechanical Keyboard';
                const price = 85.50;
                const quantity = 3;

                const invoice = `Invoice Item: ${item}
Unit Price: $${price.toFixed(2)}
Quantity: ${quantity}
Total Amount: $${(price * quantity).toFixed(2)}
Status: ${price * quantity > 200 ? '⭐ Bulk Discount Applied' : 'Standard Rate'}`;

                output = invoice;
                break;
            }

            case 'destructuring': {
                // Object & Array Destructuring
                const labStudent = {
                    studentId: 590014595,
                    fullName: 'Prince Kandari',
                    course: 'B.Tech CSE',
                    marks: { internal: 28, external: 65 }
                };

                const { studentId, fullName, course, marks: { internal, external }, grade = 'A' } = labStudent;
                const colors = ['#6366f1', '#06b6d4', '#10b981'];
                const [primaryColor, secondaryColor] = colors;

                output = [
                    `Student ID: ${studentId}`,
                    `Full Name: ${fullName}`,
                    `Internal: ${internal}, External: ${external}, Total: ${internal + external}`,
                    `Default Fallback Grade: ${grade}`,
                    `Destructured Colors: [Primary: ${primaryColor}, Secondary: ${secondaryColor}]`
                ].join('\n');
                break;
            }

            case 'spread': {
                // Spread and Rest
                const sumNumbers = (...nums) => nums.reduce((acc, curr) => acc + curr, 0);

                const baseConfig = { theme: 'dark', language: 'en' };
                const userConfig = { ...baseConfig, language: 'hi', autoSave: true };

                const frontEnd = ['HTML5', 'CSS3'];
                const fullStack = [...frontEnd, 'JavaScript ES6', 'Node.js', 'Express'];

                output = [
                    `Rest Parameter sumNumbers(5, 10, 15, 20) = ${sumNumbers(5, 10, 15, 20)}`,
                    `Merged Object: ${JSON.stringify(userConfig)}`,
                    `Expanded Array: [${fullStack.join(', ')}]`
                ].join('\n');
                break;
            }

            case 'arraymethods': {
                // map, filter, reduce, find
                const numbers = [12, 45, 8, 93, 27, 60, 5, 88];

                const evenNumbers = numbers.filter(n => n % 2 === 0);
                const doubledEvens = evenNumbers.map(n => n * 2);
                const sumOfAll = numbers.reduce((sum, n) => sum + n, 0);
                const firstOver50 = numbers.find(n => n > 50);

                output = [
                    `Original: [${numbers.join(', ')}]`,
                    `filter(even): [${evenNumbers.join(', ')}]`,
                    `map(even * 2): [${doubledEvens.join(', ')}]`,
                    `reduce(sum): ${sumOfAll}`,
                    `find(> 50): ${firstOver50}`
                ].join('\n');
                break;
            }

            case 'classes': {
                // ES6 Classes & Inheritance
                class LabAssignment {
                    constructor(experimentNo, topic) {
                        this.experimentNo = experimentNo;
                        this.topic = topic;
                    }
                    getDetails() {
                        return `Exp ${this.experimentNo}: ${this.topic}`;
                    }
                }

                class WebDevExperiment extends LabAssignment {
                    constructor(experimentNo, topic, technology) {
                        super(experimentNo, topic);
                        this.technology = technology;
                    }
                    getDetails() {
                        return `${super.getDetails()} [Tech: ${this.technology}]`;
                    }
                }

                const exp = new WebDevExperiment('07 & 08', 'ES6, DOM & Events', 'Vanilla Modern JS');
                output = [
                    `Instance of WebDevExperiment created:`,
                    exp.getDetails(),
                    `instanceof LabAssignment? ${exp instanceof LabAssignment}`
                ].join('\n');
                break;
            }

            case 'async': {
                // Promises and Async/Await
                outEl.textContent = '// Simulating network request (awaiting Promise)...';
                outEl.style.color = '#f59e0b';

                const fetchMockData = () => new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            status: 200,
                            endpoint: '/api/v1/lab-submission',
                            data: { verified: true, score: 100 }
                        });
                    }, 500);
                });

                (async () => {
                    const response = await fetchMockData();
                    outEl.textContent = [
                        `Async/Await Promise Resolved! ✅`,
                        `Status: ${response.status}`,
                        `Payload: ${JSON.stringify(response.data)}`
                    ].join('\n');
                    outEl.style.color = '#a7f3d0';
                })();
                return;
            }
        }

        outEl.textContent = output;
        outEl.style.color = '#a7f3d0';
    }
}

// ==========================================================================
// 5. DOM MANIPULATION STUDIO CONTROLLER
// ==========================================================================

class DomStudioController {
    constructor() {
        this.nodeCounter = 0;
        this.cacheDom();
        this.bindEvents();
        this.updateInspector();
    }

    cacheDom() {
        // Target Card & Elements
        this.domTargetCard = document.getElementById('domTargetCard');
        this.targetHeading = document.getElementById('targetHeading');
        this.targetSubtext = document.getElementById('targetSubtext');
        this.dynamicContainer = document.getElementById('dynamicContainer');
        this.nodeCounterEl = document.getElementById('nodeCounter');
        this.previewStateBadge = document.getElementById('previewStateBadge');
        this.liveInspectorCode = document.getElementById('liveInspectorCode');

        // Inputs
        this.domTextInput = document.getElementById('domTextInput');
        this.domHtmlInput = document.getElementById('domHtmlInput');
        this.newNodeInput = document.getElementById('newNodeInput');

        // Buttons
        this.btnUpdateText = document.getElementById('btnUpdateText');
        this.btnUpdateHtml = document.getElementById('btnUpdateHtml');
        this.btnToggleNeon = document.getElementById('btnToggleNeon');
        this.btnToggleGlass = document.getElementById('btnToggleGlass');
        this.btnToggleShape = document.getElementById('btnToggleShape');
        this.btnRandomColor = document.getElementById('btnRandomColor');

        this.btnAppendNode = document.getElementById('btnAppendNode');
        this.btnPrependNode = document.getElementById('btnPrependNode');
        this.btnRemoveLastNode = document.getElementById('btnRemoveLastNode');
        this.btnClearAllNodes = document.getElementById('btnClearAllNodes');

        this.btnSetCustomAttr = document.getElementById('btnSetCustomAttr');
        this.btnToggleDisabled = document.getElementById('btnToggleDisabled');
        this.btnInspectAttrs = document.getElementById('btnInspectAttrs');
        this.resetDomLabBtn = document.getElementById('resetDomLabBtn');
    }

    bindEvents() {
        // 1. TextContent & innerHTML
        this.btnUpdateText.addEventListener('click', () => {
            const val = this.domTextInput.value.trim() || 'Updated Text';
            // Setting textContent safely without parsing HTML
            this.targetHeading.textContent = val;
            this.previewStateBadge.textContent = 'State: textContent Modified';
            this.updateInspector();
            Toast.show('Updated heading via textContent!', 'info');
        });

        this.btnUpdateHtml.addEventListener('click', () => {
            const val = this.domHtmlInput.value.trim() || '<b>Bold Text</b>';
            // Setting innerHTML (parses markup)
            this.targetSubtext.innerHTML = val;
            this.previewStateBadge.textContent = 'State: innerHTML Injected';
            this.updateInspector();
            Toast.show('Updated subtext via innerHTML!', 'info');
        });

        // 2. ClassList & Styles
        this.btnToggleNeon.addEventListener('click', () => {
            const isActive = this.domTargetCard.classList.toggle('neon-glow');
            this.previewStateBadge.textContent = `State: Neon Glow ${isActive ? 'ON' : 'OFF'}`;
            this.updateInspector();
        });

        this.btnToggleGlass.addEventListener('click', () => {
            const isActive = this.domTargetCard.classList.toggle('glass-morphism');
            this.previewStateBadge.textContent = `State: Glassmorphism ${isActive ? 'ON' : 'OFF'}`;
            this.updateInspector();
        });

        this.btnToggleShape.addEventListener('click', () => {
            const isActive = this.domTargetCard.classList.toggle('pill-shape');
            this.previewStateBadge.textContent = `State: Shape ${isActive ? 'Pill' : 'Default'}`;
            this.updateInspector();
        });

        this.btnRandomColor.addEventListener('click', () => {
            const hue = Math.floor(Math.random() * 360);
            const color = `hsla(${hue}, 70%, 25%, 0.35)`;
            this.domTargetCard.style.backgroundColor = color;
            this.previewStateBadge.textContent = `State: bg = ${color}`;
            this.updateInspector();
        });

        // 3. Dynamic Node Creation & Deletion
        this.btnAppendNode.addEventListener('click', () => {
            this.addDynamicTag(false);
        });

        this.btnPrependNode.addEventListener('click', () => {
            this.addDynamicTag(true);
        });

        this.btnRemoveLastNode.addEventListener('click', () => {
            const lastChild = this.dynamicContainer.lastElementChild;
            if (lastChild) {
                lastChild.remove();
                this.updateNodeCounter();
                this.updateInspector();
                Toast.show('Removed last child node.', 'info');
            } else {
                Toast.show('No child nodes to remove.', 'error');
            }
        });

        this.btnClearAllNodes.addEventListener('click', () => {
            this.dynamicContainer.innerHTML = '';
            this.updateNodeCounter();
            this.updateInspector();
            Toast.show('Cleared all dynamic children.', 'info');
        });

        // 4. Attributes & Dataset
        this.btnSetCustomAttr.addEventListener('click', () => {
            const currentState = this.domTargetCard.getAttribute('data-state');
            const newState = currentState === 'active' ? 'idle' : 'active';
            this.domTargetCard.setAttribute('data-state', newState);
            this.previewStateBadge.textContent = `data-state="${newState}"`;
            this.updateInspector();
            Toast.show(`Set attribute data-state="${newState}"`, 'info');
        });

        this.btnToggleDisabled.addEventListener('click', () => {
            const isAria = this.domTargetCard.getAttribute('aria-disabled') === 'true';
            this.domTargetCard.setAttribute('aria-disabled', !isAria);
            this.updateInspector();
            Toast.show(`Toggled aria-disabled to ${!isAria}`, 'info');
        });

        this.btnInspectAttrs.addEventListener('click', () => {
            const attrs = [...this.domTargetCard.attributes]
                .map(attr => `${attr.name}="${attr.value}"`)
                .join(', ');
            alert(`Live Attributes on #domTargetCard:\n\n${attrs}`);
        });

        // Reset
        this.resetDomLabBtn.addEventListener('click', () => {
            this.targetHeading.textContent = 'Target Heading';
            this.targetSubtext.textContent = 'This element is dynamically controlled by the controls on the left.';
            this.domTargetCard.className = 'card preview-card';
            this.domTargetCard.style.backgroundColor = '';
            this.dynamicContainer.innerHTML = '';
            this.previewStateBadge.textContent = 'State: Normal';
            this.updateNodeCounter();
            this.updateInspector();
            Toast.show('Playground reset to default state.', 'info');
        });

        // Event delegation to remove dynamic tag when (x) is clicked
        this.dynamicContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dynamic-tag-remove')) {
                const tag = e.target.closest('.dynamic-tag');
                if (tag) {
                    tag.remove();
                    this.updateNodeCounter();
                    this.updateInspector();
                }
            }
        });
    }

    addDynamicTag(prepend = false) {
        this.nodeCounter++;
        const text = this.newNodeInput.value.trim() || `Dynamic Node #${this.nodeCounter}`;

        // DOM node creation
        const span = document.createElement('span');
        span.className = 'dynamic-tag';
        span.innerHTML = `
            <span>${text}</span>
            <span class="dynamic-tag-remove" title="Remove node">✕</span>
        `;

        if (prepend) {
            this.dynamicContainer.prepend(span);
        } else {
            this.dynamicContainer.appendChild(span);
        }

        this.updateNodeCounter();
        this.updateInspector();
    }

    updateNodeCounter() {
        const count = this.dynamicContainer.children.length;
        this.nodeCounterEl.textContent = `${count} child${count === 1 ? '' : 'ren'}`;
    }

    updateInspector() {
        if (!this.liveInspectorCode) return;
        const outer = this.domTargetCard.cloneNode(true);
        // Clean inspector clone content for readability
        const inspectorEl = outer.querySelector('.dom-inspector-box');
        if (inspectorEl) inspectorEl.remove();

        this.liveInspectorCode.textContent = outer.outerHTML.slice(0, 500) + '...';
    }
}

// ==========================================================================
// 6. EVENT HANDLING ARENA CONTROLLER
// ==========================================================================

class EventArenaController {
    constructor() {
        this.eventCount = 0;
        this.delegatedItemIndex = 3;
        this.cacheDom();
        this.bindEvents();
    }

    cacheDom() {
        // Station 1: Mouse
        this.mousePad = document.getElementById('mousePad');
        this.mouseCoords = document.getElementById('mouseCoords');
        this.mouseClickBtn = document.getElementById('mouseClickBtn');
        this.mouseDblClickBtn = document.getElementById('mouseDblClickBtn');

        // Station 2: Keyboard
        this.keyboardInput = document.getElementById('keyboardInput');
        this.keyVal = document.getElementById('keyVal');
        this.codeVal = document.getElementById('codeVal');
        this.keyCodeVal = document.getElementById('keyCodeVal');
        this.modVal = document.getElementById('modVal');

        // Station 3: Propagation
        this.stopPropagationToggle = document.getElementById('stopPropagationToggle');
        this.capturePhaseToggle = document.getElementById('capturePhaseToggle');
        this.boxGrandparent = document.getElementById('boxGrandparent');
        this.boxParent = document.getElementById('boxParent');
        this.boxChild = document.getElementById('boxChild');

        // Station 4: Delegation
        this.delegationInput = document.getElementById('delegationInput');
        this.addDelegatedItemBtn = document.getElementById('addDelegatedItemBtn');
        this.delegatedList = document.getElementById('delegatedList');

        // Logger
        this.eventLogContainer = document.getElementById('eventLogContainer');
        this.eventCountBadge = document.getElementById('eventCountBadge');
        this.clearEventLogBtn = document.getElementById('clearEventLogBtn');
    }

    bindEvents() {
        // --- 1. Mouse Events ---
        this.mousePad.addEventListener('mousemove', (e) => {
            const rect = this.mousePad.getBoundingClientRect();
            const x = Math.round(e.clientX - rect.left);
            const y = Math.round(e.clientY - rect.top);
            this.mouseCoords.textContent = `X: ${x}px | Y: ${y}px`;
        });

        this.mousePad.addEventListener('click', (e) => {
            this.logEvent('mouse', `mousePad click at (${e.clientX}, ${e.clientY})`);
        });

        this.mouseClickBtn.addEventListener('click', (e) => {
            this.logEvent('mouse', `Single Click fired on #${e.target.id}`);
            Toast.show('Single Click Event registered!', 'info');
        });

        this.mouseDblClickBtn.addEventListener('dblclick', (e) => {
            this.logEvent('mouse', `Double Click fired on #${e.target.id}`);
            Toast.show('Double Click Event registered! ⚡', 'success');
        });

        // --- 2. Keyboard Events ---
        this.keyboardInput.addEventListener('keydown', (e) => {
            this.keyVal.textContent = e.key === ' ' ? 'Space' : e.key;
            this.codeVal.textContent = e.code;
            this.keyCodeVal.textContent = e.keyCode || e.which;

            const modifiers = [];
            if (e.shiftKey) modifiers.push('Shift');
            if (e.ctrlKey) modifiers.push('Ctrl');
            if (e.altKey) modifiers.push('Alt');
            if (e.metaKey) modifiers.push('Meta/Cmd');

            this.modVal.textContent = modifiers.length > 0 ? modifiers.join(' + ') : 'None';

            this.logEvent('keyboard', `keydown: key="${e.key}", code="${e.code}"`);
        });

        // --- 3. Propagation (Bubbling & Capturing) ---
        const handleBoxClick = (tierName, element, e) => {
            // Flash visual border effect
            element.classList.add('highlight-flash');
            setTimeout(() => element.classList.remove('highlight-flash'), 600);

            const isCapture = this.capturePhaseToggle.checked;
            const phase = isCapture ? 'Capturing' : 'Bubbling';

            this.logEvent(
                'propagation',
                `[${phase}] Fired on ${tierName} (target: <${e.target.tagName.toLowerCase()} id="${e.target.id}">)`
            );

            // Check if stopPropagation is active
            if (this.stopPropagationToggle.checked) {
                e.stopPropagation();
                this.logEvent('propagation', `⛔ e.stopPropagation() invoked at ${tierName}!`);
            }
        };

        // Attach listeners with dynamic capture/bubbling re-binding
        const setupPropagationListeners = () => {
            const useCapture = this.capturePhaseToggle.checked;

            // Remove old listeners by cloning
            const newGp = this.boxGrandparent.cloneNode(true);
            this.boxGrandparent.parentNode.replaceChild(newGp, this.boxGrandparent);

            // Re-cache elements
            this.boxGrandparent = document.getElementById('boxGrandparent');
            this.boxParent = document.getElementById('boxParent');
            this.boxChild = document.getElementById('boxChild');

            this.boxGrandparent.addEventListener('click', (e) => handleBoxClick('Grandparent', this.boxGrandparent, e), useCapture);
            this.boxParent.addEventListener('click', (e) => handleBoxClick('Parent', this.boxParent, e), useCapture);
            this.boxChild.addEventListener('click', (e) => handleBoxClick('Child', this.boxChild, e), useCapture);
        };

        setupPropagationListeners();
        this.capturePhaseToggle.addEventListener('change', () => {
            setupPropagationListeners();
            Toast.show(`Switched to ${this.capturePhaseToggle.checked ? 'Capture' : 'Bubbling'} phase.`, 'info');
        });

        // --- 4. Event Delegation ---
        this.addDelegatedItemBtn.addEventListener('click', () => {
            this.delegatedItemIndex++;
            const text = this.delegationInput.value.trim() || `Delegated Item #${this.delegatedItemIndex}`;

            const li = document.createElement('li');
            li.dataset.id = this.delegatedItemIndex;
            li.innerHTML = `<span>${text}</span> <button class="btn-item-action" data-action="delete">✕</button>`;

            this.delegatedList.appendChild(li);
            this.logEvent('delegation', `Dynamically added <li data-id="${this.delegatedItemIndex}">`);
        });

        // Event Delegation on parent <ul>
        this.delegatedList.addEventListener('click', (e) => {
            // Check if delete button was clicked
            if (e.target.dataset.action === 'delete') {
                const li = e.target.closest('li');
                const id = li ? li.dataset.id : 'unknown';
                this.logEvent('delegation', `Event Delegation caught delete click for item ID: ${id}`);
                if (li) li.remove();
                Toast.show(`Removed delegated item #${id}`, 'info');
            } else {
                const li = e.target.closest('li');
                if (li) {
                    this.logEvent('delegation', `Delegation caught click on row: "${li.firstElementChild.textContent}"`);
                }
            }
        });

        // Clear Logger
        this.clearEventLogBtn.addEventListener('click', () => {
            this.eventLogContainer.innerHTML = '<div class="log-entry log-system">// Event Stream cleared.</div>';
            this.eventCount = 0;
            this.eventCountBadge.textContent = '0 events captured';
        });
    }

    logEvent(category, message) {
        this.eventCount++;
        this.eventCountBadge.textContent = `${this.eventCount} event${this.eventCount === 1 ? '' : 's'} captured`;

        const time = new Date().toLocaleTimeString().split(' ')[0];
        const entry = document.createElement('div');
        entry.className = `log-entry log-${category}`;
        entry.textContent = `[${time}] [${category.toUpperCase()}] ${message}`;

        this.eventLogContainer.prepend(entry);

        // Keep maximum 60 items in DOM to prevent memory leak
        if (this.eventLogContainer.children.length > 60) {
            this.eventLogContainer.lastElementChild.remove();
        }
    }
}

// ==========================================================================
// 7. THEME & TAB CONTROLLER
// ==========================================================================

class AppNavigationController {
    constructor() {
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.themeIcon = document.getElementById('themeIcon');
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');

        this.initTheme();
        this.initTabs();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('webLab_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        this.themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('webLab_theme', next);
            this.updateThemeIcon(next);
            Toast.show(`Theme switched to ${next} mode.`, 'info');
        });
    }

    updateThemeIcon(theme) {
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    initTabs() {
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;

                // Update tab buttons
                this.tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update panes
                this.tabPanes.forEach(pane => {
                    if (pane.id === `pane-${targetTab}`) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });

                // Scroll to top of pane smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
}

// ==========================================================================
// 8. INITIALIZATION ON DOM CONTENT LOADED
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Instantiate all system modules
    new AppNavigationController();
    new CapstoneController();
    new Es6SandboxController();
    new DomStudioController();
    new EventArenaController();

    console.log('%c Experiment 07 & 08 Initialized Successfully!', 'color: #10b981; font-weight: bold; font-size: 14px;');
});
