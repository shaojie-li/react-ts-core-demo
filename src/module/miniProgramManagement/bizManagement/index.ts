import { SagaIterator } from "redux-saga";

import { Module, register, Lifecycle, call, Loading, Interval } from "react-ts-core";
import MiniProgramAjaxService from "service/MiniProgramAjaxService";
import { QueryBizInfoListAJAXRequest } from "type/api";
import BizManagementComponent from "./components/Main";
import { State } from "./type";

const initialState: State = {
    pageData: null,
};

class ActionHandler extends Module<State> {
    @Loading("queryBizInfoList")
    *queryBizInfoList(params?: QueryBizInfoListAJAXRequest): SagaIterator {
        const effect = call(MiniProgramAjaxService.queryBizInfoList, params);
        yield effect;
        const pageData = effect.result();
        this.setState({
            pageData,
        });
    }

    @Lifecycle()
    *onRender(): SagaIterator {
        yield* this.queryBizInfoList();
    }

    @Lifecycle()
    @Interval(3)
    *onTick(): SagaIterator {
        console.info("3秒定时任务");
    }
}

const module = register(new ActionHandler("bizManagement", initialState));
const BizManagement = module.attachLifecycle(BizManagementComponent, { retainStateOnLeave: true });
const actions = module.getActions();
export { actions, BizManagement };
export default BizManagement;
