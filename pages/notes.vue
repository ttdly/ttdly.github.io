<script lang="ts" setup>
const {data: notes} = await useAsyncData('notes',
    () => queryCollection('notes')
        .where("locked", "=", false)
        .order("create_at", "DESC")
        .all()
);
useHead({
  title: "BǐJì"
})

definePageMeta({
  layout: "common"
})

const toggleContent = (e: MouseEvent) => {
  const dom = e.target as HTMLElement;
  const arrow = dom?.querySelector(".arrow");
  const content = dom?.querySelector(".content");
  if (content?.classList.contains("hidden")) {
    content?.classList.remove("hidden")
    arrow?.classList.add("down")
  } else {
    content?.classList.add("hidden")
    arrow?.classList.remove("down")
  }
}
</script>

<template>
  <NuxtLayout>
    <div
        v-for="(note, index) in notes" :key="index"
        class="border-[1px] border-gray-300 rounded px-4 py-2 mb-2"
        @click="toggleContent"
    >
      <div class="flex justify-between items-center pointer-events-none">
        <div class="">{{ note.title }}</div>
        <UIcon class="arrow transition-all duration-150" name="i-heroicons-chevron-right-16-solid"/>
      </div>
      <ContentRenderer
          :value="note"
          class="content bg-gray-50 border-[1px] border-gray-300 rounded p-2 text-sm mt-4 dark:bg-gray-950 hidden"/>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.down {
  transform: rotate(90deg);
}

.hidden {
  display: none;
}
</style>