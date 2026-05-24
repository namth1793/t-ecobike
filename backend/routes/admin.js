const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getDB } = require('../data/seed');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'tecobike2024';

// In-memory token store (resets on server restart — fine for simple admin)
const activeTokens = new Set();

// ── Auth middleware ──────────────────────────────────────────────
function auth(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.slice(7);
  if (!activeTokens.has(token)) return res.status(401).json({ error: 'Invalid token' });
  next();
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Wrong username or password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  activeTokens.add(token);
  res.json({ token });
});

// POST /api/admin/logout
router.post('/logout', auth, (req, res) => {
  const token = req.headers.authorization.slice(7);
  activeTokens.delete(token);
  res.json({ success: true });
});

// GET /api/admin/posts
router.get('/posts', auth, (req, res) => {
  const db = getDB();
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// POST /api/admin/posts — create
router.post('/posts', auth, (req, res) => {
  const db = getDB();
  const { title, slug, category, excerpt, content, image, author, author_avatar, read_time } = req.body;
  if (!title || !slug || !category || !excerpt || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = db.prepare(`
      INSERT INTO posts (title, slug, category, excerpt, content, image, author, author_avatar, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, category, excerpt, content, image || '', author || 'T-EcoBike Team', author_avatar || '', read_time || 5);
    res.json({ id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/admin/posts/:id — update
router.put('/posts/:id', auth, (req, res) => {
  const db = getDB();
  const { title, slug, category, excerpt, content, image, author, author_avatar, read_time } = req.body;
  try {
    db.prepare(`
      UPDATE posts SET title=?, slug=?, category=?, excerpt=?, content=?, image=?, author=?, author_avatar=?, read_time=? WHERE id=?
    `).run(title, slug, category, excerpt, content, image || '', author || 'T-EcoBike Team', author_avatar || '', read_time || 5, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/admin/posts/:id
router.delete('/posts/:id', auth, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM posts WHERE id=?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
