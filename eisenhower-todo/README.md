# Eisenhower Todo Matrix

- **Name:** Prince Kandari
- **SAP ID:** 590014595

This is a web application built for the Backend Development Lab Examination using Node.js, Express, EJS, and MongoDB. 
It implements the Eisenhower Matrix to categorize tasks based on urgency and importance.

## Features Completed
1. **Display Tasks (Eisenhower Matrix):** Home page categorizes tasks into 4 quadrants (Do, Schedule, Delegate, Eliminate) based on combinations of `isUrgent` and `isImportant` flags.
2. **Add a Task:** An HTML form `/tasks/new` allows users to create tasks with validation for the title.
3. **Delete a Task:** Each task entry has a Delete button.
4. **Server-Side Templates:** Uses EJS for rendering HTML.
5. **Bonus Requirement Completed:** Improved the Eisenhower Matrix layout using **CSS Grid** to evenly format the 4 quadrants on the screen.

## Prerequisites
- Node.js
- MongoDB running locally at `mongodb://127.0.0.1:27017`

## Setup & Execution Instructions

1. **Install Dependencies**
   Navigate to the project root directory and run:
   ```bash
   npm install
   ```

2. **Start the Application**
   Run the following command to start the Express server:
   ```bash
   node server.js
   ```

3. **Access the App**
   Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

## Tech Stack (Option A)
- Backend: Node.js with Express.js
- Template Engine: EJS
- Database: MongoDB via `mongodb` native driver

