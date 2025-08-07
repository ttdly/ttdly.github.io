<template>
  <!--  <button-->
  <!--      v-show="visible"-->
  <!--      @click="scrollToTop"-->
  <!--      class="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-md bg-gray-800 text-white hover:bg-gray-700 transition"-->
  <!--      aria-label="Back to top"-->
  <!--  >-->
  <!--    ↑-->
  <!--  </button>-->
  <UIcon v-show="visible" class="fixed bottom-6 right-6 z-50 text-default" name="i-iconamoon-arrow-up-5-circle-duotone"
         size="2rem" @click="scrollToTop"/>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'

const visible = ref(false)

const toggleVisible = () => {
  visible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisible)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisible)
})
</script>
