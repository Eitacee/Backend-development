const express = require('express');
const session = require('express-session');
const app = express();

// Middleware to handle sessions
app.use(session({
    secret: 'secretSessionKey123', // Used to sign session ID cookies
    resave: false,                // Do not save session if unmodified
    saveUninitialized: true,      // Save new uninitialized sessions
    cookie: { maxAge: 60000 }     // Cookie expiry: 1 minute (60000 ms)
}));

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h2>Theory Task 4 - Session Management Demo</h2>
        <p>Current Status: ${req.session.username ? `Logged in as <strong>${req.session.username}</strong>` : 'Not logged in'}</p>
        <ul>
            <li><a href="/login">Login (/login)</a></li>
            <li><a href="/profile">Profile (/profile)</a></li>
            <li><a href="/logout">Logout (/logout)</a></li>
        </ul>
    `);
});

// Set session variable (Login)
app.get('/login', (req, res) => {
    const user = req.query.user || 'AkshatMamgain';
    req.session.username = user;
    res.send(`Session started for ${req.session.username}. <a href="/profile">View Profile</a> | <a href="/logout">Logout</a>`);
});

// Access session data (Profile)
app.get('/profile', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome ${req.session.username}! <br><a href="/logout">Logout</a> | <a href="/">Home</a>`);
    } else {
        res.send('Please log in first. <a href="/login">Login here</a>');
    }
});

// Destroy session (Logout)
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error destroying session');
        }
        res.send('Session destroyed successfully. <a href="/">Return to Home</a>');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
