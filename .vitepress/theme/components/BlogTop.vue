<template>
  <img class="content-img" v-if="top.image" :src="top.image" alt="" />
  <div class="title" v-if="top.title">{{ top.title }}</div>
  <div class="info" v-if="top.date">
    <template v-if="top.tags" v-for="tag in top.tags">
      <a :class="`tag-${tag}`" :style="`background-color:#${toHashColor(tag)}`" :href="`/pages/tags.html?tag=${tag}`">#{{ tag }}</a>
    </template>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData(); // 获取到头部配置文件
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const top = computed(()=>{
  const fron = frontmatter.value;
  return{
    image: (typeof fron.image === 'undefined')? false : fron.image,
    title: (typeof fron.title === 'undefined')? false : fron.title,
    date: (typeof fron.date === 'undefined')? false : new Date(Date.parse(fron.date)).toLocaleDateString('zh-CN',options),
    tags: (typeof fron.tags === 'undefined')? false : fron.tags,
  }
});

const toHashColor = function(str){
  let res = "";
  for(let i of str){
    i = i.charCodeAt(i);
    i **= 3;
    res += i.toString(16);
  }
  return res.substring(0,6);
}
</script>

<style>
.content-img {
  object-fit: cover;
  object-position: center;
  display: block;
  height: 16rem;
  width: 100%;
  margin-bottom: var(--dlyu-title-size);
}

.title {
  color: var(--vp-c-text-1);
  font-size: var(--dlyu-title-size);
  font-weight: 600;
  line-height: var(--dlyu-title-size);
  margin-bottom: var(--dlyu-title-size);
}

/* 头部标题下时间以及字数信息 */
.info {
  margin-bottom: var(--dlyu-title-size);
  color: var(--vp-c-text-3);
}

.info>span {
  margin-right: 0.2em;
}

[class*="tag-"]{
  padding: 4px 6px;
  font-size: .8rem;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all .25s;
  margin: 1px;
}

[class*="tag-"]:hover{
  opacity: 0.8;
}
</style>