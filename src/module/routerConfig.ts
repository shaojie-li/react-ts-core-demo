export type RouterChildren = Array<{
    /** 当前模块的命名 */
    name: string;
    /** 路由url */
    path?: string;
    /** 面包屑配置 */
    breadcrumbConfig: Array<{
        /** 面包屑对应的名称 */
        name: string;
        /** 面包屑对应的url */
        path?: string;
    }>;
    /** 存放当前模块的文件夹名称 */
    fileName?: string;
    /** 子路由配置 */
    children?: RouterChildren;
    /** 是否有访问权限 */
    permission?: boolean;
    /** 自定义路由配置，主要应用在，在父级页面中跳转的场景（内页），不用显示在侧边导航栏 */
    customChildren?: RouterChildren;
}>;

export interface RouterConfig {
    /** 当前模块的命名 */
    name: string;
    /** 当前父级路由模块在左侧导航栏的排序，按升序从上之下排列 */
    sort?: number;
    /** 面包屑配置 */
    breadcrumbConfig?: Array<{
        /** 面包屑对应的名称 */
        name: string;
        /** 面包屑对应的url */
        path?: string;
    }>;
    /** 图标类名，打开 assets/styles/iconfont/demo_index.html 文件，里面有对应图标的类名 - 团队协作，请统一使用阿里的iconfont管理图标库 */
    iconClassName?: string;
    /** 路由url */
    path?: string;
    /** 存放当前模块的文件夹名称 */
    fileName?: string;
    /** 子路由配置 */
    children?: RouterChildren;
    /** 自定义路由配置，主要应用在，在父级页面中跳转的场景（内页），不用显示在侧边导航栏 */
    customChildren?: RouterChildren;
    /** 路由指向的需要渲染的组件 */
    component?: React.ComponentType;
    /** 是否有访问权限 */
    permission?: boolean;
}

interface ContextRouterConfig {
    routerConfig: RouterConfig;
}

const requireRouteConfig = [] as RouterConfig[];

// 用webpack提供的require.context方法，将所有模块下的route.ts文件的路由配置全部引入进来
const route = require.context("../module", true, /route\.ts$/);

// 获取各个父级模块路由的配置汇总
const requireAllRoute = (context: __WebpackModuleApi.RequireContext) => context.keys().map(context);

requireAllRoute(route).forEach((route: ContextRouterConfig) => {
    requireRouteConfig.push(route.routerConfig);
});

export const routerConfig = requireRouteConfig.sort((a, b) => a.sort - b.sort);
