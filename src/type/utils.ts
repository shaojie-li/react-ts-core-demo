export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare const tuple: <T extends string[]>(...args: T) => T;
export declare type Optional<F> = { [K in keyof F]?: F[K] };
export declare function Pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
