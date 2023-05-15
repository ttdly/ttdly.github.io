<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, type ComputedRef, onMounted } from 'vue';
import { DateFormatType, handelRawDate } from '../util/date.js';
import Discuss from './icons/Discuss.vue';

type PageData = {
  create: string | Boolean;
  labels: Array<string> | Boolean;
  title: string | Boolean;
  update: string | Boolean;
  comments: string | Boolean;
  [key: string]: any;
};

onMounted(() => {
  Array.from(document.getElementsByTagName('img')).forEach((img) => {
    img.addEventListener('error', () => {
      img.src =
        '/img_error.svg';
      img.onerror = () => {
        return;
      };
    });
  });
});

const { frontmatter } = useData();
const postInfo: ComputedRef<PageData> = computed(() => {
  const result: PageData = {
    create: false,
    labels: false,
    title: false,
    update: false,
    comments: false
  };
  for (const key in frontmatter.value) {
    result[key] = frontmatter.value[key];
  }
  return result;
});
</script>

<template>
  <div class="posts content shadow-box">
    <div class="blog-head">
      <div></div>
      <div class="blog-info">
        <template v-if="postInfo.labels" v-for="label in postInfo.labels">
          <a class="label-link" :href="`/pages/${label}`">{{ label }}</a>
        </template>
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
      {{
        handelRawDate(postInfo.update, DateFormatType.Characters)
      }}，请注意时效性。
    </p>
  </div>
</template>

<style scoped>
.blog-update {
  background: var(--c-code-highlight-warning);
  padding: 3%;
  color: var(--c-code-diff-remove-symbol);
  font-size: 0.9em;
}

.blog-head {
  height: 20rem;
  background-color: #4f46e5;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2rem;
  animation: shadow-enter 1s both 1;
  margin: calc(0rem - var(--px-post-pd-column))
    calc(0rem - var(--px-post-pd-row)) 2rem;
}

.blog-head h1 {
  margin-top: 0.6rem;
  margin-bottom: 1rem;
  padding: 0;
  color: #ffffff;
  font-size: 1.6rem;
}

.label-link {
  background: #ffffff;
  display: inline-block;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 4px;
  color: var(--c-text-title);
  cursor: pointer;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
}

.blog-statistic span {
  font-size: 0.8rem;
  display: inline-block;
  margin-right: 2rem;
}

.icon {
  vertical-align: sub;
}
</style>
