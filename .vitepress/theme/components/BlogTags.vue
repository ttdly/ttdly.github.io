<template>
  <div class="BlogTags">
    <span class="tag-item" v-for="tag in key" @click="select($event)" :tag="tag">
      #{{ tag }}
    </span>
  </div>
  <div id="title-tag">
    #{{ currTag }}
  </div>
  <template v-for="item in pageList">
    <a :href="item.url">
      <li class="archive-list-item">
        <span class="archive-list-info">{{ `${new
          Date(item.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
          }}</span>
        <span class="archive-list-title">{{ item.frontmatter.title }}</span>
      </li>
    </a>
  </template>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { data as Tposts } from "../utils/posts.data"
import { devidePostsByTags } from "../utils/posts.deal"
import { posts as Fposts } from "../utils/fakedata"

let posts;
const lastDom = ref({});
const pageList = ref([]);
const currTag = ref("");
// 判断当前环境，确认使用哪些数据
if (process.env.NODE_ENV === "development") {
  console.log('dev')
  posts = Fposts;
} else {
  posts = Tposts;
}
const { map, key } = devidePostsByTags(posts);

onMounted(() => {
  let tag;
  if (window.location.search === "") {
    select({ "target": document.getElementsByClassName('tag-item')[0] })
  } else {
    tag = decodeURI(window.location.search.replace("?tag=", ""));
    pageList.value = map.get(tag);
    currTag.value = tag;
  }

});

const toHashColor = function (str) {
  let res = "";
  for (let i of str) {
    i = i.charCodeAt(i);
    i **= 3;
    res += i.toString(16);
  }
  return res.substring(0, 6);
}
const select = function (e) {
  let dom = e.target;
  if (typeof lastDom.value.style !== 'undefined') lastDom.value.style.backgroundColor = '';
  let tag = dom.getAttribute("tag");
  dom.style.backgroundColor = `#${toHashColor(tag)}`;
  lastDom.value = dom;
  pageList.value = map.get(tag);
  currTag.value = tag;
}
</script>

<style>
.BlogTags {
  text-align: justify;
}

.BlogTags .tag-item {
  background: grey;
  margin: 1px;
  display: inline-block;
  user-select: none;
}

#title-tag {
  margin-top: var(--dlyu-title-size);
  margin-bottom: var(--dlyu-title-size);
  height: var(--dlyu-title-size);
  line-height: var(--dlyu-title-size);
  font-size: var(--dlyu-title-size);
}
</style>