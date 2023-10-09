<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import  env from '@/env.js';

const movies = ref([]);
const searchQuery = ref("");
const favorites = ref([]);

const toggleFavorite = (movie) => {
  if (isFavorite(movie)) {
    removeFavorite(movie);
  } else {
    addFavorite(movie);
  }
};

const isFavorite = (movie) => {
  return favorites.value.some((favorite) => favorite.id === movie.id);
};
const addFavorite = (movie) => {
  favorites.value.push(movie);

  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
const removeFavorite = (movie) => {
  favorites.value = favorites.value.filter(
    (favorite) => favorite.id !== movie.id
  );

  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};

const filteredMovies = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );
});

const getMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${env.apikey}`
    );
    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }
    const data = await response.json();

    movies.value = data.results; 
  } catch (error) {
    console.error("Veri alımı sırasında bir hata oluştu:", error);
  }
};

onMounted(() => {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
  getMovies();
});
</script>


<template>
  <div class="home ">
    <div class="w-full flex justify-center">
      <div class="w-64 mx-3">
        <div
          class="relative my-3 justify-center flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
        >
          <div
            class="grid place-items-center bg-green-700 h-full w-12 text-gray-300"
          >
            <Icon class="w-6 h-6 text-green-400" icon="ri:search-line" />
          </div>

          <input
            v-model="searchQuery"
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search for movies..."
          />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-style" v-for="movie in filteredMovies" :key="movie.id">
        <router-link :to="'MovieDetail/' + movie.id">
          <img
            class="card-image"
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            :alt="movie.title"
          />
          <div class="detail">
            <h3 class="title-movie">
              {{ movie.title }}
            </h3>

            <div class="detail-style">
              <div
                class="detail-flex"
              >
                <Icon class="icon-date" icon="maki:cinema" />
                <p class="truncate">{{ movie.release_date }}</p>
              </div>
              <div>
                <span class="vote-title">Vote</span>
                <span class="vote-average">{{
                  movie.vote_average
                }}</span>
              </div>
            </div>
          </div>
        </router-link>

        <div
          class="heart-div"
          @click="toggleFavorite(movie)"
        >
          <span
            :class="{ 'text-red-500': isFavorite(movie) }"
            class="rounded-xl transition-colors duration-500"
          >
            <Icon class="w-8 h-8" icon="ph:heart-fill" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>



