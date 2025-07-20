<template>
  <div
      class="h-[22.25em] w-[36em] px-6 pt-4 pb-8 box-border cursor-default
      mb-[10vh] mt-[20vh] mx-auto">
    <!-- top -->
    <div id="base-info" class="flex justify-between gap-4">
      <!-- left -->
      <div class="">
        <UAvatar :src="'https://avatars.githubusercontent.com/u/108915955?v=4&size=64'" size="3xl"/>
      </div>
      <!-- right -->
      <div class="grow">
        <p>秃头灯笼鱼</p>
        <p class="opacity-70"><a href="https://github.com/ttdly">@ttdly</a>
        </p>

      </div>
    </div>
    <USeparator class="py-3"/>
    <!-- mid -->
    <div class="grow shrink-0" style="line-height: 1.8em;">
      <p>你好，这是我的个人网站</p>
      <p>我是一名编程以及开源爱好者</p>
      <p>C，C++，Java，Python，Rust，C# 以及 Web 编程均有过接触</p>
      <p>目前正在学习网络安全知识</p>
      <p>如果需要联系我，可以给我发送一封<a class="fat-link" href="mailto:ttdlyu@163.com">邮件</a></p>
      <p>网站目前有页面：
        <template v-for="(link, index) in appConfig.sitePage" :key="link">
          <NuxtLink :to="link.link" class="relative ">
            {{ link.title }}
          </NuxtLink>
          <span v-if="index < appConfig.sitePage.length - 1">|</span>
        </template>
      </p>

    </div>
    <!-- bottom -->
    <USeparator class="py-3" icon="Logo"/>
    <Copyright/>
    <div class="text-gray-300 h-5 overflow-hidden hover:h-30 transition-all">
      build info
      <div>build time {{ runtime.public.build.time.split("T")[0] }}.</div>
      <div>build version {{ runtime.public.build.commit }}.</div>
      <div>nuxt version {{ runtime.public.build.version.replace("^", "") }}.</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
const runtime = useRuntimeConfig();
const route = useRouter()
route.replace("/blog")

useHead({
  title: "å"
})

</script>

<style scoped>
@reference "../assets/css/main.css";
a {
  @apply hover:underline;
}

</style>