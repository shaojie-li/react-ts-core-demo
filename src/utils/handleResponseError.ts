import { replace } from "connected-react-router";

import { app } from "react-ts-core";

/** 退出登录状态码 */
const LOGOUT_RETCODE = "2100105001";

interface ErrorHandler {
    [key: string]: () => void;
}

interface ErrorMessage {
    [key: string]: string;
}

// TODO: 根据异常代码retcode，做相应的处理，抛给业务层处理
const errorMapping: ErrorHandler = {
    /** 退出登录状态 */
    [LOGOUT_RETCODE]: () => {
        app.store.dispatch(replace("/login"));
    },
};

/** 定制化异常状态对应的提示消息文案 */
export const errorMessageMapping: ErrorMessage = {};

/** 对具体业务内的特定请求错误做处理，此文件可根据具体项目设计做更改 */
export function handleResponseError(retcode: string) {
    if (retcode === "0") {
        return;
    }
    errorMapping[retcode] && errorMapping[retcode]();
}
