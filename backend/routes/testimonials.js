const express = require('express');
const router = express.Router();
const { getDB } = require('../data/seed');

router.get('/', (req, res) => {
  const db = getDB();
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
  res.json(testimonials);
});

router.post('/', (req, res) => {
  const { author, country, rating, content, avatar } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = getDB();
  const result = db.prepare(`
    INSERT INTO testimonials (author, country, rating, content, avatar)
    VALUES (?, ?, ?, ?, ?)
  `).run(author, country, rating || 5, content, avatar);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Testimonial added' });
});

module.exports = router;
