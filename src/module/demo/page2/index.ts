import { SagaIterator } from "redux-saga";

import { Module, register, Lifecycle } from "react-ts-core";
import Page2Component from "./components/Main";
import { State } from "./type";
import { GetUserAccountAJAXRequest } from "type/api";

const initialState: State = {
    currentUser: "Tony",
    searchResult: "",
    formSearch: {
        userId: "2",
        open: 0,
    },
};

class ActionHandler extends Module<State> {
    *updateSearch(values: GetUserAccountAJAXRequest) {
        const searchResult = JSON.stringify(values);
        this.setState({
            searchResult,
        });
    }

    *getUserInfo(currentUser: string) {
        this.setState({
            currentUser,
        });
    }

    *setFormSearch(name: string, value: any) {
        this.setState({
            formSearch: {
                ...this.state.formSearch,
                [name]: value,
            },
        });
    }

    @Lifecycle()
    *onRender(): SagaIterator {
        if (location.pathname === "/page2") {
            console.info("page2 pathname", location.pathname);
        }
    }
}

const module = register(new ActionHandler("page2", initialState));
const Page2 = module.attachLifecycle(Page2Component, { retainStateOnLeave: true });
const actions = module.getActions();
export { actions };
export default Page2;
