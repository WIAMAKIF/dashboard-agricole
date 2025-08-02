<template>
  <div>
    <h2>📊 Données de Rendement</h2>
    <p><strong>Culture :</strong> {{ rendement?.culture }}</p>
    <p><strong>Rendement :</strong> {{ rendement?.rendement }}</p>
    <p><strong>Date :</strong> {{ formatDate(rendement?.date) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageRendement',
  data() {
    return {
      rendement: null
    };
  },
  mounted() {
    fetch('http://localhost:3001/api/rendement')
      .then(res => res.json())
      .then(data => {
        this.rendement = data;
      })
      .catch(err => console.error("Erreur Rendement:", err));
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '';
    }
  }
}
</script>
