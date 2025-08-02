const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM rendement', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { culture_id, quantite, date_recolte } = req.body;
  db.query('INSERT INTO rendement (culture_id, quantite, date_recolte) VALUES (?, ?, ?)',
    [culture_id, quantite, date_recolte],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;
