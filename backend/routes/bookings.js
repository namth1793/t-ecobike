const express = require('express');
const router = express.Router();
const { getDB } = require('../data/seed');

router.post('/', (req, res) => {
  const { full_name, email, phone, scooter_id, scooter_name, start_date, end_date, days, total_price, hotel_address, note } = req.body;
  if (!full_name || !phone || !start_date || !end_date || !days || !total_price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = getDB();
  const result = db.prepare(`
    INSERT INTO bookings (full_name, email, phone, scooter_id, scooter_name, start_date, end_date, days, total_price, hotel_address, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(full_name, email, phone, scooter_id, scooter_name, start_date, end_date, days, total_price, hotel_address, note);
  res.status(201).json({ id: result.lastInsertRowid, message: 'Booking created successfully' });
});

router.get('/', (req, res) => {
  const db = getDB();
  const bookings = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
  res.json(bookings);
});

module.exports = router;
