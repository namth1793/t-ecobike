const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./data/seed');

const app = express();
const PORT = process.env.PORT || 5028;

app.use(cors({ origin: '*' }));
app.use(express.json());

initDB();

app.use('/api/scooters', require('./routes/scooters'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/posts', require('./routes/posts'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
