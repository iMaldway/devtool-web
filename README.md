# devtool-web Vue3版

#### 介绍
代码生成平台Web站点--Vue3 + TypeScript 重构版。

采用Vue3 + TypeScript + element-plus 重构!

此软件采用EJS作为模板引擎，用于渲染自定义的模板以输出目标文件，在架构成熟的项目中可节省掉重复性的代码编写，可按照具体需求定制特殊的生成。
当然如果你想生成一些别的东西也是可以的，此软件使用了Puppeteer模拟浏览器对指定网站获取指定数据。
此软件不受限于UI，可使用自定义业务组件、可在模板中使用JS相关语法。

#### 软件架构
采用Vue3 、 TypeScript 、 element-plus、vue-codemirror等


#### 安装教程

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

