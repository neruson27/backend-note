import Mongoose from 'mongoose';
import { Note } from '../models';
import { decodeJWT } from '../utils/jwt';

async function getAllNotesByUser(req, res) {
  const token = req.headers.authorization;
  const userId = decodeJWT(token).id;

  const notes = await Note.find({createdBy: userId});

  if(notes.length > 0) return res.status(200).send(notes);

  return res.status(404).send({message: 'NO CONTENT'});
}

async function updateOneNote(req, res) {
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
    const savedNote = await note.save();
    return res.status(200).send(savedNote);
  }

  return res.status(304);
}

async function createOneNote(req, res) {
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

async function deleteOneNote(req, res) {
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
  getAllNotesByUser,
  updateOneNote,
  createOneNote,
  deleteOneNote
}