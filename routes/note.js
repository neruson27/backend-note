import express from "express";
import NoteController from '../controllers/NoteController';

const note = express.Router();

// getAll
note.get('/', NoteController.getAllNotesByUser);
// create
note.post('/', NoteController.createOneNote);
// update
note.put('/:id', NoteController.updateOneNote);
// deleted
note.delete('/:id', NoteController.deleteOneNote);

export default note;