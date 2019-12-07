/**
 * 处理数组的工具函数
 */
export class ArrayUtils {
    /** 将多维数组扁平化 [1, [2, 3]] -> [1, 2, 3] */
    static flat(target: any[]): number[] {
        return target
            .toString()
            .split(",")
            .map(item => +item);
    }

    /** 将数组的顺序打乱 */
    static randomArray<T>(target: T[]): T[] {
        return target.sort(() => Math.random() - 0.5);
    }

    /** 基本类型数组去重，含null */
    static uniqueArray<T extends string | number | boolean>(target: T[]) {
        return Array.from(new Set(target));
    }

    /** json对象数组去重 */
    static uniqueJsonArray<T extends { [key: string]: any }>(target: T[]) {
        const obj = {};
        return target.reduce((item, next) => {
            !obj[next.key] && (obj[next.key] = true && item.push(next));
            return item;
        }, []);
    }
}
