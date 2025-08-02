const express = require('express');
const router = express.Router();
const db = require('../db');

// Exemple simple : total de cultures
router.get('/summary', (req, res) => {
  db.query('SELECT COUNT(*) AS totalCultures FROM culture', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
});

module.exports = router;
