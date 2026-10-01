const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// ─── MongoDB Setup ────────────────────────────────────────────────────────────
const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);
let notesCollection;

async function connectDB() {
  await client.connect();
  const database = client.db("notes_lab");
  notesCollection = database.collection("notes");
  console.log("✅  Connected to MongoDB  →  notes_lab.notes");
}

connectDB().catch((err) => {
  console.error("❌  MongoDB connection failed:", err.message);
  process.exit(1);
});

// ─── Express Setup ────────────────────────────────────────────────────────────
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /  →  display all notes
app.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};
    if (search && search.trim()) {
      filter.title = { $regex: search.trim(), $options: "i" };
    }
    if (category && category.trim()) {
      filter.category = category.trim();
    }

    const notes = await notesCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    // Fetch distinct categories for the filter dropdown
    const categories = await notesCollection.distinct("category");

    res.render("index", {
      notes,
      categories,
      search: search || "",
      selectedCategory: category || "",
      error: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching notes.");
  }
});

// GET /notes/new  →  show add-note form
app.get("/notes/new", (req, res) => {
  res.render("new", { error: null });
});

// POST /notes  →  insert a new note
app.post("/notes", async (req, res) => {
  const { title, content, category } = req.body;

  // Validation
  if (!title || !title.trim()) {
    return res.render("new", { error: "Title is required." });
  }
  if (!content || !content.trim()) {
    return res.render("new", { error: "Content is required." });
  }

  try {
    await notesCollection.insertOne({
      title: title.trim(),
      content: content.trim(),
      category: (category || "General").trim(),
      createdAt: new Date(),
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while inserting note.");
  }
});

// GET /notes/:id/edit  →  show edit form (Bonus)
app.get("/notes/:id/edit", async (req, res) => {
  try {
    const note = await notesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!note) return res.status(404).send("Note not found.");
    res.render("edit", { note, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

// POST /notes/:id/edit  →  update a note (Bonus)
app.post("/notes/:id/edit", async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !title.trim()) {
    const note = await notesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    return res.render("edit", { note, error: "Title is required." });
  }
  if (!content || !content.trim()) {
    const note = await notesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    return res.render("edit", { note, error: "Content is required." });
  }

  try {
    await notesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title: title.trim(),
          content: content.trim(),
          category: (category || "General").trim(),
        },
      }
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while updating note.");
  }
});

// POST /notes/:id/delete  →  remove a note
app.post("/notes/:id/delete", async (req, res) => {
  try {
    await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while deleting note.");
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  My Notes running at  http://localhost:${PORT}`);
});
