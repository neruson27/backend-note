import Mongoose from 'mongoose';
import { Note } from '../models';
import { decodeJWT } from '../utils/jwt';

/**
 * Controller of Note API
 */

/**
 * Get all notes by user
 * GET /note
 * 
 * @returns status 200 with array of notes or status 400
 */
async function getNotesByUser(req, res) {
  const token = req.headers.authorization;
  const userId = decodeJWT(token).id;

  const notes = await Note.find({createdBy: userId});

  if(notes.length > 0) return res.status(200).send(notes);

  return res.status(404).send({message: 'NO CONTENT'});
}

/**
 * Update a note
 * PUT /note/:id
 * 
 * @param id can be obtain from the req param or body
 * @param title string not required
 * @param body string not required
 * @returns status 200 with the updated note object or status 304
 */
async function updateNote(req, res) {
  const { id } = req.params || req.body
  const { title, body } = req.body
  const token = req.headers.authorization;
  const userId = decodeJWT(token).id;

  let save = false;

  const note = await Note.findById(id);
  if (!note) res.status(404).send({message: 'NO CONTENT'});

  if (note.createdBy !== userId) res.status(403).send({message: 'YOU CAN\'T EDIT THIS NOTE'});

  if (title && note.title !== title) {
    note.title = title ?? note.title;
    save = true;
  }

  if (body && note.body !== body) {
    note.body = body ?? note.body;
    save = true;
  }

  if (save) {
    note.updateAt = new Date();
    const savedNote = await note.save();
    return res.status(200).send(savedNote);
  }

  return res.status(304);
}

/**
 * Create a note
 * POST /note
 * 
 * @param title required
 * @param body required
 * @returns status 200 with the note object or status 500
 */
async function createNote(req, res) {
  const { title, body } = req.body
  const token = req.headers.authorization;
  const userId = decodeJWT(token).id;

  const note = await Note.create({
    title,
    body,
    createdBy: userId,
    createAt: new Date()
  });

  if (note) {
    return res.status(200).send(note);
  }

  return res.status(500);
}

/**
 * Delete a note
 * DEL /note/:id
 * 
 * @param id can be obtain from the req param
 * @returns status 200 if all okey, status 400 if id is undefined or status 500 if mongo has an error
 */
async function deleteNote(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({message: 'NO ID'});
  }

  try {
    await Note.deleteOne({_id: Mongoose.Types.ObjectId(id)})
  } catch(err) {
    return res.status(500).send({err: String(err), message: 'ERROR DELETING Note'});
  }
  
  return res.status(200).send('ok');
}

export default {
  getNotesByUser,
  updateNote,
  createNote,
  deleteNote
}