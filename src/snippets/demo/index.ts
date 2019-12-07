import { Module, register } from "react-ts-core";
import DemoComponent from "./components/Main";
import { State } from "./type";

const initialState: State = {};

class ActionHandler extends Module<State> {}

const module = register(new ActionHandler("demo", initialState));
const Demo = module.attachLifecycle(DemoComponent);
const actions = module.getActions();
export { actions, Demo };
