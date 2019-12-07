import { SagaIterator } from "redux-saga";
import { put } from "redux-saga/effects";
import { go } from "connected-react-router";
import { Module, register, call, Loading } from "react-ts-core";

import { routerConfig, RouterConfig } from "module/routerConfig";
import { GlobalUtils } from "utils/Global";
import MainComponent from "./components/Main";
import LoginAJAXService from "service/LoginAJAXService";
import { LoginAjaxRequest } from "type/api";
import { State } from "./type";
import { CookieUtils } from "utils/Cookie";

const C_AUTHID = CookieUtils.getCookie("C_AUTHID");

const flatRouterConfigWithChildren = GlobalUtils.flatComplexData(routerConfig, "children");

const flatRouterConfigWithCustomChildren = GlobalUtils.flatComplexData(flatRouterConfigWithChildren, "customChildren");

const flatRouterConfig = flatRouterConfigWithCustomChildren.filter(config => config.path);

const initialState: State = {
    isLogin: !!C_AUTHID,
    loginData: {
        userInfo: {
            user_name: "",
            phone_number: "",
            gender: "",
        },
    },
    currentRouter: null,
    flatRouterConfig,
    collapsed: false,
};

class ActionHandler extends Module<State, {}, {}> {
    /** 登陆操作 */
    @Loading("login")
    *login(params: LoginAjaxRequest): SagaIterator {
        const effect = call(LoginAJAXService.login, params);
        yield effect;
        const loginData = effect.result();

        this.setState({
            loginData,
        });
        if (loginData.retcode !== "0") {
            return;
        }
        this.setState({
            isLogin: true,
        });
        CookieUtils.setCookie("C_AUTHID", loginData.C_AUTHID, 100);
        CookieUtils.setCookie("mobile", loginData.userInfo.phone_number, 100);
        this.setHistory("/", false);
    }

    /** 退出登陆操作 */
    *logout() {
        CookieUtils.removeCookie("C_AUTHID");
        this.setHistory("/login", false);
        this.setState({ isLogin: false });
    }

    /** 返回上一个路由 */
    *goBack() {
        yield put(go(-1));
    }

    /** 设置当前路由对应的路由配置 */
    *setRouterConfig(config: RouterConfig) {
        this.setState({ currentRouter: config });
    }
}

const module = register(new ActionHandler("main", initialState));
const Main = module.attachLifecycle(MainComponent);
const actions = module.getActions();

export { actions, Main };
export default Main;
