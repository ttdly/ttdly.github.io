<script lang="ts" setup>
const {data: essays} = await useAsyncData('essays',
    () => queryCollection('essays')
        .where("locked", "=", false)
        .order("create_at", "DESC")
        .all()
);
useHead({
  title: "SuíBǐ"
})

definePageMeta({
  layout: "common"
})
</script>

<template>
  <NuxtLayout>
    <div v-for="(essay, index) in essays" :key="index" class="mb-10">
      <h1 class="text-xl font-bold text-center">{{ essay.title }}</h1>
      <ContentRenderer :value="essay" class="essay mt-8 text-l"/>
      <div class="text-gray-400 text-sm text-right">edit at
        <span v-if="essay.update_at">{{ essay.update_at.split("T")[0] }}</span>
        <span v-else>{{ essay.create_at.split("T")[0] }}</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>