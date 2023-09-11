import {defineConfigWithTheme} from 'vitepress'
import {PokeTheme} from "./theme";

export default defineConfigWithTheme<PokeTheme.Config>({
  ignoreDeadLinks: true,
  lang: 'zh-CN',
  title: 'tTdlyu',
  titleTemplate: false,
  markdown: {
    theme: 'one-dark-pro'
  },
  sitemap:{
    hostname:"https://blog.152527.xyz"
  },
  themeConfig: {
    nav: [
      {text: "Home", link: '/'},
      {text: "Posts", link: '/post-list.html'},
      {text: "Labels",link:"/pages/labels.html"}
    ],
    socialLink:[
      {icon:'github',link:'https://github.com/ttdly'}
    ]
  },
  head: [["link", {rel: "shortcut icon", href: "/logo.svg"}]]
})