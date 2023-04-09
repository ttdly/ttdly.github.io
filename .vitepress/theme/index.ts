import Layout from "./Layout.vue";
import "uno.css";
import "./styles/style.css";
import "./styles/github.markdown.light.css"

export default {
  Layout: Layout,
  enhanceApp(ctx) {
    // register your custom global components
    // ctx.app.component('PageList', PageList)
  },
};
