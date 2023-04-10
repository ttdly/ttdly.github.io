<template>
  <div class="main">
    <div class="nav">
      <NavMenu />
    </div>
    <div class="pe-nav" ref="peNav">
      <div class="nav-show">
        <div class="nav-control" @click="(event) => controlPeNav(event)"></div>
      </div>
      <NavMenu />
    </div>
    <div class="content">
      <div style="font-size: 1.5rem; margin-bottom: 0.5rem">
        {{ info.title }}
      </div>
      <li class="content-time">
        <template v-if="info.create">
          创建：{{ `${new Date(info.create).toLocaleDateString()}` }}
        </template>
        <template v-if="info.update">
          <br />
          更新：{{ `${new Date(info.update).toLocaleDateString()}` }}
        </template>
      </li>
      <Content class="markdown-body" />
      <div class="info">
        <template v-if="info.labels">
          <li class="label-link">
            上传在：
            <template v-for="label in info.labels">
              <a :href="`/pages/${label}`">{{ label }}</a>
            </template>
             中
          </li>
        </template>
        <li>
          本作品采用<a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a
          >进行许可。
        </li>
        <li>
          <a target="_blank" href="https://github.com/ttdly">@秃头灯笼鱼</a>
          2023
        </li>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavMenu from "./NavMenu.vue";
import { computed, ref } from "vue";
import { useData } from "vitepress";

const peNav = ref(null);
let peNavState = false;
const info = computed(() => {
  let { frontmatter } = useData();
  const result = {
    title: false,
    create: false,
    update: false,
    labels: false,
  };
  for (const i in frontmatter.value) {
    result[i] = frontmatter.value[i];
  }
  return result;
});

function controlPeNav(event) {
  if (!peNavState) {
    peNav.value.style.height = "100vh";
    event.target.style.transform = "rotate(45deg)";
  } else {
    peNav.value.style.height = "var(--pe-nav-height)";
    event.target.style.transform = "rotate(0deg)";
  }
  peNavState = !peNavState;
}
</script>
<style></style>
