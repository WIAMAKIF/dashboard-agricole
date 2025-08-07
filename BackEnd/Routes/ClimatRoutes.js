const express = require('express');
const router = express.Router();
const db = require('../db');

// Toutes les données
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM conditionclimatique ORDER BY date';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Données par position (zone)
router.get('/position/:position', (req, res) => {
  const position = req.params.position;
  const sql = 'SELECT * FROM conditionclimatique WHERE position = ? ORDER BY date';
  db.query(sql, [position], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

module.exports = router;
