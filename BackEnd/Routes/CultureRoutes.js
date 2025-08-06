// routes/CultureRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agricole_db'
});

router.post('/', (req, res) => {
   const {
    variete,
    type_culture,
    date_plantation,
    date_recolte_prevue,
    date_recolte_effective,
    id_serre,
    id_ferme
  } = req.body;
  const sql = `
    INSERT INTO culture 
    (variete, type_culture, date_plantation, date_recolte_prevue, date_recolte_effective, id_serre, id_ferme) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [variete, type_culture, date_plantation, date_recolte_prevue, date_recolte_effective, id_serre, id_ferme], (err, result) => {
    if (err) {
      console.error("Erreur d'insertion Culture:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.status(201).json({ message: "Culture ajoutée", id: result.insertId });
  });
});

// Route Get
router.get('/', (req, res) => {
  const sql = "SELECT * FROM culture";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur récupération cultures:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json(results);
  });
});
module.exports = router;


