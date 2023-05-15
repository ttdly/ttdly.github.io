<script setup lang="ts">
import { computed } from 'vue';
import type { PokeTheme } from '../../../theme.js';
import { socialIcon } from '../../util/icon.js';

const props = defineProps<{
  icon: PokeTheme.SocialLinkIcon;
  link: string;
}>();

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg;
  return socialIcon[props.icon];
});
</script>

<template>
  <a :href="props.link" v-html="svg" target="_blank" class="social-icon"></a>
</template>

<style scoped>
.social-icon,
.social-icon > :deep(svg) {
  height: 1rem;
  width: 1rem;
}
</style>
