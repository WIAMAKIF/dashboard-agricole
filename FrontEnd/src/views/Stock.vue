<template>
  <div>
    <h2>📦 Gestion du stock</h2>

    <table v-if="stocks.length">
      <thead>
        <tr>
          <th>ID Produit</th>
          <th>ID Ferme</th>
          <th>Entrée</th>
          <th>Sortie</th>
          <th>Perdue</th>
          <th>Date entrée</th>
          <th>Date sortie</th>
          <th>Emplacement</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.id_stock">
          <td>{{ stock.id_produit }}</td>
          <td>{{ stock.id_ferme }}</td>
          <td>{{ stock.quantite_entree }}</td>
          <td>{{ stock.quantite_sortie }}</td>
          <td>{{ stock.quantite_perdue }}</td>
          <td>{{ formatDate(stock.date_entree) }}</td>
          <td>{{ formatDate(stock.date_sortie) }}</td>
          <td>{{ stock.emplacement }}</td>
          <td>
            <button @click="editStock(stock)">✏️</button>
            <button @click="deleteStock(stock.id_stock)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <hr />
    <h3>➕ Ajouter un nouveau stock</h3>
    <form @submit.prevent="addStock">
      <input v-model="newStock.id_produit" placeholder="ID Produit" required />
      <input v-model="newStock.id_ferme" placeholder="ID Ferme" required />
      <input v-model="newStock.quantite_entree" placeholder="Entrée" required />
      <input v-model="newStock.quantite_sortie" placeholder="Sortie" required />
      <input v-model="newStock.quantite_perdue" placeholder="Perdue" required />
      <input type="date" v-model="newStock.date_entree" />
      <input type="date" v-model="newStock.date_sortie" />
      <input v-model="newStock.emplacement" placeholder="Emplacement" required />
      <button type="submit">Ajouter</button>
    </form>

    <div v-if="editMode">
      <hr />
      <h3>✏️ Modifier le stock</h3>
      <form @submit.prevent="updateStock">
        <input v-model="selectedStock.id_produit" />
        <input v-model="selectedStock.id_ferme" />
        <input v-model="selectedStock.quantite_entree" />
        <input v-model="selectedStock.quantite_sortie" />
        <input v-model="selectedStock.quantite_perdue" />
        <input type="date" v-model="selectedStock.date_entree" />
        <input type="date" v-model="selectedStock.date_sortie" />
        <input v-model="selectedStock.emplacement" />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
   name : 'PageStock',
  data() {
    return {
      stocks: [],
      newStock: {
        id_produit: '',
        id_ferme: '',
        quantite_entree: '',
        quantite_sortie: '',
        quantite_perdue: '',
        date_entree: '',
        date_sortie: '',
        emplacement: ''
      },
      selectedStock: null,
      editMode: false
    }
  },
  methods: {
    fetchStocks() {
      axios.get('http://localhost:3001/api/stock')
        .then(res => this.stocks = res.data)
        .catch(err => console.error(err));
    },
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '-';
    },
    addStock() {
  console.log("🔁 Fonction addStock appelée"); // 🔥 LOG TEST

  axios.post('http://localhost:3001/api/stock', this.newStock)
    .then(() => {
      alert("✅ Stock ajouté !");
      this.fetchStocks();
      this.newStock = {
        id_produit: '',
        id_ferme: '',
        quantite_entree: '',
        quantite_sortie: '',
        quantite_perdue: '',
        date_entree: '',
        date_sortie: '',
        emplacement: ''
      };
    })
    .catch(err => {
      console.error("❌ Erreur ajout :", err);
      alert("❌ Erreur lors de l'ajout");
    });
},

    editStock(stock) {
      this.selectedStock = { ...stock };
      this.editMode = true;
    },
    updateStock() {
      axios.put(`http://localhost:3001/api/stock/${this.selectedStock.id_stock}`, this.selectedStock)
        .then(() => {
          this.fetchStocks();
          this.editMode = false;
        })
        .catch(err => console.error(err));
    },
    deleteStock(id) {
      axios.delete(`http://localhost:3001/api/stock/${id}`)
        .then(() => this.fetchStocks())
        .catch(err => console.error(err));
    }
  },
  mounted() {
    this.fetchStocks();
  }
}
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
button {
  margin: 2px;
  padding: 6px 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
