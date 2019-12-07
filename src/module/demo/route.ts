import { RouterConfig } from "module/routerConfig";

export const routerConfig: RouterConfig = {
    name: "demo参考",
    iconClassName: "icon-moban",
    sort: 3,
    permission: true,
    children: [
        {
            name: "page1",
            fileName: "demo/page1",
            breadcrumbConfig: [{ name: "page1" }],
            permission: true,
            children: [
                {
                    name: "page",
                    path: "page",
                    fileName: "demo/page1",
                    permission: true,
                    breadcrumbConfig: [{ name: "page1" }, { name: "page" }],
                },
                {
                    name: "abc",
                    fileName: "demo/page1",
                    breadcrumbConfig: [{ name: "abc" }],
                    permission: true,
                    children: [
                        {
                            name: "bcd",
                            path: "bcd",
                            fileName: "demo/page1",
                            breadcrumbConfig: [{ name: "bcd" }],
                            permission: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "page2",
            path: "page2",
            fileName: "demo/page2",
            breadcrumbConfig: [{ name: "demo参考" }, { name: "page2" }],
            permission: true,
        },
        {
            name: "pageHooks",
            path: "page_hooks",
            fileName: "demo/pageHooks",
            breadcrumbConfig: [{ name: "pageHooks" }],
            permission: true,
        },
    ],
};
