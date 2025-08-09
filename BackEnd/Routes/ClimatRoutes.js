// routes/climatRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// ✅ Tous les "chef" et "direction"
router.get('/',
  verifyToken,
  authorizeRoles('chef', 'direction'),
  (req, res) => {
    const sql = 'SELECT * FROM conditionclimatique ORDER BY date';
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur serveur' });
      res.json(result);
    });
  }
);

router.get('/position/:position',
  verifyToken,
  authorizeRoles('chef', 'direction'),
  (req, res) => {
    const sql = 'SELECT * FROM conditionclimatique WHERE position = ? ORDER BY date';
    db.query(sql, [req.params.position], (err, result) => {
      if (err) return res.status(500).json({ error: 'Erreur serveur' });
      res.json(result);
    });
  }
);

module.exports = router;
