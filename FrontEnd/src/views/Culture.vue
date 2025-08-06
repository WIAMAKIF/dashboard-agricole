<template>
  <div>
    <h2>🌾 Liste des cultures</h2>

    <table v-if="cultures.length">
      <thead>
        <tr>
          <th>Variété</th>
          <th>Type de culture</th>
          <th>Stade</th>
          <th>Date plantation</th>
          <th>Date récolte prévue</th>
          <th>Date récolte effective</th>
          <th>ID Serre</th>
          <th>ID Ferme</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="culture in cultures" :key="culture.id_culture">
          <td>{{ culture.variete }}</td>
          <td>{{ culture.type_culture }}</td>
          <td>{{ culture.stade || '-' }}</td>
          <td>{{ formatDate(culture.date_plantation) }}</td>
          <td>{{ formatDate(culture.date_recolte_prevue) }}</td>
          <td>{{ formatDate(culture.date_recolte_effective) }}</td>
          <td>{{ culture.id_serre }}</td>
          <td>{{ culture.id_ferme }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucune culture enregistrée.</p>

    <hr />

    <h3>➕ Ajouter une nouvelle culture</h3>
    <form @submit.prevent="ajouterCulture">
      <div>
        <label>Variété :</label>
        <input v-model="form.variete" required />
      </div>
      <div>
        <label>Type de culture :</label>
        <input v-model="form.type_culture" required />
      </div>
      <div>
        <label>Stade :</label>
        <input v-model="form.stade" />
      </div>
      <div>
        <label>Date de plantation :</label>
        <input type="date" v-model="form.date_plantation" required />
      </div>
      <div>
        <label>Date récolte prévue :</label>
        <input type="date" v-model="form.date_recolte_prevue" />
      </div>
      <div>
        <label>Date récolte effective :</label>
        <input type="date" v-model="form.date_recolte_effective" />
      </div>
      <div>
        <label>ID Serre :</label>
        <input type="number" v-model="form.id_serre" required />
      </div>
      <div>
        <label>ID Ferme :</label>
        <input type="number" v-model="form.id_ferme" required />
      </div>
      <button type="submit">Ajouter</button>
    </form>

    <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ToutesLesCultures',
  data() {
    return {
      cultures: [],
      form: {
        variete: '',
        type_culture: '',
        stade: '',
        date_plantation: '',
        date_recolte_prevue: '',
        date_recolte_effective: '',
        id_serre: 1,
        id_ferme: 1
      },
      successMessage: ''
    };
  },
  methods: {
    fetchCultures() {
      axios.get('http://localhost:3001/api/culture')
        .then(res => {
          this.cultures = res.data;
        })
        .catch(err => console.error("Erreur de chargement:", err));
    },
    ajouterCulture() {
      axios.post('http://localhost:3001/api/culture', this.form)
        .then(() => {
          this.successMessage = "✅ Culture ajoutée avec succès !";
          this.form = {
            variete: '',
            type_culture: '',
            stade: '',
            date_plantation: '',
            date_recolte_prevue: '',
            date_recolte_effective: '',
            id_serre: 1,
            id_ferme: 1
          };
          this.fetchCultures(); // rafraîchir la table
        })
        .catch(err => {
          console.error("Erreur d'ajout:", err);
          this.successMessage = "❌ Erreur lors de l'ajout";
        });
    },
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '-';
    }
  },
  mounted() {
    this.fetchCultures();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f5f5f5;
}
form {
  margin-top: 30px;
}
form div {
  margin-bottom: 10px;
}
input {
  padding: 5px;
  width: 200px;
}
button {
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
