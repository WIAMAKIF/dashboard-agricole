const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // change si tu as défini un mot de passe
  database: 'agricole_db', // à adapter avec le vrai nom
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Exemple de route
app.get('/api/climat', (req, res) => {
  db.query('SELECT * FROM conditionclimatique', (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);
      return res.status(500).json({ error: err.sqlMessage });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur backend lancé sur http://localhost:${port}`);
});
