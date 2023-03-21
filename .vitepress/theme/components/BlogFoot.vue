<template>
  <div class="BlogFoot">
    <div class="space-line">
      <div v-if=" typeof frontmatter.page === 'undefined'" class="neighbor-container">
        <!-- <a href="javascript:history.back(-1)">&gt; cd ..</a><br> -->
        <!--      <a v-show="neighbor.prev" :href="neighbor.prev.url">cat {{ neighbor.prev.frontmatter.title }}.md</a><br>-->
        <!--      <a v-show="neighbor.next" :href="neighbor.next.url">cat {{ neighbor.next.frontmatter.title }}.md</a>-->
      </div>
<!--      这是线-->
      <span></span>
    </div>
    <ul class="foot-nav">
      <li class="foot-nav-item"><a href="/pages/archive.html">归档</a></li>
      <li class="foot-nav-item"><a href="/pages/tags.html">分类</a></li>
      <li class="foot-nav-item"><a href="/pages/about.html">关于</a></li>
      <li class="foot-nav-item"><a href="/pages/project.html">项目</a></li>
      <li class="foot-nav-item"><a href="/pages/links.html">链接</a></li>
      <li class="foot-nav-item"><a href="/pages/copyright.html">版权</a></li>
    </ul>
    <div class="licences">
      <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
        CC 4.0 BY-NC-SA
      </a>
      <span class="license-info">{{ yearInfo }}<a href="https://github.com/ttdly" target="_blank">@秃头灯笼鱼</a></span>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { computed } from "vue";

const startYear = 2023;
const { frontmatter } = useData();
const nowYear = new Date().getFullYear();
const neighbor = computed(()=>{
  const index = Number.parseInt( localStorage.getItem("index") ),
        posts = JSON.parse( localStorage.getItem("posts") );
  console.log(posts)
  return {
    prev: (typeof posts[index - 1] === 'undefined') ? false : posts[index - 1],
    next: (typeof posts[index + 1] === 'undefined') ? false : posts[index + 1]
  }
})

// 版权时间信息
let yearInfo = "";
if ( nowYear > startYear) {
  yearInfo = `${startYear}-${nowYear}`;
} else {
  yearInfo = `${startYear}`;
}

// 上一篇下一篇
</script>
<style>
.BlogFoot{
  padding-bottom: 3rem;
}

.BlogFoot .foot-nav{
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-3);
  font-size: .8rem;
}
.BlogFoot .foot-nav .foot-nav-item:hover{
  color: #005cfc;
}
.BlogFoot .neighbor-container{
  padding-bottom: .5rem;
}

.BlogFoot .neighbor-container a{
  text-decoration: underline dotted var(--vp-c-text-3);
  transition: all .25s;
}

.BlogFoot .neighbor-container a:hover{
  text-decoration: underline dotted var(--vp-c-text-1);
}

.BlogFoot .space-line{
  padding-bottom: 1rem;
  padding-top: 4rem;
}

.BlogFoot .space-line span{
  display: block;
  height: 1px;
  background-color: var(--vp-c-text-3);
}

.BlogFoot .licences{
  font-size: .9rem;
  text-align: center;
  color: var(--vp-c-text-3);
  padding-top: 3rem;
}
</style>