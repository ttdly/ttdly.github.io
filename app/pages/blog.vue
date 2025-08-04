<template>
  <NuxtLayout>
    <div class="flex gap-2 transition-all duration-100">
      <span
          v-for="(label, index) in labels" :key="index"
          class="inline-block py-0.5 px-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500"
      >{{ label }}</span>
    </div>
    <div class="text-sm flex justify-between mt-8 text-gray-300">
      <span>创建于</span>
      <span>更新于</span>
    </div>
    <div
        v-for="(article, index) in articles" :key="index"
        class="pt-5 border-b-[1px] border-b-transparent border-dashed hover:border-b-gray-400 ">
      <NuxtLink :to="article.path">
        <div class="text-xl">{{ article.title }}</div>
        <div v-if="article.labels.length > 0" class="text-sm text-gray-400">
          <template v-for="label in article.labels" :key="label">
            <span># {{ label }}</span>
          </template>
        </div>
        <div class="text-sm flex justify-between">
          <span>{{ article.create.split("T")[0] }}</span>
          <span v-if="article.update">{{ article.update.split("T")[0] }}</span>
        </div>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const {data: articles} = await useAsyncData('blog',
    () => queryCollection('articles')
        .where("locked", "=", false)
        .order("create", "DESC")
        .all()
);
const labels = [...new Set(
    articles.value?.map(article_data => article_data.labels).flat()
)]
// console.log(articles.value);
useHead({
  title: "BóKè"
})

definePageMeta({
  layout: "common"
})
</script>
