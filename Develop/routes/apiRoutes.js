const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const dbPath = path.join(__dirname, '../db/db.json');

// Read notes from db.json
const getNotes = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Write notes to db.json
const saveNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
};

// GET /api/notes
router.get('/notes', (req, res) => {
  res.json(getNotes());
});

// POST /api/notes
router.post('/notes', (req, res) => {
  const notes = getNotes();
  const newNote = { id: uuidv4(), ...req.body };
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
  const notes = getNotes();
  const updatedNotes = notes.filter(note => note.id !== req.params.id);
  saveNotes(updatedNotes);
  res.json({ ok: true });
});

module.exports = router;
