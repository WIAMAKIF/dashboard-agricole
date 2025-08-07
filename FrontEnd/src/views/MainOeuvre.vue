<template>
  <div>
    <h2>👨‍🌾 Données Main d'œuvre</h2>

    <!-- 🔍 Barre de recherche -->
    <input
      v-model="search"
      type="text"
      placeholder="🔍 Rechercher par nom ou serre"
      style="margin: 20px 0; padding: 6px; width: 300px;"
    />

    <!-- 📋 Liste des ouvriers filtrés -->
    <div v-for="ouvrier in ouvriersFiltres" :key="ouvrier.id_ouvrier" class="card">
      <p><strong>Nom :</strong> {{ ouvrier.nom }}</p>
      <p><strong>CIN :</strong> {{ ouvrier.CIN }}</p>
      <p><strong>Arrivée :</strong> {{ formatDateTime(ouvrier.arrivée) }}</p>
      <p><strong>Départ :</strong> {{ formatDateTime(ouvrier.depart) }}</p>
      <p><strong>Heures travaillées :</strong> {{ ouvrier.heures_travaillees }} h</p>
      <p><strong>Kg récolté :</strong> {{ ouvrier.kg_recolte }} kg</p>
      <p><strong>Serre :</strong> {{ ouvrier.serre }}</p>
      <button @click="editOuvrier(ouvrier)">✏️ Modifier</button>
    </div>

    <!-- 📊 Graphique -->
    <h3>📊 Heures travaillées par ouvrier</h3>
    <canvas id="barChart" width="600" height="300"></canvas>

    <hr>

    <!-- 📝 Formulaire -->
    <h3>{{ editing ? "✏️ Modifier un ouvrier" : "➕ Ajouter un ouvrier" }}</h3>
    <form @submit.prevent="submitForm">
      <input v-model="form.nom" placeholder="Nom" required />
      <input v-model="form.CIN" placeholder="CIN" required />
      <input v-model="form.arrivée" type="datetime-local" required />
      <input v-model="form.depart" type="datetime-local" required />
      <input v-model="form.kg_recolte" type="number" placeholder="Kg récolté" required />
      <input v-model="form.serre" placeholder="Serre" required />
      <button type="submit">{{ editing ? "Enregistrer" : "Ajouter" }}</button>
      <button type="button" v-if="editing" @click="cancelEdit">Annuler</button>
    </form>
  </div>
</template>

<script>
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
Chart.register(BarElement,BarController, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  name: 'PageMainOeuvre',
  data() {
    return {
      ouvriers: [],
      barChart: null,
      search: '',
      form: {
        id_ouvrier: null,
        nom: '',
        CIN: '',
        arrivée: '',
        depart: '',
        kg_recolte: '',
        serre: ''
      },
      editing: false
    };
  },
    computed: {
     ouvriersFiltres() {
      const q = this.search.toLowerCase();
       return this.ouvriers.filter(o =>
        (o.nom?.toLowerCase() || '').includes(q) ||
        (o.serre?.toLowerCase() || '').includes(q)
         );
      }
    },

  mounted() {
    this.loadOuvriers();
  },
  methods: {
    loadOuvriers() {
      fetch('http://localhost:3001/api/maindoeuvre')
        .then(res => res.json())
        .then(data => {
          this.ouvriers = data;
          this.renderChart();
        })
        .catch(err => console.error("Erreur de récupération :", err));
    },
    renderChart() {
  console.log("=== DEBUG CHART ===");
  console.log("Ouvriers:", this.ouvriers);

  const noms = this.ouvriers.map(o => o.nom);
  const heures = this.ouvriers.map(o => Number(o.heures_travaillees) || 0);

  console.log("Noms:", noms);
  console.log("Heures:", heures);

  if (this.barChart) this.barChart.destroy();
  
  const ctx = document.getElementById('barChart');

  this.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: noms,
      datasets: [{
        label: 'Heures travaillées',
        data: heures,
        backgroundColor: '#4bc0c0'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Heures" }
        }
      }
    }
  });
},

    formatDateTime(dt) {
      return dt ? new Date(dt).toLocaleString('fr-FR') : '';
    },
    submitForm() {
      const url = this.editing
        ? `http://localhost:3001/api/maindoeuvre/${this.form.id_ouvrier}`
        : 'http://localhost:3001/api/maindoeuvre';

      const method = this.editing ? 'PUT' : 'POST';

      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      })
        .then(() => {
          this.loadOuvriers();
          this.resetForm();
        })
        .catch(err => console.error("Erreur soumission :", err));
    },
    editOuvrier(ouvrier) {
      this.form = { ...ouvrier };
      this.editing = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id_ouvrier: null,
        nom: '',
        CIN: '',
        arrivée: '',
        depart: '',
        kg_recolte: '',
        serre: ''
      };
      this.editing = false;
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #eef9ff;
}
form {
  background: #f3f3f3;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
}
form input {
  display: block;
  margin: 8px 0;
  padding: 6px;
  width: 100%;
}
form button {
  margin-right: 10px;
}
</style>
