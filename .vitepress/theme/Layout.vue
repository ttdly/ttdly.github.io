<script setup lang="ts">
import './css/global.css';
import './css/markdown.css';
import './css/vars.css';
import './css/vp-code-group.css';
import './css/animation.css';
import {useData} from 'vitepress';
import Blog from './components/Blog.vue';
import BlogList from './components/BlogList.vue';
import NotFound from './NotFound.vue';
import HomePage from "./components/HomePage.vue";
const {frontmatter} = useData();

</script>

<template>
  <div class="layout-container">
    <Blog v-if="frontmatter.title"/>
    <HomePage v-else-if="frontmatter.page === 'home'"/>
    <BlogList
        v-else-if="
        frontmatter.page === 'list' ||
        frontmatter.page === 'label'||
        frontmatter.page === 'labels'
        "
        class="content slide-enter-content"
    />
    <NotFound v-else/>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100%;
  min-height: 100%;
}
</style>
