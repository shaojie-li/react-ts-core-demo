import React from "react";
import { Icon, Popconfirm } from "antd";

import { State as PageData } from "../../type";
import { CookieUtils } from "utils/Cookie";

import "./header.less";

interface Props {
    loginData: PageData["loginData"];
    logout: () => void;
    onFoldChange?: () => void;
    loading?: boolean;
    collapsed?: boolean;
}

const Header: React.FunctionComponent<Props> = props => {
    return (
        <div className="main-layout-header">
            <div className="header-wrapper">
                <div className="header-right-wrapper">
                    <div className="left-tools">
                        <em onClick={props.onFoldChange} className="menu-collapsed">
                            <Icon className="trigger" type={props.collapsed ? "menu-unfold" : "menu-fold"} />
                        </em>
                    </div>
                    <ul className="right-tools">
                        <li>
                            <Icon type="mobile" style={{ marginRight: 5 }} />
                            {props.loginData.userInfo.phone_number || CookieUtils.getCookie("mobile")}
                        </li>
                        <li>
                            <Popconfirm placement="bottom" title="确认退出？" onConfirm={props.logout}>
                                <span className="logout-button">
                                    <Icon type="logout" style={{ marginRight: 5 }} />
                                    退出
                                </span>
                            </Popconfirm>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
