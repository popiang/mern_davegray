const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean();

    if (!notes?.length) {
        return res.status(400).json({ message: "No note found" });
    }
	console.log(notes);
    res.json(notes);
});

const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text, completed } = req.body;

    if (!user || !title || !text || !completed) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const noteObject = { user, title, text, completed };

    const note = await Note.create(noteObject);

    if (note) {
        res.status(201).json({ message: "New note created" });
    } else {
        res.status(400).json({ message: "Invalid note data received" });
    }
});

const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    if (!id || !user || !title || !text || !completed) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();

    res.status(200).json({ message: "Note updated" });
});

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Note ID is required" });
    }

    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: "Note not found" });
    }

    const result = await note.deleteOne();

    res.status(200).json({ message: "Note has been deleted" });
});

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
