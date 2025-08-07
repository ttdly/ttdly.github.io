<template>
  <NuxtLayout>
    <div class="flex gap-2 transition-all duration-100">
      <div
          v-for="(label, index) in labels" :key="index"
          class="py-0.5 px-2 rounded bg-gray-100 flex items-center align-baseline
          hover:bg-gray-200
          dark:bg-gray-700 dark:hover:bg-gray-500"
          @click="gotoTag(label)"
      ><span>{{ label }}</span>
        <UIcon v-if="route.query.label === label" class="mt-0.5" name="i-iconamoon-close"/>
      </div>
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

<script setup>
const route = useRoute();
const router = useRouter();

const label = computed(() => route.query.label);
const cacheKey = computed(() => `blog-${label.value || 'all'}`);

const articles = ref([]);
const labels = ref([]);

const queryData = async () => {
  let query = queryCollectionNavigation('articles', ['create', 'update', 'labels'])
      .where("locked", "=", false);

  if (label.value) {
    query = query.where("labels", "LIKE", `%${label.value}%`);
  }

  const {data} = await useAsyncData(cacheKey.value, () =>
      query.order("create", "DESC")
  );

  articles.value = data.value[0]?.children || [];
  labels.value = [...new Set(
      articles.value.map(article_data => article_data.labels).flat()
  )];
};

watch(label, () => queryData(), {immediate: true});


const gotoTag = (label) => {
  if (label === route.query.label) {
    router.push("/blog");
    return;
  }
  router.push({
    path: "/blog",
    query: {
      label: label,
    }
  });
}

useHead({
  title: "BóKè"
})

definePageMeta({
  layout: "common",
})
</script>
