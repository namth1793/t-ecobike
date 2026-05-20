const express = require('express');
const router = express.Router();
const { getDB } = require('../data/seed');

router.post('/', (req, res) => {
  const { full_name, email, phone, subject, message } = req.body;
  if (!full_name || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = getDB();
  const result = db.prepare(`
    INSERT INTO contacts (full_name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `).run(full_name, email, phone, subject, message);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Message sent successfully' });
});

router.get('/', (req, res) => {
  const db = getDB();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

module.exports = router;
