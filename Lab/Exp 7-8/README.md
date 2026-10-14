# Experiment 07 & 08: ES6, DOM Manipulation, and Event Handling

## 1. Objective
To understand and apply **ES6 (ECMAScript 2015)** features in JavaScript, learn **DOM (Document Object Model)** manipulation, and implement **event handling** to build interactive web pages.  
By the end of this experiment, you will be able to write modern JavaScript, dynamically modify HTML/CSS through the DOM, and respond to user interactions using event listeners.

---

## 2. Hardware and Software Requirements
| Category | Requirement / Specification |
|---|---|
| **System Processor** | Intel Core i3 / AMD Ryzen 3 or higher |
| **Memory (RAM)** | 4 GB minimum (8 GB recommended) |
| **Operating System** | Windows 10/11, macOS, or Linux |
| **Web Browser** | Google Chrome 90+, Mozilla Firefox 88+, or MS Edge (Chromium) |
| **Code Editor** | Visual Studio Code / Antigravity IDE |
| **JavaScript Engine** | V8 Engine (Chromium / Node.js runtime) |

---

## 3. Theoretical Background

### Part A: ES6 (ECMAScript 2015+) Core Features
1. **`let` and `const` (Block Scoping):**
   - Traditional `var` has function scope and is hoisted with `undefined`.
   - `let` and `const` are block-scoped (`{ ... }`), preventing variable leakage outside blocks and eliminating accidental re-declarations.
   - Variables declared with `let` and `const` are in a *Temporal Dead Zone (TDZ)* prior to declaration.

2. **Arrow Functions (`() => {}`):**
   - Shorter syntax for function expressions.
   - Implicit return for single-expression functions: `const double = x => x * 2;`.
   - **Lexical `this`:** Arrow functions do not bind their own `this`; they inherit `this` from the parent execution context, avoiding tedious `.bind(this)` or `const self = this;`.

3. **Template Literals (\`...\`):**
   - Multi-line strings without newline escape characters (`\n`).
   - Expression interpolation using `${expression}` syntax.

4. **Destructuring Assignment:**
   - Unpacking properties from objects: `const { title, category } = task;`
   - Unpacking elements from arrays: `const [first, second] = list;`
   - Default fallbacks and renaming: `const { id: taskId, status = 'pending' } = item;`

5. **Spread & Rest Operators (`...`):**
   - **Rest:** Bundles multiple function arguments into an array: `const sum = (...nums) => nums.reduce((a, b) => a + b, 0);`
   - **Spread:** Expands arrays or objects for immutable cloning and merging: `const updatedTasks = [newTask, ...tasks];`

6. **Modern Array Transformation Methods:**
   - `map()`: Transforms each element and returns a new array of identical length.
   - `filter()`: Returns a new array with elements satisfying a boolean condition.
   - `reduce()`: Accumulates array elements into a single aggregate value or object.
   - `find()` & `findIndex()`: Returns the first matching element or its index.

7. **ES6 Classes & Object-Oriented Programming:**
   - Formal syntax for classes, constructors, methods, and inheritance via `class Child extends Parent { constructor() { super(); } }`.

8. **Promises & Async/Await:**
   - Asynchronous programming without callback nesting ("callback hell").

---

### Part B: Document Object Model (DOM) Manipulation
The DOM represents an HTML document as a tree hierarchy of nodes. JavaScript manipulates this tree via browser APIs:
1. **Selection:**
   - `document.getElementById('id')`: Fastest lookup for unique IDs.
   - `document.querySelector('cssSelector')`: Selects the first matching element.
   - `document.querySelectorAll('cssSelector')`: Returns a static NodeList of all matching elements.
2. **Content Modification:**
   - `element.textContent`: Reads/writes plain text safely without parsing HTML or triggering expensive reflows.
   - `element.innerHTML`: Parses and injects HTML markup (requires caution regarding XSS).
3. **Class & Style Manipulation:**
   - `element.classList.add()`, `.remove()`, `.toggle()`, `.contains()`.
   - `element.style.propertyName`: Directly mutates inline styles.
4. **Node Creation & Tree Injection:**
   - `document.createElement('tagName')`: Creates an element in memory.
   - `parent.appendChild(node)` or `parent.append(...nodes)`: Adds nodes at the end.
   - `parent.prepend(node)`: Inserts nodes at the beginning.
   - `node.remove()`: Removes an element from the DOM.
5. **Attribute Management:**
   - `setAttribute(name, value)`, `getAttribute(name)`, and `dataset` properties for `data-*` attributes.

---

### Part C: Browser Event Handling & Architecture
Events represent actions triggered by the user or browser environment:
1. **Event Listeners:**
   - Registered via `element.addEventListener(eventType, handlerFunction, options)`.
   - Allows multiple independent listeners on the same element.
2. **The Event Object (`event` / `e`):**
   - `e.target`: The exact element that triggered the event.
   - `e.currentTarget`: The element handling the event listener.
   - `e.preventDefault()`: Prevents the browser's default behavior (e.g., form reload).
   - `e.stopPropagation()`: Halts propagation through parent/child nodes.
3. **Event Propagation Phases:**
   - **Capturing Phase (Trickling):** Event travels down from `window` to the target.
   - **Target Phase:** Event reaches the target element.
   - **Bubbling Phase (Default):** Event bubbles upwards from target back to `window`.
4. **Event Delegation Pattern:**
   - Instead of attaching listeners to hundreds of child elements, attach a single listener to their parent container.
   - As events bubble up, inspect `e.target` to determine which child triggered the action.
   - Benefits: Drastically reduced memory usage and automatic handling of dynamic nodes.

---

## 4. Project Structure
```
Lab/Exp 7-8/
├── index.html       # Semantic HTML5 layout containing 5 interactive modules
├── style.css        # Responsive CSS3 styling with Glassmorphism & dark/light theme
├── app.js           # ES6 OOP architecture, DOM mutation studio & event handlers
└── README.md        # Comprehensive academic lab documentation & viva guide
```

---

## 5. Implementation Modules

### Module 1: Capstone Application — TaskFlow Pro Dashboard
- **ES6 Class Structure:** Implements `TaskItem` and `TaskManager` classes with constructor defaults, getters, and local storage persistence.
- **Dynamic DOM Rendering:** Renders task cards with priority badges, dates, and interactive controls via ES6 template literals.
- **High-Performance Event Delegation:** A single click listener on `#taskList` handles task toggling, deleting, and status changes.
- **Real-Time Input Filtering:** Listens to `input` events for live search and filter updates.
- **Metrics Calculation:** Uses `.reduce()` and object destructuring to update completion rates and progress bars.

### Module 2: ES6 Syntax Sandbox
Interactive live-execution stations demonstrating:
1. `let` & `const` block scoping vs `var`.
2. Arrow functions with lexical `this`.
3. Template literals with embedded ternary operators.
4. Object and Array destructuring with default fallbacks.
5. Rest and Spread operators.
6. Modern array iteration methods (`map`, `filter`, `reduce`, `find`).
7. ES6 Class inheritance (`class WebDevExperiment extends LabAssignment`).
8. Asynchronous Promise resolution with `async/await`.

### Module 3: DOM Manipulation Studio
Live interactive controls to:
- Mutate `textContent` safely vs injecting markup via `innerHTML`.
- Toggle classes dynamically (`neon-glow`, `glass-morphism`, `pill-shape`).
- Dynamically create, append, prepend, and remove DOM elements.
- Inspect live DOM node attributes and view real-time outer HTML updates.

### Module 4: Event Handling Arena
Interactive testing stations:
1. **Mouse Events:** Real-time coordinate tracking (`e.clientX`, `e.clientY`), click, and double-click detection.
2. **Keyboard Events:** Live keycode and modifier key telemetry (`e.key`, `e.code`, Shift, Ctrl, Alt).
3. **Event Propagation:** Visual 3-tier hierarchy (Grandparent → Parent → Child) testing bubbling vs capturing and `e.stopPropagation()`.
4. **Event Delegation:** Dynamically spawned items managed by a single parent `<ul>` listener.
5. **Real-time Event Logger:** Visual live console displaying captured events with timestamps.

### Module 5: Lab Report & Viva Voce Guide
Embedded study guide with collapsible viva questions for academic review.

---

## 6. How to Run the Experiment
1. Clone or navigate to the repository directory:
   ```bash
   cd "Lab/Exp 7-8"
   ```
2. Open `index.html` in any modern web browser:
   - Double click `index.html`, OR
   - Run a local static server:
     ```bash
     npx serve .
     ```
     or
     ```bash
     python -m http.server 3000
     ```
3. Open `http://localhost:3000` (or the file URL) to interact with all 5 lab modules.

---

## 7. Viva Voce Questions & Answers

### Q1: What is the main difference between `var`, `let`, and `const`?
- **Scope:** `var` is function-scoped; `let` and `const` are block-scoped (`{ ... }`).
- **Hoisting:** `var` is hoisted and initialized with `undefined`. `let` and `const` are hoisted into the Temporal Dead Zone (TDZ) and cannot be accessed before declaration.
- **Re-declaration:** `var` allows re-declaration within the same scope; `let` and `const` throw a SyntaxError.
- **Reassignment:** `var` and `let` can be reassigned; `const` creates an immutable reference.

### Q2: What does lexical scoping of `this` in arrow functions mean?
Traditional functions bind `this` based on how they are called (invocation context). Arrow functions do not define their own `this`; they look up `this` lexically from their enclosing scope at definition time.

### Q3: Why is `textContent` preferred over `innerHTML` when inserting user data?
`textContent` treats input strictly as plain text, preventing malicious script injection (**Cross-Site Scripting / XSS**). `innerHTML` forces the browser parser to interpret HTML tags, creating vulnerabilities if user inputs are unescaped. Additionally, `textContent` avoids unnecessary DOM parsing overhead.

### Q4: Explain the difference between Event Bubbling and Event Capturing.
- **Capturing Phase:** The event travels from the top of the DOM hierarchy (`window`, `document`) downward to the target element.
- **Bubbling Phase:** The event travels upward from the target element back up to the root.
- In `addEventListener(type, listener, useCapture)`, setting `useCapture: true` executes the handler in the capturing phase; default (`false`) executes during bubbling.

### Q5: What is Event Delegation and what are its advantages?
Event Delegation is an architectural pattern that exploits event bubbling. Instead of attaching separate event handlers to multiple child elements, a single listener is placed on a common parent. When any child is clicked, the event bubbles to the parent, where `e.target` identifies the specific child.  
**Advantages:**
- Significant memory reduction.
- Automatic handling for dynamically added elements without re-binding listeners.

### Q6: What is the difference between `e.target` and `e.currentTarget`?
- `e.target`: The innermost DOM element where the event originated (the element that was clicked).
- `e.currentTarget`: The element to which the event listener is currently attached.

### Q7: What does `e.preventDefault()` do?
It prevents the default action that the browser would normally take in response to an event (such as preventing a form submission from refreshing the page or preventing an `<a>` tag from navigating to a URL).

### Q8: What does `e.stopPropagation()` do?
It stops the current event from traversing further up or down the DOM tree during the bubbling or capturing phases.

---

## 8. Conclusion
In this experiment, we successfully explored and applied:
1. **ES6 modern syntax**, including block scoping, arrow functions, template literals, destructuring, and spread/rest operators.
2. **DOM manipulation techniques**, selecting nodes, altering content and styles, creating dynamic elements, and updating the DOM tree.
3. **Browser event handling mechanisms**, including event listeners, propagation mechanics (bubbling and capturing), and event delegation.

The resulting capstone application (`TaskFlow Pro`) and sandbox modules demonstrate clean, modular, and performant web development adhering to current ECMAScript and W3C DOM specifications.
