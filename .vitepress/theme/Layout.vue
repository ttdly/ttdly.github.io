<script setup lang="ts">
import './css/global.css';
import './css/markdown.css';
import './css/vars.css';
import './css/vp-code-group.css';
import './css/animation.css';
import { useData } from 'vitepress';
import Blog from './components/Blog.vue';
import Footer from './components/Footer.vue';
import BlogList from './components/BlogList.vue';
import NotFound from './NotFound.vue';
import LabelList from './components/LabelList.vue';
import LabelBlog from './components/LabelBlog.vue';
import Cursor from "./components/Cursor.vue";
import HomePage from "./components/HomePage.vue";

const { frontmatter } = useData();
</script>

<template>
<!--  <Cursor/>-->
  <Blog v-if="frontmatter.title" />
  <HomePage v-else-if="frontmatter.page === 'home'"/>
  <BlogList
    v-else-if="frontmatter.page === 'list'"
    class="content shadow-box slide-enter-content"
  />
  <LabelList
    v-else-if="frontmatter.page === 'labels'"
    class="content shadow-box slide-enter-content"
  />
  <LabelBlog
    v-else-if="frontmatter.page === 'label'"
    class="content shadow-box slide-enter-content"
  />
  <NotFound v-else />
  <Footer v-if="frontmatter.page !== 'home'"/>
</template>

<style scoped></style>
