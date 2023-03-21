<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import BlogNav from './BlogNav.vue'
import BlogTop from './BlogTop.vue'
import BlogTags from './BlogTags.vue'
import BlogFoot from './BlogFoot.vue'
import BlogArchived from './BlogArchived.vue'
const route = useRoute()
const {frontmatter} = useData()

const pageName = computed(() =>
  route.path.replace(/[./]+/g, '_').replace(/_html$/, '')
)
</script>

<template>
  <div class="VPDoc">
    <BlogNav/>
    <div class="container">
      <div class="content">
        <div class="content-container">
          <BlogTop/>
          <main class="main">
            <BlogArchived v-if="frontmatter.page === 'archive'"/>
            <BlogTags v-else-if="frontmatter.page === 'tags'"/>
            <Content v-else class="vp-doc" :class="pageName" />
          </main>
        </div>
        <BlogFoot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.VPDoc {
  width: 100%;
  overflow-x: hidden;
}


.container {
  margin: 0 auto;
  width: 100%;
  background: #fcfcfa;
  border: solid 1px #e2e0d8;
  border-top: none;
  border-bottom: none;
  min-height: calc(100vh - 6rem);
}


.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}



.content-container {
  margin: 0 auto;
}

.VPDoc.has-aside .content-container {
  max-width: 688px;
}


</style>
