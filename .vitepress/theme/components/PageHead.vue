<script setup lang="ts">
import { useData } from 'vitepress';
import {toRefs} from "vue";
const prop = defineProps({
  title:String,
  head:String
})
const {title,head} = toRefs(prop)
const { site } = useData();
const links = site.value.themeConfig.nav;
</script>

<template>
  <div class="page-head">
    <div>
      <ul>
        <template v-for="link in links">
          <li><a :href="link.link">{{link.text}}</a></li>
        </template>
      </ul>
    </div>
    <span v-if="title" class="title">{{head}}</span>
  </div>
</template>

<style scoped>
.page-head ul,
.page-head li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-head {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 10rem;
}

.page-head .icon,
.page-head a {
  height: 1rem;
  width: 1rem;
}

.page-head a:hover {
  color: var(--c-text-link);
}

ul {
  text-decoration: none;
  display: flex;
  justify-content: end;
  gap: 2ch;
}

ul a{
  text-decoration: underline;
}
ul a:hover{
  color: var(--c-text-link);
}

.links {
  display: flex;
  align-items: center;
  margin-top: 0.5rem !important;
}

.links li {
  display: flex;
  align-items: center;
}

.links li + li::before {
  content: '';
  width: 0.4rem;
}

.title {
  margin-top: 0.5rem;
  display: block;
  font-weight: 600;
  font-size: 2rem;
}

.title::first-letter{
  text-transform: uppercase;
}

.page-head .icon {
  vertical-align: text-bottom !important;
}
</style>
