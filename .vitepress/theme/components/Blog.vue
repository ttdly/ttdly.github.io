<script setup lang="ts">
import {onContentUpdated, useData} from 'vitepress';
import {computed, type ComputedRef, onMounted, ref} from 'vue';
import {DateFormatType, handelRawDate} from '../util/date.js';
import Discuss from './icons/Discuss.vue';
import ToTop from "./icons/ToTop.vue";

type PageData = {
  create: string | Boolean;
  labels: Array<string> | Boolean;
  title: string | Boolean;
  update: string | Boolean;
  comments: string | Boolean;
  [key: string]: any;
};

function _throttle (fn:Function, wait: number) {
  let last: number, timer: number,now: number;
  return function() {
    now = Date.now();
    if (last && now - last < wait) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.call(this, ...arguments);
      }, wait);
    } else {
      last = now;
      fn.call(this, ...arguments);
    }
  };
}

const showToTop = ref<boolean>(false)

onMounted(() => {
  window.addEventListener("scroll",
    _throttle(() => {
      if(document.documentElement.scrollTop > 300){
         if (!showToTop.value) showToTop.value = true
      } else {
        if (showToTop.value) showToTop.value = false
      }
    },1000)
  )
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
const toTop = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  showToTop.value = false;
}

const headers = ref();
onContentUpdated(()=>{
  headers.value = [
    ...document.querySelectorAll('.markdown :where(h2,h3)')
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        title: serializeHeader(el),
        link: '#' + el.id,
        level
      }
    })
  console.log(headers.value)
})


function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge') ||
        (node as Element).classList.contains('header-anchor')
      ) {
        continue
      }
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

const {frontmatter, site} = useData();
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
    comments: false
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
            <li><a :href="link.link">{{link.text}}</a></li>
          </template>
        </ul>
      </div>
      <div class="blog-info">
        <h1 v-if="postInfo.title">{{postInfo.title}}</h1>
        <div class="blog-statistic">
          <span v-if="postInfo.create">{{
              handelRawDate(postInfo.create, DateFormatType.Dot)
            }}</span>
          <span v-if="postInfo.comments">
            <Discuss class="icon"/> {{postInfo.comments}}
          </span>
        </div>
      </div>
    </div>
    <Content class="markdown slide-enter-content"/>
    <p v-if="postInfo.update" class="blog-update">
      本文最后更新于 {{handelRawDate(postInfo.update, DateFormatType.Ago)}}
    </p>
    <p class="label-links">
      <template v-if="postInfo.labels" v-for="label in postInfo.labels">
        <a class="label-link" :href="`/pages/${label}`">{{label}}</a>
      </template>
    </p>
    <p class="copyright">
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">BY-NC-SA</a>
      <span>© {{handelRawDate(postInfo.create, DateFormatType.Dot).split(".")[0]}} {{title}}</span>
    </p>
  </div>
  <div class="to-top" v-if="showToTop" @click="toTop">
    <ToTop/>
  </div>
</template>

<style scoped>
.posts {
  padding: 0 10px;
}

.to-top {
  height: 3rem;
  width: 3rem;
  border-radius: 1.5rem;
  border: 1px solid;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blog-update {
  font-size: 0.9em;
  text-align: end;
  margin: 0;
  color: var(--c-text-low-level);
}

.blog-head {
  height: 15rem;
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
  font-weight: 400;
  color: var(--c-text-title);
}

.blog-head ul{
  list-style: none;
  display: flex;
  justify-content: end;
  gap: 2ch;
}

.blog-head a{
  text-decoration: underline;
}

.blog-head a:hover{
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
  padding: 1ch;
  border-radius: 10px;
  margin-right: 0.4rem;
  background-color: var(--c-bg-code-inline);
  transition: all .4s;
}

.label-link:hover {
  color: #fff;
  background-color: var(--c-bg-code);
}

.blog-statistic span {
  font-size: 0.6rem;
  display: inline-block;
  margin-right: 2rem;
}

.icon {
  vertical-align: sub;
}

.copyright a {
  margin-right: 1ch;
  text-decoration: underline;
  padding-bottom: 2ch;
}

@media (min-width: 640px) {
  body .blog-head {
    height: 12rem;
  }

  body .blog-head h1 {
    font-weight: 600;
  }

  .posts {
    padding: 0;
  }
}
</style>
