<template>
  <div style="max-width:420px;margin:40px auto;">
    <h2>🔐 Connexion</h2>
    <form @submit.prevent="login">
      <div style="margin:10px 0;">
        <label>Email</label>
        <input v-model="email" type="email" required style="width:100%;padding:8px;">
      </div>
      <div style="margin:10px 0;">
        <label>Mot de passe</label>
        <input v-model="mot_de_passe" type="password" required style="width:100%;padding:8px;">
      </div>
      <button :disabled="loading" style="padding:10px 16px;">Se connecter</button>
      <p v-if="error" style="color:red;margin-top:8px;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return { email: '', mot_de_passe: '', loading:false, error:'' };
  },
  methods: {
    async login() {
      this.loading = true; this.error = '';
      try {
        const { data } = await axios.post('http://localhost:3001/api/auth/login', {
          email: this.email, mot_de_passe: this.mot_de_passe
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user', JSON.stringify({ nom: data.nom, email: data.email }));

        // Redirection selon le rôle
        if (data.role === 'direction') this.$router.push('/dashboard-global');
        else if (data.role === 'chef') this.$router.push('/dashboard-ferme');
        else if (data.role === 'controleur') this.$router.push('/dashboard-controle');
        else this.$router.push('/'); // fallback
      } catch (e) {
        this.error = 'Identifiants invalides';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
