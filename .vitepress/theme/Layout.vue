<script setup>
import Blog from './components/Blog.vue';
import NotFound from "./NotFound.vue";
import { useData } from 'vitepress'
import {onBeforeUpdate, onUpdated} from "vue";

const { page } = useData();

</script>

<template>
  <div v-if="page.isNotFound">
    <NotFound/>
  </div>

  <Blog v-else />
</template>
