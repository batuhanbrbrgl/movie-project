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

<style lang="scss" scoped>
.card {
  @apply relative grid pt-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2;
  .card-style {
    @apply m-4 border-4 border-green-700 flex flex-col justify-center rounded-2xl shadow-2xl shadow-green-700 relative;
    .heart-div {
      @apply absolute top-2 rounded-full bg-green-200 p-3 text-center flex items-center justify-center cursor-pointer shadow-2xl shadow-green-700 right-2 z-10;
    }
    .title-movie {
      @apply text-green-400 text-2xl font-bold mb-5;
    }
  }
  .card-image {
    @apply block rounded-t-xl w-full h-[600px] object-cover relative z-0;
  }
  .detail {
    @apply p-4 rounded-b-xl max-h-80 truncate flex flex-col;
    background-color: rgba(0, 0, 0, 0.6);
    .detail-style {
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
    h3 {
      @apply text-green-400 justify-center flex text-2xl font-bold mb-5;
    }
    p {
      @apply text-white text-lg;
    }
  }
}
</style>
