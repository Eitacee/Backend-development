const express = require("express");
const app = express();

const students = [
  { id: 1, name: "Aarav", branch: "CSE" },
  { id: 2, name: "Diya", branch: "ECE" },
  { id: 3, name: "Rohan", branch: "IT" }
];

app.get("/", (req, res) => {
  res.send("Student Management API");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
