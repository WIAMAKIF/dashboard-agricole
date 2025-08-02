// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Remets ton mot de passe ici si nécessaire
  database: 'agricole_db', // Assure-toi que c’est le nom exact de ta BDD
});

db.connect(err => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL :', err);
  } else {
    console.log('✅ Connecté à la base de données MySQL');
  }
});

// Importation des routes
const climatRoutes = require('./routes/ClimatRoutes');
const cultureRoutes = require('./routes/CultureRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');
const mainOeuvreRoutes = require('./routes/MainOeuvreRoutes');
const rendementRoutes = require('./routes/RendementRoutes');
const stockRoutes = require('./routes/StockRoutes');

// Utilisation des routes
app.use('/api/climat', climatRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/maindoeuvre', mainOeuvreRoutes);
app.use('/api/rendement', rendementRoutes);
app.use('/api/stock', stockRoutes);

// Lancer le serveur
app.listen(port, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${port}`);
});
