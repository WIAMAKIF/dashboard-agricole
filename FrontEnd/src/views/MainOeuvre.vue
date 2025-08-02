<template>
  <div>
    <h2>👷 Données Main d'œuvre</h2>
    <p><strong>Ouvriers :</strong> {{ main?.ouvriers }}</p>
    <p><strong>Techniciens :</strong> {{ main?.techniciens }}</p>
    <p><strong>Jour de Travail :</strong> {{ formatDate(main?.jourTravail) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageMainOeuvre',
  data() {
    return {
      main: null
    };
  },
  mounted() {
    fetch('http://localhost:3001/api/maindoeuvre')
      .then(res => res.json())
      .then(data => {
        this.main = data;
      })
      .catch(err => console.error("Erreur Main d'œuvre:", err));
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '';
    }
  }
}
</script>
