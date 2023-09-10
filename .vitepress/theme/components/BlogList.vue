<script setup lang="ts">
import { useData } from 'vitepress';
import PageHead from './PageHead.vue';
import { DateFormatType, handelRawDate } from '../util/date.js';

type BlogListItem = {
  time: string;
  title: string;
  url: string;
};

const { frontmatter, site } = useData();
const title = site.value.themeConfig.name
  ? site.value.themeConfig.name
  : site.value.title;
const list: Array<BlogListItem> = frontmatter.value.list;
</script>

<template>
  <div class="blog-list">
    <PageHead />
    <ul class="list">
      <template v-for="item in list">
        <li>
          <span class="time">{{
              handelRawDate(item.time, DateFormatType.Dot)
            }}</span>
          <a :href="item.url">{{ item.title }}</a>
        </li>
      </template>
      <li class="right">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">BY-NC-SA</a>
        <span>© 2023 {{title}}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-list{
  padding: 0 1rem;
}
ul,
li {
  list-style: none;
  padding: 0;
}

.list {
  margin-top: 2rem;
}

li{
  display: flex;
}

li a {
  display: inline-block;
  color: var(--c-text-title);
  transition: color 0.5s;
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

li a:hover {
  color: var(--c-text-link);
}

.right a{
  color: var(--c-text-content);
  text-decoration: underline;
  margin-right: 1ch;
}

.time {
  font-weight: 100;
  display: inline-block;
  color: var(--c-text-low-level);
  margin-right: .5rem;
}

@media (min-width: 640px) {
  .blog-list{
    padding: 0;
  }
}
</style>
