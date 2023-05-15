<script setup lang="ts">
import { useData } from 'vitepress';
import PageHead from './PageHead.vue';
import { DateFormatType, handelRawDate } from '../util/date.js';

type BlogListItem = {
  time: string;
  title: string;
  url: string;
};

const { frontmatter } = useData();
const list: Array<BlogListItem> = frontmatter.value.list;
</script>

<template>
  <div>
    <PageHead />
    <ul class="list">
      <template v-for="item in list">
        <li>
          <a :href="item.url">{{ item.title }}</a>
          <span class="time">{{
            handelRawDate(item.time, DateFormatType.Characters)
          }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
ul,
li {
  list-style: none;
  padding: 0;
}

.list {
  margin-top: 2rem;
}

li a {
  color: var(--c-text-title);
  font-size: 1.4rem;
  font-weight: 600;
  transition: color 0.5s;
}

li a:hover {
  color: var(--c-text-link);
}

.time {
  display: block;
  font-size: 0.8rem;
  color: var(--c-text-low-level);
}
</style>
