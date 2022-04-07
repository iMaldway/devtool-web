import { createApp } from "vue";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "./styles/index.scss";
import router from "./router/index";
import store from "./store/index";

import * as Icons from "@element-plus/icons-vue";

import App from "./App.vue";

/**
 * 自定义指令
 */
import adaptive from "./directive/adaptive";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, { locale });

app.directive("adaptive", adaptive);

// 注册Icons 全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});

app.mount("#app");
