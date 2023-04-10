<script setup>
import Post from "./components/Post.vue";
import NotFound from "./NotFound.vue";
import { useData } from "vitepress";

const { page } = useData();
</script>

<template>
  <div v-if="page.isNotFound">
    <NotFound />
  </div>

  <Post v-else />
</template>
