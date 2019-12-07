import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Location } from "history";

import { RootState } from "type/state";

import "./index.less";

export interface Props extends DispatchProp {
    pathname: Location["pathname"];
}

const BizManagementDraft: React.FunctionComponent<Props> = props => {
    return <div className="bizManagementDraft-main">BizManagementDraft</div>;
};

const mapStateToProps = (state: RootState) => {
    return {
        pathname: state.router.location.pathname,
    };
};

export default connect(mapStateToProps)(BizManagementDraft);
