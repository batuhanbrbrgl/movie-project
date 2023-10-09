<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const favorites = ref([]);
const removeFavorite = (favorite) => {
  favorites.value = favorites.value.filter((movie) => movie.id !== favorite.id);

  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
onMounted(() => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
});
</script>

<template>
  <div class="card">
    <div v-for="favorite in favorites" :key="favorite.id" class="card-style">
      <div class="heart-div">
        <span class="rounded-xl">
          <Icon
            class="w-8 h-8 text-red-500"
            icon="ph:heart-fill"
            @click="removeFavorite(favorite)"
          />
        </span>
      </div>

      <div>
        <img
          class="card-image"
          :src="'https://image.tmdb.org/t/p/w500/' + favorite.poster_path"
          :alt="favorite.title"
        />
        <div class="detail">
          <h3 class="title-movie">
            {{ favorite.title }}
          </h3>

          <div class="detail-style">
            <div class="detail-flex">
              <Icon class="icon-date" icon="maki:cinema" />
              <p class="truncate">{{ favorite.release_date }}</p>
            </div>
            <div>
              <span class="vote-title">Vote</span>
              <span class="vote-average">{{ favorite.vote_average }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


