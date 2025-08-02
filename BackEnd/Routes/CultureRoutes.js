const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM culture', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { type, superficie, date } = req.body;
  db.query('INSERT INTO culture (type, superficie, date) VALUES (?, ?, ?)',
    [type, superficie, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;
