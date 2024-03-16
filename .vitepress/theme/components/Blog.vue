<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, type ComputedRef } from 'vue';
import { DateFormatType, handelRawDate } from '../util/date.js';
import Discuss from './icons/Discuss.vue';
import Gisus from '@giscus/vue';

type PageData = {
  create: string | Boolean;
  labels: Array<string> | Boolean;
  title: string | Boolean;
  update: string | Boolean;
  comments: string | Boolean;
  [key: string]: any;
};

const { frontmatter, site } = useData();
const links = site.value.themeConfig.nav;
const title = site.value.themeConfig.name
  ? site.value.themeConfig.name
  : site.value.title;
const postInfo: ComputedRef<PageData> = computed(() => {
  const result: PageData = {
    create: false,
    labels: false,
    title: false,
    update: false,
    comments: false,
  };
  for (const key in frontmatter.value) {
    result[key] = frontmatter.value[key];
  }
  return result;
});
</script>

<template>
  <div class="posts content">
    <div class="blog-head">
      <div>
        <ul>
          <template v-for="link in links">
            <li>
              <a :href="link.link">{{ link.text }}</a>
            </li>
          </template>
        </ul>
      </div>
      <div class="blog-info">
        <h1 v-if="postInfo.title">{{ postInfo.title }}</h1>
        <div class="blog-statistic">
          <span v-if="postInfo.create">{{
            handelRawDate(postInfo.create, DateFormatType.Dot)
          }}</span>
          <span v-if="postInfo.comments">
            <Discuss class="icon" /> {{ postInfo.comments }}
          </span>
        </div>
      </div>
    </div>
    <Content class="markdown slide-enter-content" />
    <p v-if="postInfo.update" class="blog-update">
      本文最后更新于
      {{ handelRawDate(postInfo.update, DateFormatType.Characters) }}
    </p>
    <p class="label-links">
      <template v-if="postInfo.labels" v-for="label in postInfo.labels">
        <a class="label-link" :href="`/pages/${label}`">{{ label }}</a>
      </template>
    </p>
    <p class="copyright">
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        >BY-NC-SA</a
      >
      <span class="space"></span>
      <span
        >©
        {{ handelRawDate(postInfo.create, DateFormatType.Dot).split('.')[0] }}
        {{ title }}</span
      >
      <span class="space"></span>|<span class="space"></span>
      Powered by
      <a href="https://vitepress.dev/" target="_blank">vitepress</a> &
      <a href="https://github.com/ttdly/poke" target="_blank">poke</a>
    </p>
  </div>
  <div class="comment-container">
    <div class="comment-button">
      <Discuss />
    </div>
    <div class="comment-content">
      <Gisus
        repo="ttdly/ttdly.github.io"
        repo-id="R_kgDOJMOVkQ"
        category="Posts"
        category-id="DIC_kwDOJMOVkc4CVY5w"
        mapping="title"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
        crossorigin="anonymous"
        async
      />
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.comment-button {
  height: 3rem;
  width: 3rem;
  border-radius: 999px;
  margin-bottom: 30px;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.29);
}

.comment-container:hover .comment-content {
  display: block;
}

.comment-container:hover .comment-button {
  display: none;
}

.comment-content {
  background: #fff;
  padding: 5px 10px;
  border: 1px solid;
  display: none;
  transition: opacity 0.3s ease-in-out;
}

.posts {
  padding: 0 10px;
}

.blog-update {
  font-size: 0.9em;
  text-align: end;
  margin: 0;
  color: var(--c-text-low-level);
}

.blog-head {
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: shadow-enter 1s both 1;
}

.blog-head h1 {
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  padding: 0;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--c-text-title);
}

.blog-head ul {
  list-style: none;
  display: flex;
  justify-content: end;
  gap: 2ch;
}

.blog-head a {
  text-decoration: underline;
}

.blog-head a:hover {
  color: var(--c-text-link);
}

.label-links {
  box-sizing: border-box;
  padding: 2ch 0;
  line-height: 1.2;
  margin: 0;
}

.label-link {
  display: inline-block;
  color: var(--c-text-title);
  cursor: pointer;
  font-size: smaller;
  padding: 3px 5px;
  border-radius: 2px;
  margin-right: 0.4rem;
  background-color: var(--c-bg-code-inline);
  transition: all 0.4s;
}

.label-link:hover {
  color: #fff;
  background-color: var(--c-text-title);
}

.blog-statistic span {
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 2rem;
  color: var(--c-custom-block-info);
}

.icon {
  vertical-align: sub;
}

.copyright a {
  text-decoration: underline;
  padding-bottom: 2ch;
}

.space {
  display: inline-block;
  width: 0.4rem;
}

@media (min-width: 640px) {
  body .blog-head {
    height: 12rem;
  }

  .posts {
    padding: 0;
  }
}
</style>
