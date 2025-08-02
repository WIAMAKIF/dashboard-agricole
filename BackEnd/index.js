const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Autoriser les requêtes depuis le frontend
app.use(cors());

// Exemple de route API climat
app.get('/api/climat', (req, res) => {
  res.json({
    temperature: 28,
    humidite: 65,
    pluie: 5,
    date: new Date().toISOString().split('T')[0]
  });
});

app.listen(PORT, () => {
  console.log(`✅ API en écoute sur http://localhost:${PORT}`);
});
