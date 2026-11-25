Experiment 12(B) - Cookies and Sessions in Express.js
Aim

To implement and understand Cookies and Sessions in a Node.js application using the Express framework.

Technologies Used
Node.js
Express.js
cookie-parser
express-session

Files
cookie-example.js — Demonstrates setting, getting, and deleting cookies.
session-example.js — Demonstrates creating and destroying sessions.
package.json — Project dependencies.

What is Implemented
1. Cookies (cookie-example.js)
GET /set-cookie → Sets a cookie named username with value JohnDoe (expires in 15 minutes).
GET /get-cookie → Retrieves and displays the cookie value.
GET /delete-cookie → Deletes the username cookie.

2. Sessions (session-example.js)
GET / → Starts a session and counts the number of times the page is visited/refreshed.
GET /destroy → Destroys the current session.

How to Run

Install dependencies:

bash
   npm install

Run the cookie example:
bash
   node cookie-example.js

Visit http://localhost:3000/set-cookie, then /get-cookie, then /delete-cookie.

Run the session example:
bash
   node session-example.js

Visit http://localhost:3000/ (refresh a few times to see the visit counter), then /destroy.

Learning Outcome

Understood the difference between cookies (stored on client-side) and sessions (stored on server-side, tracked via a session ID), and how Express handles both using middleware.