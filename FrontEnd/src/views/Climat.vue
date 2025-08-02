<template>
  <div>
    <h2>🌦️ Données Climatiques</h2>
    <p><strong>Température :</strong> {{ climat?.temperature }} °C</p>
    <p><strong>Humidité :</strong> {{ climat?.humidite }} %</p>
    <p><strong>Type Capteur :</strong> {{ climat?.type_capteur }}</p>
    <p><strong>Position :</strong> {{ climat?.position }}</p>
    <p><strong>Date :</strong> {{ formatDate(climat?.date) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageClimat',
  data() {
    return {
      climat: null
    };
  },
  mounted() {
    fetch('http://localhost:3001/api/climat')
      .then(res => res.json())
      .then(data => {
        this.climat = data[0]; // On affiche seulement la première ligne
      })
      .catch(error => console.error("Erreur de chargement des données climatiques:", error));
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR');
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
p {
  font-size: 18px;
  margin: 5px 0;
}
</style>
