import {readFileSync} from 'fs';
import {join} from 'path';


const pkg = JSON.parse(
    readFileSync(join(__dirname, 'package.json'), 'utf-8')
);

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            build: {
                version: pkg.dependencies['nuxt'] || 'unknown',
                time: new Date().toISOString(),
                commit: import.meta.env.GIT_COMMIT
            }
        }
    },
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css', 'katex/dist/katex.min.css'],
    // 禁用 NuxtUI 的字体配置，抑制字体无法下载错误
    ui: {
        fonts: false,
    },
    app: {
        head: {
            title: "α",
            titleTemplate: "%s | Méng"
        },
    },
    content: {
        build: {
            markdown: {
                highlight: false,
                remarkPlugins: {
                    'remark-math': {}
                },
                rehypePlugins: {
                    'rehype-katex': {}
                }
            }
        }
    },
    modules: [
        '@nuxt/content',
        '@nuxt/eslint',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/ui',
        '@nuxtjs/tailwindcss',
    ],
})