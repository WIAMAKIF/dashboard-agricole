<template>
  <div class="p-4">
    <h2>🌡️ Climat / Humidité</h2>

    <!-- 🔔 Alerte rouge -->
    <div
      v-if="showAlert"
      style="background-color: #ffcccc; border: 1px solid red; color: #800; padding: 10px; margin: 20px 0; border-radius: 6px;"
    >
      {{ alertMessage }}
    </div>

    <!-- 🔽 Filtre par position -->
    <label>Filtrer par position :</label>
    <select v-model="selectedPosition" @change="fetchClimatData">
      <option value="">Toutes</option>
      <option v-for="pos in positions" :key="pos">{{ pos }}</option>
    </select>

    <!-- 📋 Tableau des données -->
    <table border="1" cellpadding="5" cellspacing="0" style="margin-top: 20px;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Position</th>
          <th>Capteur</th>
          <th>Température (°C)</th>
          <th>Humidité (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in climatData" :key="item.id_condition">
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.type_capteur }}</td>
          <td>{{ item.temperature }}</td>
          <td>{{ item.humidite }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 📈 Graphique -->
    <canvas v-show="climatData.length > 0" ref="climatChart" style="margin-top: 40px;"></canvas>

    <p v-if="climatData.length === 0">Aucune donnée disponible.</p>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default {
  name: 'ClimatView',
  data() {
    return {
      climatData: [],
      positions: [],
      selectedPosition: '',
      chart: null,
      alertMessage: '',
      showAlert: false
    };
  },
  mounted() {
    this.fetchClimatData();
  },
  methods: {
    async fetchClimatData() {
      const url = this.selectedPosition
        ? `http://localhost:3001/api/climat/position/${this.selectedPosition}`
        : 'http://localhost:3001/api/climat';

      try {
        const response = await fetch(url);
        const data = await response.json();
        this.climatData = data;

        const uniquePositions = [...new Set(data.map(d => d.position))];
        this.positions = uniquePositions;

        // 🔔 Alerte si humidité hors norme
        const anomalies = data.filter(d => d.humidite < 30 || d.humidite > 70);
        if (anomalies.length > 0) {
          this.alertMessage = `⚠️ ${anomalies.length} mesure(s) avec une humidité anormale !`;
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }

        this.$nextTick(() => {
          this.renderChart();
        });
      } catch (error) {
        console.error('Erreur récupération climat:', error);
      }
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },

    renderChart() {
      if (this.chart) this.chart.destroy();
      if (!this.$refs.climatChart || this.climatData.length === 0) return;

      const ctx = this.$refs.climatChart.getContext('2d');
      const labels = this.climatData.map(d => new Date(d.date).toLocaleDateString());
      const humidites = this.climatData.map(d => d.humidite);
      const temperatures = this.climatData.map(d => d.temperature);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Humidité (%)',
              data: humidites,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              tension: 0.3
            },
            {
              label: 'Température (°C)',
              data: temperatures,
              borderColor: 'orange',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Évolution Climat - ${this.selectedPosition || 'Toutes les positions'}`
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 100,
              grid: {
                color: (context) => {
                  if (context.tick.value < 30 || context.tick.value > 70)
                    return 'rgba(255, 0, 0, 0.2)';
                  return 'rgba(0, 255, 0, 0.1)';
                }
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: 400px;
}
</style>