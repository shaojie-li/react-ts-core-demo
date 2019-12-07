import { LoginAjaxResponse } from "type/api";
import { RouterConfig } from "module/routerConfig";

export interface State {
    isLogin: boolean;
    loginData: LoginAjaxResponse;
    currentRouter: RouterConfig;
    flatRouterConfig: RouterConfig[];
    collapsed: boolean;
}
