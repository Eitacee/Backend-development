# Mongoose Demo - User Management System

## Aim
To implement and understand MongoDB Object Data Modeling (ODM) in a Node.js/Express application using Mongoose, featuring schema definitions, document validation, error handling, and CRUD operations.

## Student Information
- **Name:** Akshat Mamgain
- **SAP ID:** 590014875

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv

## Files
- `Server.js` — Main application file containing MongoDB connection logic, Mongoose User Schema and Model, and Express routes.
- `package.json` — Project dependencies and run scripts.

## Schema Definition
The `User` schema defines:
- `username`: String, required, unique
- `email`: String, required, unique
- `password`: String, required
- `createdAt`: Date, default `Date.now`

## API Endpoints & Routes
- `GET /` — Renders an interactive web interface with signup, login, and user listing forms.
- `POST /signup` — Validates and creates a new user document in MongoDB.
- `POST /login` — Validates credentials against existing MongoDB user records.
- `GET /users` — Retrieves and displays all registered users (passwords excluded).

## How to Run

1. Navigate to the directory:
   ```bash
   cd lab/mongoose-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection:
   Create a `.env` file or export `MONGODB_URI`:
   ```bash
   # Optional: Defaults to local mongodb://127.0.0.1:27017/userManagement
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit `http://localhost:3000/` in your browser.

## Learning Outcome
Gained practical understanding of connecting Node.js applications to MongoDB via Mongoose, defining strongly-typed schemas with built-in validation, handling duplicate key errors, and executing asynchronous database queries with `async/await`.
