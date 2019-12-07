import { AxiosResponse, Method } from "axios";

import { ajax, BizException } from "react-ts-core";
import { handleResponseError, errorMessageMapping } from "./handleResponseError";

/**
 * 全局的工具函数
 */
export class GlobalUtils {
    static async ajax<Request, Response>(method: Method, path: string, pathParams: object, request: Request): Promise<Response> {
        const response: AxiosResponse = await ajax.call(this.ajax, method, path, pathParams, request);
        if (response.data.retcode !== "0") {
            handleResponseError(response.data.retcode);
            throw new BizException(errorMessageMapping[response.data.retcode] || response.data.retmsg || response.data.errMsg || "未知的接口错误");
        }
        return response.data;
    }

    /**
     * 将树形结构的数据扁平化：将对象的指定后代属性提取到外层
     *
     * @example [{value: 1, children: [{value: 2}]] -> [{value: 1}, {value: 2}]
     */
    static flatComplexData<T, K extends string>(target: T[], attr: K): Array<Omit<T, K>> {
        const data = this.deepCloneUseJSON(target);
        const result = [];
        let queen = [];

        queen = queen.concat(data);
        while (queen.length) {
            const first = queen.shift();
            if (first[attr]) {
                queen = queen.concat(first[attr]);
                delete first[attr];
            }

            result.push(first);
        }

        return result;
    }

    /** 判断传入参数是否为数组 */
    static isArray<T>(target: T): boolean {
        return Object.prototype.toString.call(target) === "[object Array]";
    }

    /** 判断传入参数是否为object */
    static isObject<T>(target: T): boolean {
        return Object.prototype.toString.call(target) === "[object Object]";
    }

    /** 获取用于cookie的 domain welfare.dev.siemin.com/page1 -> .siemin.com */
    static getHostDomain() {
        const host = window.location.host;
        const hostSplit = host.split(".");
        return `.${hostSplit[hostSplit.length - 2]}.${hostSplit[hostSplit.length - 1]}`;
    }

    /** JSON方法深度拷贝，不适用于对象里面含函数或undefined的对象，相对递归性能好 */
    static deepCloneUseJSON<T>(target: T): T {
        return JSON.parse(JSON.stringify(target));
    }

    // TODO: 待完成
    /** 递归方法深度拷贝，处理一般对象请不要用这种发方法 */
    static deepCloneUseRecursive() {
        console.info("待完成");
    }

    /** 遍历数组或者json */
    static range<T>(target: object | T[]) {
        // TODO:参考go语言的range方法实现
    }

    /**
     * 深度递归搜索
     * @param {Array} arr 你要搜索的数组
     * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
     * @param {String} children 子数组的key
     */
    static deepFind(arr: any[], condition: (item: { [k: string]: any }, i: number, level: number) => boolean, children: string) {
        // 即将返回的数组
        const main = [];

        // 用try方案方便直接中止所有递归的程序
        try {
            // 开始轮询
            (function poll(arr, level) {
                // 如果传入非数组
                if (!Array.isArray(arr)) {
                    return;
                }

                // 遍历数组
                for (let i = 0; i < arr.length; i++) {
                    // 获取当前项
                    const item = arr[i];

                    // 先占位预设值
                    main[level] = item;

                    // 检验是否已经找到了
                    const isFind = (condition && condition(item, i, level)) || false;

                    // 如果已经找到了
                    if (isFind) {
                        // 直接抛出错误中断所有轮询
                        throw Error;

                        // 如果存在children，那么深入递归
                    } else if (children && item[children] && item[children].length) {
                        poll(item[children], level + 1);

                        // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
                    } else if (i === arr.length - 1) {
                        // 删除占位预设值
                        main.length = main.length - 1;
                    }
                }
            })(arr, 0);
            // 使用try/catch是为了中止所有轮询中的任务
        } catch (err) {
            console.error(err);
        }

        // 返回最终数组
        return main;
    }
}
