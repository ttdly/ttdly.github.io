<script setup lang="ts">
import {useData} from 'vitepress';
import PageHead from './PageHead.vue';
import {DateFormatType, handelRawDate} from '../util/date.js';
import {computed} from "vue";

type BlogListItem = {
  time: string;
  title: string;
  url: string;
  labels: [];
};

const {frontmatter, site} = useData();
const title:string = site.value.themeConfig.name
  ? site.value.themeConfig.name
  : site.value.title;

const dealWithRawItem = function (item: BlogListItem){
  return {
    title: item.title,
    time: item.time,
    year: new Date(item.time).getFullYear(),
    labels: item.labels
  }
}

const listInfo = computed(()=>{
  let head = 'Posts'
  let list: Array<BlogListItem> = [];
  let labels = []
  let flag = 0
  if (frontmatter.value.page === 'list'){
    list = frontmatter.value.list;
    flag = 0;
  } else if(frontmatter.value.page === 'label') {
    list = frontmatter.value.item;
    head = frontmatter.value.label;
    flag = 0;
  } else {
    labels = frontmatter.value.labels
    flag = 1;
    head = 'labels'
  }

  return {
    head,
    list,
    labels,
    flag
  }
});

</script>

<template>
  <div class="blog-list">
    <PageHead :head="listInfo.head" :title="title"/>
    <ul class="list">
      <template v-if="listInfo.flag === 0" v-for="item in listInfo.list">
        <li>
          <span class="time">{{
              handelRawDate(item.time, DateFormatType.Dot)
            }}</span>
          <a :href="item.url">{{item.title}}</a>
        </li>
      </template>
      <template v-else v-for="label in listInfo.labels">
        <li>
          <a :href="`/pages/${label}`">{{ label }}</a>
        </li>
      </template>
      <li class="right">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">BY-NC-SA</a>
        <span>© 2023 {{title}}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.blog-list {
  padding: 0 1rem;
}

ul,
li {
  list-style: none;
  padding: 0;
}

.list {
  margin-top: 1rem;
}

li {
  display: flex;
}

li a {
  display: inline-block;
  color: var(--c-text-title);
  transition: color 0.5s;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

li a:hover {
  color: var(--c-text-link);
}

.right a {
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
  .blog-list {
    padding: 0;
  }
}
</style>
