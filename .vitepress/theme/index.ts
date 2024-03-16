// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import { type Theme } from 'vitepress';
const theme: Theme = {
  Layout,
};
export * from './util/date.js';
export * from './util/icon.js';
export default theme;
