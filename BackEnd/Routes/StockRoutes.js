const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔁 Fonction utilitaire pour convertir une chaîne vide en NULL
function toNullable(value) {
  return value === '' || value === null || value === undefined ? null : value;
}

// ✅ POST - Ajouter une entrée de stock
router.post('/', (req, res) => {
  const {
    id_produit,
    id_ferme,
    quantite_entree,
    quantite_sortie = 0,
    quantite_perdue = 0,
    date_entree,
    date_sortie,
    emplacement
  } = req.body;

  if (!id_produit || !id_ferme || !quantite_entree || !emplacement) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  const sql = `
    INSERT INTO stock (
      id_produit, id_ferme, quantite_entree,
      quantite_sortie, quantite_perdue,
      date_entree, date_sortie, emplacement
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    toNullable(id_produit),
    toNullable(id_ferme),
    toNullable(quantite_entree),
    toNullable(quantite_sortie),
    toNullable(quantite_perdue),
    toNullable(date_entree),
    toNullable(date_sortie),
    toNullable(emplacement)
  ], (err, result) => {
    if (err) {
      console.error("❌ Erreur d'insertion Stock:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.status(201).json({ message: "✅ Stock ajouté", id: result.insertId });
  });
});

// ✅ GET - Liste complète du stock
router.get('/', (req, res) => {
  const sql = "SELECT * FROM stock";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Erreur récupération Stock:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json(results);
  });
});

// ✅ PUT - Mise à jour d'un stock
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {
    id_produit,
    id_ferme,
    quantite_entree,
    quantite_sortie,
    quantite_perdue,
    date_entree,
    date_sortie,
    emplacement
  } = req.body;

  const sql = `
    UPDATE stock SET
      id_produit = ?, id_ferme = ?, quantite_entree = ?,
      quantite_sortie = ?, quantite_perdue = ?,
      date_entree = ?, date_sortie = ?, emplacement = ?
    WHERE id_stock = ?
  `;

  db.query(sql, [
    toNullable(id_produit),
    toNullable(id_ferme),
    toNullable(quantite_entree),
    toNullable(quantite_sortie),
    toNullable(quantite_perdue),
    toNullable(date_entree),
    toNullable(date_sortie),
    toNullable(emplacement),
    id
  ], (err, result) => {
    if (err) {
      console.error("❌ Erreur mise à jour Stock:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ message: "✅ Stock mis à jour" });
  });
});

// ✅ DELETE - Supprimer un stock
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM stock WHERE id_stock = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Erreur suppression Stock:", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json({ message: "🗑️ Stock supprimé" });
  });
});

module.exports = router;
