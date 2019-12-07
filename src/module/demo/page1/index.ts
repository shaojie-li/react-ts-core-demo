import { SagaIterator } from "redux-saga";

import { Module, register, Lifecycle, Interval } from "react-ts-core";
import Page1Component from "./components/Main";
import { State } from "./type";

const initialState: State = {
    city: {},
    merchantList: null,
};

class ActionHandler extends Module<State> {
    // 模块初始化调用 属于Listener的实现
    @Lifecycle()
    *onRender(): SagaIterator {
        console.info("page1 onInitialized");
    }

    // 路由变化调用 属于Listener的实现
    *onRegister(): SagaIterator {
        if (location.pathname === "/page1") {
            console.info("page1 pathname", location.pathname);
        }
    }

    // 循环执行 @Interval(seconds: number) 代表执行间隔  属于Listener的实现
    @Lifecycle()
    @Interval(3)
    *onTick(): SagaIterator {
        console.info("onTick -- 间隔3秒执行");
    }

    *getMerchantList() {
        console.info(213);
    }
}

const module = register(new ActionHandler("page1", initialState));
const Page1 = module.attachLifecycle(Page1Component, { retainStateOnLeave: true });
const actions = module.getActions();
export { actions };
export default Page1;
