<script setup lang="ts">
import { useData } from 'vitepress';
const { site } = useData();
const nav = site.value.themeConfig.nav;
</script>
<template>
  <div class="footer content">
    <ul>
      <template v-for="navItem in nav">
        <li>
          <a :href="navItem.link"> {{ navItem.text }} </a>
        </li>
      </template>
    </ul>
    <div>©2023 秃头灯笼鱼</div>
    <div>
      Powered by
      <a href="https://vitepress.dev/" target="_blank">vitepress</a> &
      <a href="https://github.com/ttdly/poke" target="_blank">poke</a>
    </div>
  </div>
</template>

<style scoped>
div.footer {
  margin: 4rem auto;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.8rem;
}

.footer div {
  margin-bottom: 4px;
}

.footer a {
  transition: color 0.25s;
  color: var(--c-text-low-level);
}
.footer a:hover {
  cursor: pointer;
  color: var(--c-text-title);
}

.footer ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.footer ul li {
  margin: 0;
}

.footer ul li + li::before {
  content: '·';
  color: var(--c-text-title);
  margin: 0 0.4rem;
}
</style>
