const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');
const { verifyToken } = require('../middleware/auth');

const SECRET = process.env.JWT_SECRET || 'CHANGE_ME_SECRET';
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Créer un utilisateur (à utiliser pour seeder au début, ou restreindre à la direction plus tard)
 */
router.post('/register',
  body('nom').notEmpty(),
  body('email').isEmail(),
  body('mot_de_passe').isLength({ min: 6 }),
  body('role').isIn(['direction','chef','controleur']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { nom, email, mot_de_passe, role } = req.body;
    try {
      const [existing] = await db.promise().query('SELECT id_utilisateur FROM utilisateurs WHERE email=?', [email]);
      if (existing.length) return res.status(409).json({ error: 'Email déjà utilisé' });

      const hash = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
      await db.promise().query(
        'INSERT INTO utilisateurs (nom, email, mot_de_passe_hash, role) VALUES (?,?,?,?)',
        [nom, email, hash, role]
      );
      return res.status(201).json({ message: 'Utilisateur créé' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

/**
 * POST /api/auth/login
 */
router.post('/login',
  body('email').isEmail(),
  body('mot_de_passe').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, mot_de_passe } = req.body;
    try {
      const [rows] = await db.promise().query('SELECT * FROM utilisateurs WHERE email=?', [email]);
      if (!rows.length) return res.status(401).json({ error: 'Identifiants invalides' });

      const user = rows[0];
      const ok = await bcrypt.compare(mot_de_passe, user.mot_de_passe_hash);
      if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

      const token = jwt.sign(
        { id_utilisateur: user.id_utilisateur, role: user.role, nom: user.nom, email: user.email },
        SECRET,
        { expiresIn: '8h' }
      );
      return res.json({ token, role: user.role, nom: user.nom, email: user.email });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

/**
 * GET /api/auth/me  (test de token)
 */
router.get('/me', verifyToken, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
