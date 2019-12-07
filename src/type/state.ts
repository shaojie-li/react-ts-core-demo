import { State } from "react-ts-core";
import { State as MainState } from "module/main/type";
import { State as Page1State } from "module/demo/page1/type";
import { State as Page2State } from "module/demo/page2/type";
import { State as PageHooks } from "module/demo/pageHooks/type";
import { State as BizManagement } from "module/miniProgramManagement/bizManagement/type";
import { State as BizManagementDraft } from "module/miniProgramManagement/bizManagement/type";

export interface RootState extends State {
    app: {
        main: MainState;
        page1: Page1State;
        page2: Page2State;
        pageHooks: PageHooks;
        bizManagement: BizManagement;
        bizManagementDraft: BizManagementDraft;
    };
}
