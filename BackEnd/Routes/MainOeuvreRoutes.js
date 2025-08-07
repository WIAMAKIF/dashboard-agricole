const express = require('express');
const router = express.Router();
const db = require('../db');

//  GET : liste des ouvriers avec calculs
router.get('/', (req, res) => {
  db.query(`
    SELECT *,
      TIMESTAMPDIFF(HOUR, arrivée, depart) AS heures_travaillees,
      CASE 
        WHEN kg_recolte > 0 THEN ROUND((TIMESTAMPDIFF(HOUR, arrivée, depart) * 10) / kg_recolte, 2)
        ELSE NULL
      END AS cout_par_kg
    FROM ouvrier`, //  ici on utilise la vraie table
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

//  POST : ajout d’un ouvrier
router.post('/', (req, res) => {
  const { nom, CIN, arrivée, depart, kg_recolte, serre } = req.body;

  db.query(`
    INSERT INTO ouvrier (nom, CIN, arrivée, depart, kg_recolte, serre)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [nom, CIN, arrivée, depart, kg_recolte, serre],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
});

//  PUT : mise à jour d’un ouvrier
router.put('/:id', (req, res) => {
  const { nom, CIN, arrivée, depart, kg_recolte, serre } = req.body;
  const { id } = req.params;

  db.query(`
    UPDATE ouvrier 
    SET nom = ?, CIN = ?, arrivée = ?, depart = ?, kg_recolte = ?, serre = ?
    WHERE id_ouvrier = ?`,
    [nom, CIN, arrivée, depart, kg_recolte, serre, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true });
    }
  );
});

module.exports = router;
