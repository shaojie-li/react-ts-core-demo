import { GlobalUtils } from "./Global";

/**
 * 处理json对象的工具函数
 */
export class ObjectUtils {
    /** 从目标对象（第一个参数）中筛选数组（第二个参数）中包含的属性 */
    static pick<T extends { [key: string]: any }, K extends keyof T>(target: T, pickNames: K[]): Pick<T, K> {
        const valuesIsObject = GlobalUtils.isObject(target);
        const pickNamesIsArray = GlobalUtils.isArray(pickNames);
        const result: any = {};

        if (valuesIsObject && pickNamesIsArray) {
            pickNames.forEach(v => {
                if (v in target) {
                    result[v] = target[v];
                }
            });
        }
        return result;
    }
}
