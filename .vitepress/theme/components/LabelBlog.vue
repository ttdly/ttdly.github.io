<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();

const items = computed(() => {
  return frontmatter.value.item;
});

const title = computed(() => {
  return frontmatter.value.label;
});
</script>

<template>
  <div class="blog-label">
    <div class="head">
      <span class="label">{{ title }}</span>
    </div>
    <ul class="list">
      <li v-for="item in items">
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.head {
  height: 10rem;
  background-color: #4f46e5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2rem;
  animation: shadow-enter 1s both 1;
  margin: calc(0rem - var(--px-post-pd-column))
    calc(0rem - var(--px-post-pd-row)) 2rem;
}

ul {
  padding: 0;
}
li {
  border: 0 dashed var(--c-text-low-level);
  border-bottom-width: 1px;
}
a {
  transition: 0.5s;
}
a:hover {
  color: var(--c-text-link);
}

.head {
  display: flex;
  flex-direction: column-reverse;
}

.label {
  font-size: 1.6rem;
  text-transform: capitalize;
  font-weight: 600;
}

.label::before {
  content: '#';
  margin-right: 5px;
}
</style>
