import express from "express";
import NoteController from '../controllers/NoteController';

const note = express.Router();

// getAll notes of the user
note.get('/', NoteController.getNotesByUser);
// create note
note.post('/', NoteController.createNote);
// update note
note.put('/:id', NoteController.updateNote);
// deleted note
note.delete('/:id', NoteController.deleteNote);

export default note;