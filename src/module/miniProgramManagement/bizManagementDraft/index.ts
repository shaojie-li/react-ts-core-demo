import { Module, register } from "react-ts-core";
import BizManagementDraftComponent from "./components/Main";
import { State } from "./type";

const initialState: State = {};

class ActionHandler extends Module<State> {}

const module = register(new ActionHandler("bizManagementDraft", initialState));
const BizManagementDraft = module.attachLifecycle(BizManagementDraftComponent);
const actions = module.getActions();
export { actions, BizManagementDraft };
export default BizManagementDraft;
