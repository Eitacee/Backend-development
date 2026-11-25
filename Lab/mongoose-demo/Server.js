require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// STEP 1: CONNECT TO MONGODB
// ============================================

// Use MONGODB_URI environment variable or fallback to local MongoDB instance
const DB_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userManagement';

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// ============================================
// STEP 2: DEFINE THE USER SCHEMA
// ============================================

// Schema defines the structure of documents in the collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,        // Field must be text
    required: true,      // Field is mandatory
    unique: true         // No two users can have the same username
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now    // Automatically set to current date/time
  }
});

// ============================================
// STEP 3: CREATE THE MODEL
// ============================================

// Model is the interface to interact with the database
const User = mongoose.model('User', userSchema);

// ============================================
// STEP 4: CREATE ROUTES
// ============================================

// HOME ROUTE - Interactive UI
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>User Management System - Mongoose Demo</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #f9f9f9; }
        .container { background: #ffffff; padding: 25px; margin: 20px 0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        h1, h2 { color: #2c3e50; }
        input { width: 100%; padding: 10px; margin: 8px 0; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-top: 5px; }
        button:hover { background: #0056b3; }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>User Management System (Mongoose Demo)</h1>
      <p>Demonstrating MongoDB Connection, Schema Definition, Validation, and CRUD Operations.</p>
      
      <div class="container">
        <h2>Register New User</h2>
        <form action="/signup" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="container">
        <h2>Login</h2>
        <form action="/login" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>

      <div class="container">
        <h2>View All Users</h2>
        <form action="/users" method="GET">
          <button type="submit">Show All Registered Users</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// SIGNUP ROUTE - Register a new user
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #28a745;">User registered successfully!</h2>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><a href="/">Go back to Home</a></p>
      </div>
    `);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #dc3545;">Error: Username or Email already exists</h2>
          <p><a href="/">Go back and try again</a></p>
        </div>
      `);
    } else {
      res.status(400).send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #dc3545;">Error: ${error.message}</h2>
          <p><a href="/">Go back and try again</a></p>
        </div>
      `);
    }
  }
});

// LOGIN ROUTE - Check user credentials
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #dc3545;">User not found</h2>
          <p><a href="/">Go back and try again</a></p>
        </div>
      `);
    }

    if (user.password !== password) {
      return res.status(401).send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #dc3545;">Incorrect password</h2>
          <p><a href="/">Go back and try again</a></p>
        </div>
      `);
    }

    res.send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #28a745;">Login successful!</h2>
        <p>Welcome back, <strong>${user.username}</strong>!</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Account created:</strong> ${user.createdAt.toDateString()}</p>
        <p><a href="/">Go back to Home</a></p>
      </div>
    `);
  } catch (error) {
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #dc3545;">Error: ${error.message}</h2>
        <p><a href="/">Go back and try again</a></p>
      </div>
    `);
  }
});

// GET ALL USERS ROUTE - Display all registered users
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');

    if (allUsers.length === 0) {
      return res.send(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2>No users registered yet</h2>
          <p><a href="/">Go back to Home</a></p>
        </div>
      `);
    }

    let userList = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2>Registered Users</h2>
        <ul style="line-height: 1.8;">
    `;

    allUsers.forEach(user => {
      userList += `
        <li>
          <strong>Username:</strong> ${user.username} | 
          <strong>Email:</strong> ${user.email} | 
          <strong>Joined:</strong> ${user.createdAt.toDateString()}
        </li>
      `;
    });

    userList += `
        </ul>
        <p><a href="/">Go back to Home</a></p>
      </div>
    `;

    res.send(userList);
  } catch (error) {
    res.status(500).send(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #dc3545;">Error: ${error.message}</h2>
        <p><a href="/">Go back and try again</a></p>
      </div>
    `);
  }
});

// START THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
