<template>
  <div class="btn">
    <header>Movie <span> Room</span></header>

    <div class="link">
      <router-link class="btn" to="/">Home</router-link>
      <router-link class="btn" to="/favorites">Favorites</router-link>
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>
<script setup></script>

