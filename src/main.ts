import { createApp } from "vue";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "./styles/index.scss";
import router from "./router/index";
import store from "./store/index";

import hljs from "highlight.js"; //导入代码高亮文件
import "highlight.js/styles/monokai-sublime.css"; //导入代码高亮样式

import * as Icons from "@element-plus/icons-vue";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { locale });

//自定义一个代码高亮指令
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});

// 注册Icons 全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});

app.mount("#app");
