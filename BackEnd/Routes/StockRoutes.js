const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM stock', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { produit, quantite, unite, date_entree } = req.body;
  db.query('INSERT INTO stock (produit, quantite, unite, date_entree) VALUES (?, ?, ?, ?)',
    [produit, quantite, unite, date_entree],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;
