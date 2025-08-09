<template>
  <div class="dashboard">
    <!-- Header avec déconnexion -->
    <header v-if="isLoggedIn" class="header">
      <div>🌱 Tableau Agricole</div>
      <div class="header-right">
        <span v-if="user">Bonjour, <strong>{{ user.nom }}</strong></span>
        <button @click="logout" class="logout-btn">Déconnexion</button>
      </div>
    </header>

    <h2>📊 Tableau de Bord Agricole</h2>

    <!-- Filtres -->
    <div style="margin-bottom: 20px">
      <label for="culture">Filtrer par culture :</label>
      <select v-model="selectedCulture" @change="filterData">
        <option value="">Toutes</option>
        <option v-for="id in cultureOptions" :key="id" :value="id">
          Culture {{ id }}
        </option>
      </select>

      <label for="startDate" style="margin-left: 20px">Période : De</label>
      <input type="date" v-model="startDate" @change="filterData" />
      <label for="endDate">à</label>
      <input type="date" v-model="endDate" @change="filterData" />
    </div>

    <!-- Statistiques -->
    <div v-if="filteredData.length">
      <p><strong>Total récolté :</strong> {{ totalKg }} kg</p>
      <p><strong>Rendement moyen :</strong> {{ averageKg.toFixed(2) }} kg</p>
    </div>

    <!-- Graphique -->
    <line-chart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />

    <!-- Tableau -->
    <table v-if="filteredData.length" style="margin-top: 30px; width: 100%; border-collapse: collapse">
      <thead>
        <tr>
          <th style="border: 1px solid black">Date</th>
          <th style="border: 1px solid black">Quantité (kg)</th>
          <th style="border: 1px solid black">Remarques</th>
          <th style="border: 1px solid black">ID Culture</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id_rendement">
          <td style="border: 1px solid black">{{ formatDate(item.date) }}</td>
          <td style="border: 1px solid black">{{ item.quantite_kg }}</td>
          <td style="border: 1px solid black">{{ item.remarques }}</td>
          <td style="border: 1px solid black">{{ item.id_culture }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p>Aucune donnée disponible pour les filtres sélectionnés.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'DashboardView',
  components: { LineChart },
  data() {
    return {
      data: [],
      filteredData: [],
      selectedCulture: '',
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    user() {
      try { return JSON.parse(localStorage.getItem('user')); }
      catch { return null; }
    },
    cultureOptions() {
      return [...new Set(this.data.map((item) => item.id_culture))];
    },
    chartData() {
      if (!this.filteredData.length) return null;
      const labels = this.filteredData.map((item) => this.formatDate(item.date));
      const data = this.filteredData.map((item) => item.quantite_kg);
      return {
        labels,
        datasets: [
          { label: 'Quantité récoltée (kg)', data, backgroundColor: '#4CAF50' },
        ],
      };
    },
    chartOptions() {
      return { responsive: true, maintainAspectRatio: false };
    },
    totalKg() {
      return this.filteredData.reduce((acc, item) => acc + item.quantite_kg, 0);
    },
    averageKg() {
      return this.filteredData.length ? this.totalKg / this.filteredData.length : 0;
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/rendement');
        this.data = response.data;
        this.filteredData = this.data;
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    },
    filterData() {
      this.filteredData = this.data.filter((item) => {
        const matchesCulture =
          !this.selectedCulture || item.id_culture === parseInt(this.selectedCulture);
        const date = new Date(item.date);
        const matchesStart = !this.startDate || date >= new Date(this.startDate);
        const matchesEnd = !this.endDate || date <= new Date(this.endDate);
        return matchesCulture && matchesStart && matchesEnd;
      });
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR');
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
  mounted() { this.fetchData(); },
};
</script>

<style scoped>
.dashboard { padding: 20px; }
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; background: #16a34a; color: white; border-radius: 8px; margin-bottom: 16px;
}
.header-right { display: flex; align-items: center; gap: 10px; }
.logout-btn {
  background: #ef4444; color: white; border: 0; padding: 6px 10px; border-radius: 6px; cursor: pointer;
}
.logout-btn:hover { opacity: 0.9; }
</style>
