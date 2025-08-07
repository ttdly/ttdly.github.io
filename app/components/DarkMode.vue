<script lang="ts" setup>
const isDarkMode = ref<boolean>(false);

const changeMode = function (event: MouseEvent) {
  isDarkMode.value = !isDarkMode.value;
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
  )
  document.documentElement.style.setProperty('--x', x + 'px')
  document.documentElement.style.setProperty('--y', y + 'px')
  document.documentElement.style.setProperty('--r', endRadius + 'px')
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
    })
    return
  }
  document.documentElement.classList.toggle('dark')
}


onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
})

</script>

<template>
  <div class="flex items-center" @click="changeMode">
    <UIcon v-if="isDarkMode" name="i-iconamoon-mode-light" size="1.25rem"/>
    <UIcon v-else name="i-iconamoon-mode-dark" size="1.25rem"/>
  </div>
</template>

<style>
root {
  --x: 0;
  --y: 0;
  --r: 0;
}

::view-transition-old(*) {
  animation: none;
}

::view-transition-new(*) {
  animation: clip .5s ease-in;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

html.dark::view-transition-old(*) {
  animation: clip .5s ease-in reverse;
}

html.dark::view-transition-new(*) {
  animation: none;
}

html.dark::view-transition-old(root) {
  z-index: 9999;
}

html.dark::view-transition-new(root) {
  z-index: 1;
}

@keyframes clip {
  from {
    clip-path: circle(0% at var(--x) var(--y));
  }
  to {
    clip-path: circle(var(--r) at var(--x) var(--y));
  }
}
</style>