<template>
  <div>
    <site-nav/>
    <div class="max-w-3xl m-auto mt-30 cursor-default">
      <slot/>
    </div>
    <div id="foot" class="mb-4 mt-6">
      <USeparator class="py-3" icon="Logo"/>
      <div class=" max-w-3xl mx-auto flex items-center gap-1.5">
        <div class="text-sm">
          © 2023-2025 ttdly.
          <a class="underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
        </div>
        <span>nuxt {{ runtime.public.build.version.replace("^", "") }}</span>
        <a :href="commitLink" class="underline" target="_blank"> {{ runtime.public.build.commit }}</a>
      </div>
    </div>
    <back-to-top/>
  </div>
</template>

<script setup>
const runtime = useRuntimeConfig();
const commitLink = `https://github.com/ttdly/ttdly.github.io/commit/${runtime.public.build.commit}`

</script>