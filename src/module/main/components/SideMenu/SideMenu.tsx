import React from "react";
import { Menu, Icon } from "antd";
import { ClickParam } from "antd/lib/menu";
import { connect, DispatchProp } from "react-redux";
import { push } from "connected-react-router";
import { Location } from "history";
import classname from "classnames";

import { routerConfig, RouterConfig } from "module/routerConfig";
import { RootState } from "type/state";

import "./sideMenu.less";

const SubMenu = Menu.SubMenu;

interface Props extends DispatchProp {
    pathname: Location["pathname"];
    collapsed: boolean;
}

const SideMenu: React.FunctionComponent<Props> = props => {
    const handleClick = (e: ClickParam) => props.dispatch(push(`/${e.key}`));

    // 取url第一个 / 符号后的字符串
    const currentSelectedKey = props.pathname.replace(/\//, "");

    const sideMenuClassName = classname({
        "main-layout-side-menu": true,
        collapsed: props.collapsed,
    });

    const renderMenu = (routerConfig: RouterConfig[]) => {
        return routerConfig.map(config => {
            if (!config.permission) {
                return false;
            }

            return config.children ? (
                <SubMenu
                    key={config.name}
                    title={
                        <span>
                            <Icon component={() => <i className={`iconfont ${config.iconClassName}`} />} />
                            <span>{config.name}</span>
                        </span>
                    }
                >
                    {renderMenu(config.children)}
                </SubMenu>
            ) : (
                <Menu.Item key={config.path}>
                    <Icon component={() => <i className={`iconfont ${config.iconClassName}`} />} />
                    <span>{config.name}</span>
                </Menu.Item>
            );
        });
    };

    return (
        <div className={sideMenuClassName}>
            <h1 className="logo-box">
                <img src="https://qyfl.hstypay.com/image_upload/3000000210/logo/2019051519342114.png" alt="" />
                {!props.collapsed && <span className="app-name">电子卡后台框架</span>}
            </h1>
            <Menu mode="inline" onClick={handleClick} className="aside-container" selectedKeys={[currentSelectedKey]} theme="dark" inlineCollapsed={props.collapsed}>
                {renderMenu(routerConfig)}
            </Menu>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        pathname: state.router.location.pathname,
    };
};

export default connect(mapStateToProps)(SideMenu);
