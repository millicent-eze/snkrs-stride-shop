const express = require('express');
const router = express.Router();
const Sneaker = require('../models/Sneaker');

// ── GET all sneakers ──
// URL: GET /api/sneakers
router.get('/', async (req, res) => {
  try {
    const sneakers = await Sneaker.find();
    res.json(sneakers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET a single sneaker by ID ──
// URL: GET /api/sneakers/:id
router.get('/:id', async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);
    if (!sneaker) return res.status(404).json({ error: 'Sneaker not found' });
    res.json(sneaker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── CREATE a new sneaker ──
// URL: POST /api/sneakers
router.post('/', async (req, res) => {
  try {
    const sneaker = new Sneaker(req.body);
    const saved = await sneaker.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── UPDATE a sneaker ──
// URL: PUT /api/sneakers/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Sneaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Sneaker not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE a sneaker ──
// URL: DELETE /api/sneakers/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Sneaker.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Sneaker not found' });
    res.json({ message: 'Sneaker deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
