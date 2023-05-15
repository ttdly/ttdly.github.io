<script setup lang="ts">
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <ul>
    <li v-for="item in frontmatter.labels">
      <a :href="`/pages/${item}`">{{ item }}</a>
    </li>
  </ul>
</template>

<style scoped></style>
