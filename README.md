<p align="center">
  <spen style="font-size: 34px;color:#0969da;">Devtool Web</spen>
</p>
<p align="center">一个代码生成平台的web站点</p>
------------

#### 介绍

- 💪 [Vue3](https://v3.cn.vuejs.org/ "Vue3")组合 API
- 🔥 使用[TypeScript](https://www.tslang.cn/index.html "TypeScript")编写
- ❤️ [Element Plus UI](https://element-plus.gitee.io/ "Element Plus UI")
- 💛 [EJS](https://ejs.bootcss.com/ "EJS")模板引擎
- 🕸️ [Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/ "Puppeteer")数据爬取
- 🐛  [vue-codemirror](https://github.com/surmon-china/vue-codemirror "vue-codemirror")模板编辑

采用Vue3 + TypeScript + element-plus 构建🤓

采用EJS作为模板引擎，用于渲染自定义的模板以输出目标文件，在架构成熟的项目中可节省掉重复性的代码编写，可按照具体需求定制特殊的生成。
当然如果你想生成一些别的东西也是可以的，此软件使用了Puppeteer模拟浏览器对指定网站获取指定数据。
此软件不受限于UI，可使用自定义业务组件、可在模板中使用JS相关语法。


#### 使用教程

```
npm install
```

```
npm run serve
```

```
npm run build
```
#### 使用说明
1. 补充数据库信息
在数据库信息中添加数据库信息。用于连接指定数据库进行数据访问。
2. 设置生成配置
该模块中模块名称与表前缀将影响后续模板中的数据源。
3. 配置模板
设置模板并添加模板文件。在模板文件中有列出在模板中可用的数据源，数据源的数据类型以及用途都有做说明。
4. 代码生成
选择一个连接点-->选择连接点下某一个数据库-->选择数据库下某一个表-->选择对应的配置与模板-->生成代码。

