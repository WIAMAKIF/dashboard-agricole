<template>
  <div class="app-container">
    <!-- Overlay pour lisibilité -->
    <div class="background-overlay"></div>

    <!-- En-tête + menu -->
    <header>
      <h1>🍓 Tableau Agricole</h1>
      <nav>
        <router-link to="/" exact-active-class="active">🏠 Dashboard</router-link>
        <router-link to="/climat" exact-active-class="active">💧 Climat</router-link>
        <router-link to="/culture" exact-active-class="active">🌱 Culture</router-link>
        <router-link to="/stock" exact-active-class="active">📦 Stock</router-link>
        <router-link to="/main-oeuvre" exact-active-class="active">👷 Main-d'œuvre</router-link>
      </nav>
    </header>

    <!-- Zone principale (avec bloc blanc pour contenu lisible) -->
    <main>
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 🌄 Fond avec photo et dégradé */
.app-container {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #e91e63, #8bc34a),
    url('https://images.unsplash.com/photo-1598511728444-e4e4e5f37c6d'); /* Framboise */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

/* Overlay sombre pour meilleure lisibilité */
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

/* 🧢 En-tête */
header {
  position: relative;
  z-index: 1;
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid #ffffff40;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-bottom: 15px;
  font-size: 30px;
  color: #fff;
}

/* 🧭 Menu de navigation */
nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

nav a {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 10px 16px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.3);
  color: #ffeaea;
}

nav a.active {
  background-color: #ff4081;
  color: #fff;
}

/* 🧱 Zone principale avec conteneur clair */
main {
  position: relative;
  z-index: 1;
  padding: 30px;
  display: flex;
  justify-content: center;
         
}

/* 🔲 Bloc de contenu clair et lisible */
.content-wrapper {
  background-color: rgba(255, 255, 255, 0.92);
  color: #222;
  backdrop-filter: blur(4px);
  border-radius: 20px;
  padding: 30px;
  max-width: 1000px;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  
}
</style>
