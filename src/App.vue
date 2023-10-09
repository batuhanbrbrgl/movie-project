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
<style lang="scss" scoped>
* {
  @apply bg-background;
  &::selection {
    @apply bg-danger;
  }
}
header {
  @apply bg-green-700 flex w-full text-center p-10 text-5xl font-bold text-white justify-center;
  span {
    @apply text-black bg-green-800 rounded-lg;
  }
}
.link {
  @apply flex flex-row justify-center space-x-10 bg-green-700 pt-4 text-xl font-bold;

  .btn {
    @apply text-black rounded-t-2xl bg-beige p-3 duration-300;

    &:hover {
      @apply bg-opacity-75 text-green-700;
    }

    &.router-link-exact-active {
      @apply text-green-700;
    }
  }
}
</style>
