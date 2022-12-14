import express from "express";
import NoteController from '../controllers/NoteController';

const note = express.Router();

// getAll
note.get('/', NoteController.getNotesByUser);
// create
note.post('/', NoteController.createNote);
// update
note.put('/:id', NoteController.updateNote);
// deleted
note.delete('/:id', NoteController.deleteNote);

export default note;