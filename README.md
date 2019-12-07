## 1，项目命令行介绍

`yarn install | npm install` 安装项目依赖  
`yarn start | npm start` 启动项目  
`yarn tslint-check | npm run tslint-check` 项目类型检查  
`yarn build | npm build` 项目打包  
`yarn format | npm run format` 按 tslint 配置格式化项目代码

## 2，运行项目

1.在当前项目根路径执行 `yarn install`

2.在当前项目根路径执行 `yarn start`

## 3，demo 目录结构（业务开发）

```ts
|-- conf                            // 打包时用到的配置文件
|-- src                             // 项目源码根目录
    |-- assets                      // 全局的静态资源目录，可自行定义里面的资源存放结构
    |-- framework                   // 项目最核心的部分，底层实现，后期可考虑打包到npm
    |-- module                      // 业务代码存放目录，建议目录结构如下：
        |-- main                    // 顶层组件目录，全局的业务数据或布局等在这里实现
            |-- components          // 当前模块的视图层
                |-- [InnerComponent]// 当前模块下组件存放的文件夹，可多个，文件名根据实际组件类型定义
                |-- Main.tsx        // 全局主入口文件，路由，layout在此实现
                |-- index.less      // layout样式
            |-- index.ts            // 全局性的数据处理，逻辑操作
            |-- type.ts             // 当前模块的类型定义文件
        |-- page1                   // 普通业务模块
            |-- components          // 当前模块的视图层
                |-- [InnerComponent]// 当前模块下组件存放的文件夹，可多个，文件名根据实际组件类型定义
                |-- Main.tsx        // 当前模块的主入口文件
                |-- index.less
            |-- index.ts            // 负责当前模块主要业务逻辑实现，如redux数据操作，异步请求，路由事件等

            |-- type.ts             // 当前模块的类型定义文件
        ......
    |-- service                     // 各个模块的异步请求函数，也可以根据业务需要，放到各个模块文件下
    |-- type                        // 定义全局类型的目录
    |-- index.html                  // html模板
    |-- index.tsx                   // 项目入口文件
--|
|-- webpack                         // webpack打包逻辑文件夹
```
