<script setup lang="ts">

import {ref} from "vue";
import {onContentUpdated} from "vitepress";

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

</script>

<template>

  <ul>
    <li class="title">目录</li>
    <template v-for="header in headers">
      <li :style="`margin-left:${(header.level-2)}rem`"><a :href="header.link">{{header.title}}</a></li>
    </template>
  </ul>
</template>

<style scoped>
.title{
  font-weight: bold;
  cursor: default;
}

ul{
  padding: 10px;
  float: right;
  position: fixed;
  top: 4rem;
  right: 1rem;
}

li{
  margin: 0;
  font-size: small;
}

a{
  transition: color .45s;
}

a:hover{
  color: var(--c-text-link);
}
</style>