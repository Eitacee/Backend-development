const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Student Management API</h1><p>Welcome to the backend server.</p>");
});

app.get("/students", (req, res) => {
  const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
  ];

  let html = "<h2>All Students</h2><ul>";
  students.forEach(s => {
    html += `<li><strong>${s.name}</strong> — ${s.branch}</li>`;
  });
  html += "</ul>";
  res.send(html);
});

app.get("/students/:id", (req, res) => {
  const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
  ];

  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.send(`<h2>${student.name}</h2><p>Branch: ${student.branch}</p>`);
  } else {
    res.status(404).send("<h2>Student not found</h2>");
  }
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
