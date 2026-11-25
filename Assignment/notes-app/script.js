// Get elements from HTML
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// Array to store our notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];


// Add a new note
addNoteBtn.addEventListener("click", function () {

    // Get the text entered by the user
    const text = noteInput.value.trim();

    // Don't add an empty note
    if (text === "") {
        alert("Please write something first.");
        return;
    }

    // Create a note object
    const note = {
        id: Date.now(),
        text: text,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
    };

    // Add the note to the array
    notes.push(note);

    // Save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Display the notes
    displayNotes();

    // Clear the textarea
    noteInput.value = "";
});

// Display all notes on the page
function displayNotes() {

    // Clear the container first
    notesContainer.innerHTML = "";

    // Display each note
    notes.forEach(function (note) {

        const noteElement = document.createElement("div");

        noteElement.className = "note";

        noteElement.innerHTML = `
            <div class="note-text">${note.text}</div>

            <div class="note-date">
                Created: ${note.createdAt}<br>
                Updated: ${note.updatedAt}
            </div>

            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${note.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteNote(${note.id})">
                    Delete
                </button>
            </div>
        `;

        notesContainer.appendChild(noteElement);
    });
}

displayNotes();

// Delete a note
function deleteNote(id) {

    // Remove the note with the matching ID
    notes = notes.filter(function (note) {
        return note.id !== id;
    });

    // Save the updated array to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Display the updated notes
    displayNotes();
}

// Edit a note
function editNote(id) {

    // Find the note with the matching ID
    const note = notes.find(function (note) {
        return note.id === id;
    });

    // If note doesn't exist, stop
    if (!note) {
        return;
    }

    // Ask the user for the new text
    const newText = prompt("Edit your note:", note.text);

    // If user cancels, stop
    if (newText === null) {
        return;
    }

    // Remove extra spaces
    const updatedText = newText.trim();

    // Don't allow an empty note
    if (updatedText === "") {
        alert("Note cannot be empty.");
        return;
    }

    // Update the note
    note.text = updatedText;
    note.updatedAt = new Date().toLocaleString();

    // Save updated notes
    localStorage.setItem("notes", JSON.stringify(notes));

    // Display updated notes
    displayNotes();
}