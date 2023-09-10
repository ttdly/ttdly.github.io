<script setup lang="ts">
import { useData } from 'vitepress';
import RSS from './icons/RSS.vue';
import SocialLink from './icons/SocialLink.vue';

const { site } = useData();
const title = site.value.themeConfig.name
  ? site.value.themeConfig.name
  : site.value.title;
const socialLink = site.value.themeConfig.socialLink;
</script>

<template>
  <div class="page-head">
    <span v-if="title" class="title">Posts</span>
<!--    <ul class="links">-->
<!--      <li v-for="item in socialLink">-->
<!--        <SocialLink :icon="item.icon" :link="item.link" />-->
<!--      </li>-->
<!--      <li>-->
<!--        <a v-if="site.themeConfig.rss" :href="site.themeConfig.rss"-->
<!--          ><RSS class="icon"-->
<!--        /></a>-->
<!--      </li>-->
<!--    </ul>-->
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
  padding-bottom: 1rem;
}

.page-head .icon,
.page-head a {
  height: 1rem;
  width: 1rem;
}

.page-head a:hover {
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

.page-head .icon {
  vertical-align: text-bottom !important;
}
</style>
