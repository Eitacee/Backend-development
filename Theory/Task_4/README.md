# Theory Task 4 - Session Management in Express.js

## Aim
To implement and understand session management in a Node.js web application using the Express framework and `express-session` middleware.

## Student Information
- **Name:** Akshat Mamgain
- **SAP ID:** 590014875

## Technologies Used
- Node.js
- Express.js
- `express-session`

## Files
- `index.js` — Demonstrates initializing session middleware, logging in to set session data, retrieving session data, and destroying sessions.
- `package.json` — Project dependencies and startup scripts.

## What is Implemented
1. **Middleware Initialization**: Configures `express-session` with secret key, `resave: false`, `saveUninitialized: true`, and cookie expiration of 1 minute (`maxAge: 60000`).
2. **GET `/login`**: Sets `req.session.username` to `AkshatMamgain` (or accepts `?user=Name`).
3. **GET `/profile`**: Verifies if `req.session.username` exists; displays personalized greeting if logged in, or prompts user to log in first.
4. **GET `/logout`**: Destroys the active session using `req.session.destroy()`.

## How to Run

1. Navigate to the task directory:
   ```bash
   cd Theory/Task_4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   Or for development mode:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - `http://localhost:3000/` (Home)
   - `http://localhost:3000/login` (Create session)
   - `http://localhost:3000/profile` (Access session data)
   - `http://localhost:3000/logout` (Destroy session)

## Learning Outcome
Understood how server-side sessions operate in Express.js, how session IDs are stored in client cookies and mapped to server session stores, and how to manage user state across HTTP requests.
