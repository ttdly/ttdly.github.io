import { defineConfigWithTheme } from 'vitepress';
import { PokeTheme } from './theme';

export default defineConfigWithTheme<PokeTheme.Config>({
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  title: '秃头灯笼鱼',
  titleTemplate: false,
  markdown: {
    math: true,
    theme: 'one-dark-pro',
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '日志', link: '/post-list.html' },
    ],
    socialLink: [{ icon: 'github', link: 'https://github.com/ttdly' }],
  },
  head: [['link', { rel: 'shortcut icon', href: '/logo.svg' }]],
  // sitemap:{
  //   hostname: 'https://blog.152527.xyz',
  //   lastmodDateOnly: true
  // }
});
