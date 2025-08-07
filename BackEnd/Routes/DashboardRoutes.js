const express = require('express');
const router = express.Router();
const connection = require('../config/db'); // ton fichier de connexion MySQL

// Route pour récupérer les rendements
router.get('/rendement', (req, res) => {
  const query = 'SELECT * FROM rendement';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des rendements:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
