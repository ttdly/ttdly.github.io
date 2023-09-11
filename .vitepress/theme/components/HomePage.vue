<script setup lang="ts">
import { useData } from 'vitepress';
import Location from "./icons/Location.vue";
const { frontmatter } = useData();


const { site } = useData();
const title = site.value.themeConfig.name
  ? site.value.themeConfig.name
  : site.value.title;
const links = frontmatter.value.links
console.log(frontmatter.value.links)
</script>

<template>
  <div class="container slide-enter-content">
    <div class="avatar">
      <img src="logo.svg" alt="avatar">
    </div>
    <div class="name">{{title}}</div>
    <div class="location"><Location/><span>China</span></div>
    <div class="links">
      <ul>
        <template v-for="link in links">
          <li><a :href="link.link">{{link.title}}</a></li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: 100vh;
  justify-content: center;
  padding-bottom: 10rem;
}

.avatar {
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  overflow: hidden;
}

.avatar img {
  display: block;
  height: 100%;
  width: 100%;
}

.name {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--c-text-title);
}

.links ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
}

.links ul li{
  margin: 0;
}

.location {
  font-size: .8rem;
  display: flex;
  align-items: end;
  color: var(--c-text-low-level);
}

.location svg{
  height: 1rem;
  width: 1rem;
}

a{
  text-decoration: underline;
  color: var(--c-text-title);
}
a:hover{
  cursor: pointer
}
</style>