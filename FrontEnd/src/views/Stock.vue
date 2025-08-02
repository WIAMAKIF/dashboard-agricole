<template>
  <div>
    <h2>📦 Données de Stock</h2>
    <p><strong>Engrais :</strong> {{ stock?.engrais }} kg</p>
    <p><strong>Semences :</strong> {{ stock?.semences }} kg</p>
    <p><strong>Pesticide :</strong> {{ stock?.pesticide }} L</p>
    <p><strong>Date :</strong> {{ formatDate(stock?.date) }}</p>
  </div>
</template>

<script>
export default {
  name: 'PageStock',
  data() {
    return {
      stock: null
    };
  },
  mounted() {
    fetch('http://localhost:3001/api/stock')
      .then(res => res.json())
      .then(data => {
        this.stock = data[0];
      })
      .catch(err => console.error("Erreur Stock:", err));
  },
  methods: {
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '';
    }
  }
}
</script>
