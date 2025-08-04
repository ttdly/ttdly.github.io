<template>
  <div>
    <site-nav/>
    <div class="max-w-3xl m-auto mt-30 cursor-default">
      <slot/>
    </div>
    <div id="foot" class="mb-4 mt-6">
      <USeparator class="py-3" icon="Logo"/>
      <div class=" max-w-3xl mx-auto flex justify-between items-center">
        <div class="text-sm">
          © 2023-2025 ttdly.
          <a class="underline" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
        </div>
        <!--        <a href="#" target="_blank">-->
        <!--          <UIcon class="text-2xl" name="i-streamline-logos:github-logo-2-block"/>-->
        <!--        </a>-->
      </div>
    </div>
  </div>
</template>

<script setup>

</script>