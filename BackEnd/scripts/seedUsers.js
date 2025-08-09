const bcrypt = require('bcrypt');
const db = require('../db');

(async () => {
  const users = [
    { nom:'Directeur', email:'directeur@ex.com', pass:'secret123', role:'direction' },
    { nom:'Chef', email:'chef@ex.com', pass:'secret123', role:'chef' },
    { nom:'Controleur', email:'controleur@ex.com', pass:'secret123', role:'controleur' }
  ];
  for (const u of users) {
    const hash = await bcrypt.hash(u.pass, 10);
    await db.promise().query(
      'INSERT INTO utilisateurs (nom, email, mot_de_passe_hash, role) VALUES (?,?,?,?)',
      [u.nom, u.email, hash, u.role]
    );
  }
  console.log('✅ Utilisateurs créés.');
  process.exit(0);
})();
