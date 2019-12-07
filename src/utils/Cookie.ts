/**
 * Cookie操作
 */
export class CookieUtils {
    /** 设置cookie，days参数单位为：天 */
    static setCookie(name: string, value: any, days: number = 0, domain: string = document.domain) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `;expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value}${expires};path=/;domain=${domain}`;
    }

    /** 获取cookie */
    static getCookie(name: string) {
        const cookies = document.cookie.replace(/\s/g, "").split(";");
        const filterCookie = cookies.filter((v, i) => {
            const item = v.split("=");
            return item[0] === name;
        });
        const result = filterCookie.join("").split("=")[1];
        return result;
    }

    /** 删除cookie */
    static removeCookie(name: string, domain?: string) {
        const toBeDeleteCookie = this.getCookie(name);
        if (toBeDeleteCookie) {
            document.cookie = `${name}=;${domain ? `domain=${domain};` : ""}expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        }
    }
}
