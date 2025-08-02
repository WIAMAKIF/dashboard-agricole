<template>
  <div>
    <h2>🌱 Données Culturelles</h2>
    <p><strong>Type :</strong> {{ culture?.type_culture }}</p>
    <p><strong>Surface :</strong> {{ culture?.surface }} ha</p>
    <p><strong>Stade :</strong> {{ culture?.stade }}</p>
    <p><strong>Date :</strong> {{ formatDate(culture?.date) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageCulture',
  data() {
    return {
      culture: null
    };
  },
  mounted() {
    fetch('http://localhost:3001/api/culture')
      .then(res => res.json())
      .then(data => {
        this.culture = data[0]; // adapter selon tes champs
      })
      .catch(err => console.error("Erreur Culture:", err));
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '';
    }
  }
}
</script>
