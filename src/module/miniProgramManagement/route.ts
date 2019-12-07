import { RouterConfig } from "module/routerConfig";

export const routerConfig: RouterConfig = {
    name: "小程序管理",
    iconClassName: "icon-houtaishezhi",
    sort: 2,
    permission: true,
    children: [
        {
            name: "业务管理",
            path: "biz_management",
            fileName: "miniProgramManagement/bizManagement",
            permission: true,
            breadcrumbConfig: [
                {
                    name: "小程序管理",
                },
                {
                    name: "业务管理",
                },
            ],
            customChildren: [
                {
                    name: "草稿箱",
                    path: "biz_management/draft",
                    fileName: "miniProgramManagement/bizManagementDraft",
                    permission: true,
                    breadcrumbConfig: [
                        {
                            name: "小程序管理",
                        },
                        {
                            name: "业务管理",
                            path: "/biz_management",
                        },
                        {
                            name: "草稿箱",
                        },
                    ],
                },
            ],
        },
        {
            name: "发布管理",
            path: "release_management",
            fileName: "miniProgramManagement/bizManagementDraft",
            permission: true,
            breadcrumbConfig: [
                {
                    name: "小程序管理",
                },
                {
                    name: "发布管理",
                },
            ],
        },
    ],
};
