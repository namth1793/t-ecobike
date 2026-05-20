const express = require('express');
const router = express.Router();
const { getDB } = require('../data/seed');

router.get('/', (req, res) => {
  const db = getDB();
  const scooters = db.prepare('SELECT * FROM scooters').all();
  scooters.forEach(s => {
    if (s.features) s.features = JSON.parse(s.features);
  });
  res.json(scooters);
});

router.get('/:id', (req, res) => {
  const db = getDB();
  const scooter = db.prepare('SELECT * FROM scooters WHERE id = ?').get(req.params.id);
  if (!scooter) return res.status(404).json({ error: 'Not found' });
  if (scooter.features) scooter.features = JSON.parse(scooter.features);
  res.json(scooter);
});

module.exports = router;
