const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM climat', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { temperature, humidite, date } = req.body;
  db.query('INSERT INTO climat (temperature, humidite, date) VALUES (?, ?, ?)',
    [temperature, humidite, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;
