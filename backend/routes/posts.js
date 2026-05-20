const express = require('express');
const router = express.Router();
const { getDB } = require('../data/seed');

// GET /api/posts — list all posts (no content body for performance)
router.get('/', (req, res) => {
  const db = getDB();
  const { category } = req.query;
  let query = `SELECT id, title, slug, category, excerpt, image, author, author_avatar, read_time, created_at FROM posts`;
  const params = [];
  if (category && category !== 'All') {
    query += ` WHERE category = ?`;
    params.push(category);
  }
  query += ` ORDER BY created_at DESC`;
  const posts = db.prepare(query).all(...params);
  res.json(posts);
});

// GET /api/posts/:slug — single post with full content
router.get('/:slug', (req, res) => {
  const db = getDB();
  const post = db.prepare(`SELECT * FROM posts WHERE slug = ?`).get(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

module.exports = router;
