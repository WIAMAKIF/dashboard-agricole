<template>
  <div>
    <h1>🌾 Application Agricole</h1>

    <!-- Menu de navigation -->
    <nav>
      <router-link to="/">🏠 Dashboard</router-link> |
      <router-link to="/climat">💧 Climat</router-link> |
      <router-link to="/culture">🌱 Culture</router-link> |
      <router-link to="/stock">📦 Stock</router-link> |
      <router-link to="/main-oeuvre">👷 Main-d'œuvre</router-link> |
    </nav>

    <!-- Affichage de la page sélectionnée -->
    <router-view />
  </div>
</template>

<style>
nav {
  background-color: #f0f0f0;
  padding: 10px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  font-weight: bold;
  color: #333;
}
</style>
