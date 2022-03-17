import { createRouter, createWebHashHistory } from "vue-router";

const Layout = () => import("../layout/Index.vue");

const routes = [
  {
    path: "/devtool/Database",
    component: Layout,
    redirect: "/devtool/Database/index",
    name: "devtoolDatabase",
    children: [
      {
        path: "index",
        component: () => import("@/views/devtool/Database/index.vue"),
        name: "Database",
        meta: {
          title: "数据库信息",
          icon: "Coin",
          noCache: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/devtool/GeneratorConfig",
    component: Layout,
    redirect: "/devtool/GeneratorConfig/index",
    name: "devtoolGeneratorConfig",
    children: [
      {
        path: "index",
        component: () => import("@/views/devtool/GeneratorConfig/index.vue"),
        name: "GeneratorConfig",
        meta: {
          title: "生成配置",
          icon: "Cpu",
          noCache: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/devtool/Template",
    component: Layout,
    redirect: "/devtool/Template/index",
    name: "devtoolTemplate",
    meta: {
      title: "模板管理",
      icon: "CopyDocument",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/devtool/Template/index.vue"),
        name: "Template",
        meta: {
          title: "模板配置",
          icon: "DocumentCopy",
          noCache: true,
          affix: true,
        },
      },
      {
        path: "file",
        component: () =>
          import("@/views/devtool/Template/components/TemplateFile.vue"),
        name: "TemplateFile",
        hidden: true,
        meta: {
          title: "代码模板",
          icon: "DocumentChecked",
          noCache: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/devtool/Analysis",
    component: Layout,
    redirect: "/devtool/Analysis/index",
    name: "devtoolAnalysis",
    children: [
      {
        path: "index",
        component: () => import("@/views/devtool/Analysis/index.vue"),
        name: "devtoolAnalysisIndex",
        meta: {
          title: "分析配置",
          icon: "DataAnalysis",
          noCache: true,
          affix: true,
        },
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
