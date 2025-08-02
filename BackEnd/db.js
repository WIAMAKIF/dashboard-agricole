const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // adapte si tu as un mot de passe
  database: 'agricole_db',
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à MySQL depuis db.js');
  }
});

module.exports = db;
