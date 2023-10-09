<template>
  <div class="mx-6 rounded-3xl">
    <div
      class="w-full flex-col my-10 rounded-3xl border-4 shadow-2xl shadow-green-700 border-green-700 bg-slate-400 lg:flex-row flex"
    >
      <div class="w-full md:w-auto">
        <img
          class="w-full h-full rounded-t-[21px] lg:rounded-l-[21px]"
          :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          :alt="movie.title"
        />
      </div>

      <div class="w-full p-5 gap-1 flex flex-col">
        <h2 class="text-5xl mb-4 font-extrabold text-green-700">
          {{ movie.original_title }}
        </h2>

        <h1 class="font-bold text-green-800">Overview</h1>
        <p class="">
          {{ movie.overview }}
        </p>
        <h1 class="font-bold text-green-800">Genres</h1>
        <span
          class="flex flex-col"
          v-for="genre in movie.genres"
          :key="genre.id"
          >{{ genre.name }}</span
        >
        <h1 class="font-bold text-green-800">Movie Duration</h1>
        <p>{{ movie.runtime }} Minute</p>
        <h1 class="font-bold text-green-800">Ülke</h1>
        <span
          v-for="country in movie.production_countries"
          :key="country.iso_3166_1"
          >{{ country.name }}</span
        >
        <h1 class="font-bold text-green-800">Status</h1>
        <span>{{ movie.status }}</span>
        <h1 class="font-bold text-green-800">Kullanılan Oy</h1>
        <span>{{ movie.vote_count }}</span>
        <h1 class="font-bold text-green-800">Ortalama Puan</h1>
        <span>{{ movie.vote_average }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref({});

onBeforeMount(async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=ed68fa5ba669c8299056cff706d28344`
  );
  movie.value = await res.json();
});
</script>
