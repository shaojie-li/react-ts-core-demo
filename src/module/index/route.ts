import { RouterConfig } from "module/routerConfig";

export const routerConfig: RouterConfig = {
    name: "首页",
    path: "index",
    fileName: "index",
    breadcrumbConfig: [{ name: "首页" }],
    iconClassName: "icon-51",
    sort: 1,
    permission: true,
    customChildren: [
        {
            name: "withSearch",
            path: "index/with_search",
            fileName: "index/withSearch",
            breadcrumbConfig: [{ name: "首页", path: "/index" }, { name: "withSearch" }],
        },
    ],
};
