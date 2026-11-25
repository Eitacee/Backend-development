const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);
let tasksCollection;

async function connectDB() {
    try {
        await client.connect();
        const database = client.db("todo_lab");
        tasksCollection = database.collection("tasks");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}
connectDB();


app.get(["/", "/tasks"], async (req, res) => {
    try {
        const tasks = await tasksCollection.find().toArray();
        res.render("index", { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching tasks");
    }
});


app.get("/tasks/new", (req, res) => {
    res.render("new");
});


app.post("/tasks", async (req, res) => {
    const { title, description, isUrgent, isImportant } = req.body;
    
    // Validation
    if (!title || title.trim() === "") {
        return res.status(400).send("Title is required");
    }

    try {
        await tasksCollection.insertOne({
            title: title.trim(),
            description: description ? description.trim() : "",
            isUrgent: !!isUrgent, 
            isImportant: !!isImportant,
            createdAt: new Date()
        });
        res.redirect("/tasks");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding task");
    }
});


app.post("/tasks/:id/delete", async (req, res) => {
    try {
        await tasksCollection.deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.redirect("/tasks");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting task");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

