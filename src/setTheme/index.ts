import themeConfig from "./config";

/**
 * 设置主题色
 *
 * 通过 hostname 指向对应文件夹下的 theme.ts 配色文件
 *
 * 不同 hostname 对应的文件夹名称在 config.ts 配置
 *
 * 手动更换主题，需要设置 name
 */
export function setTheme(name?: string) {
    const defaultTheme = "DEFAULT";
    const hostname = window.location.hostname || "";
    const themePath = name || themeConfig[hostname] || defaultTheme;
    const curTheme = require(`./${themePath}/theme.ts`).default;

    window.less
        .modifyVars(curTheme)
        .then(() => {
            console.info("theme：success");
        })
        .catch(error => {
            console.error("theme：", error);
        });
}
