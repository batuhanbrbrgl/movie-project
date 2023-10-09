<script setup>
import { ref, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";

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
      "https://api.themoviedb.org/3/movie/popular?api_key=ed68fa5ba669c8299056cff706d28344"
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
  <div class="home">
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


<style lang="scss" scoped>
.home {
  @apply text-center justify-center;
  .card {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 relative;
    .card-style {
      @apply m-4 border-4 border-green-700 flex flex-col justify-center rounded-2xl shadow-2xl shadow-green-700 relative;
      .heart-div{
        @apply absolute top-2 right-2 rounded-full bg-green-200 p-3 text-center flex items-center justify-center cursor-pointer shadow-2xl shadow-green-700 z-10;
      }
    }
    .card-image {
      @apply block rounded-t-xl w-full h-[600px] object-cover relative z-0;
    }
    .detail {
      @apply p-4 rounded-b-xl max-h-80 truncate flex flex-col;
      background-color: rgba(0, 0, 0, 0.6);
      .detail-style{
        @apply flex flex-row justify-between p-4;
        .detail-flex {
          @apply text-white space-x-2 text-lg text-center items-center flex flex-row;
          .icon-date {
            @apply w-6 h-6 text-green-400;
          }
        }
        .vote-title {
          @apply bg-green-700 p-2 rounded-l-xl;
        }
        .vote-average {
          @apply bg-gray p-2 rounded-r-xl;
        }
      }
      .title-movie {
        @apply text-green-400 text-2xl font-bold mb-5;
      }
      h3 {
        @apply text-green-400 text-2xl font-bold mb-5;
      }
      p {
        @apply text-white text-lg;
      }
    }
  }
}
input {
  @apply my-4 p-2 rounded-r-xl focus:shadow-2xl border-4 border-green-700 shadow-green-700 bg-green-700;
}
</style>
