
import {defineConfig} from 'vitepress'

export default defineConfig({
  ignoreDeadLinks: true,
  lang:'zh-CN',
  titleTemplate:false,
  markdown:{
    theme: 'vitesse-dark'
  },
  themeConfig:{
    repoUrl: 'https://github.com/ttdly/ttdly.github.io/'
  }
})