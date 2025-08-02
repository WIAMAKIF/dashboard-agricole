const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM main_oeuvre', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nom, poste, date_embauche } = req.body;
  db.query('INSERT INTO main_oeuvre (nom, poste, date_embauche) VALUES (?, ?, ?)',
    [nom, poste, date_embauche],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;
