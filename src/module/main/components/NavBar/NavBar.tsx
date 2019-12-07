import React, { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { Icon, message } from "antd";
import { connect, DispatchProp } from "react-redux";

import { actions } from "module/main";
import { RootState } from "type/state";
import { routerConfig, RouterConfig } from "../../../routerConfig";
import { ArrayUtils } from "utils/Array";
import { GlobalUtils } from "utils/Global";

import "./navbar.less";

export interface NavBarProps extends DispatchProp {
    activeKey: string;
    search: string;
    onChange: (key: string, search?: string) => void;
    onClose: (nextPath: string) => void;
}

export interface NavCollection {
    key: string;
    value: string;
    search?: string;
}

export interface State {
    navCollection: NavCollection[];
    animate: boolean;
    distance: number;
}

/**
 *
 * 导航组件，此组件需依赖一个路由配置文件，根据项目具体情况而定
 * @param {String} props.activeKey 当前组件所匹配路由的唯一key值
 * @author ryan.li
 */
const NavBar: React.FunctionComponent<NavBarProps> = props => {
    const copyRouterConfig = GlobalUtils.deepCloneUseJSON(routerConfig);

    const initialState: State = {
        /** 导航栏集合 */
        navCollection: [],
        /** 导航栏的动画标示，配合useEffect，在动画完成后拿到最新的dom信息 */
        animate: false,
        /** 可移动父元素ul的当前位移值 */
        distance: 0,
        /** 可移动父元素超出父元素右侧的长度 */
    };

    const [state, setState] = useState(initialState);

    const navParent = useRef(null);

    const navbarScrollWrapper = useRef(null);

    useEffect(() => {
        if (props.activeKey) {
            const currentNav: NavCollection = {
                key: props.activeKey,
                value: currentRouterName(props.activeKey) ? currentRouterName(props.activeKey).name : "",
                search: props.search,
            };

            const currentRouter = currentRouterName(currentNav.key);

            const copyCollection = GlobalUtils.deepCloneUseJSON(state.navCollection);

            setState({
                ...state,
                navCollection: ArrayUtils.uniqueJsonArray(copyCollection.concat(currentNav)),
                animate: !state.animate,
            });

            props.dispatch(actions.setRouterConfig(currentRouter));
        }
    }, [props.activeKey]);

    useEffect(() => {
        // e.g 可移动父元素的父元素称为父元素
        // 父元素
        const navParentHtml = navParent.current as HTMLDivElement;
        // 可移动父元素
        const navHtml = navbarScrollWrapper.current as HTMLUListElement;
        if (!navParentHtml || !navHtml) {
            return;
        }
        // 可移动父元素下的标签成员
        const arrayLikeLi = navHtml.children;
        // 将伪数组转换未数组
        const arrayLi = Array.prototype.slice.call(arrayLikeLi) as HTMLLIElement[];
        // 当前标签
        const currentTab = arrayLi.filter(element => {
            return element.className === "nav-item active";
        })[0];
        if (!currentTab) {
            return;
        }
        // 当前标签右侧距离最左边的距离
        const currentTabRightSideToLeft = currentTab ? currentTab.getBoundingClientRect().right : 0;
        // 父元素右侧距离最左边的距离
        const navParentHtmlRightSideToLeft = navParentHtml ? navParentHtml.getBoundingClientRect().right : 0;
        // 当前标签左侧距离最左边的距离
        const currentTabLeftSideToLeft = currentTab ? currentTab.getBoundingClientRect().left : 0;
        // 父元素左侧距离最左边的距离
        const navParentHtmlLeftSideToLeft = navParentHtml ? navParentHtml.getBoundingClientRect().left : 0;

        let distance = 0;
        // 当前元素在左侧并隐藏或半隐藏的情况
        if (currentTabRightSideToLeft - navParentHtmlRightSideToLeft > 0) {
            distance = navParentHtmlRightSideToLeft - currentTabRightSideToLeft;
            setState({
                ...state,
                distance: state.distance + distance,
            });
            // 当前元素在右侧并隐藏或半隐藏的情况
        } else if (navParentHtmlLeftSideToLeft - currentTabLeftSideToLeft > 0) {
            distance = navParentHtmlLeftSideToLeft - currentTabLeftSideToLeft;
            setState({
                ...state,
                distance: state.distance + distance,
            });
        }

        navHtml.style.cssText = `transform: translateX(${state.distance + distance}px);`;
    }, [state.animate]);

    const currentClass = (key: string) =>
        classnames({
            "nav-item": true,
            active: props.activeKey === key,
        });

    const onTabChange = (key: string, search: string = "") => {
        if (key === props.activeKey) {
            return;
        }
        const path = key + search;
        props.onChange(path);
    };

    const onTabClose = (event: React.MouseEvent<HTMLElement, MouseEvent>, key: string) => {
        // 防止触发onTabChange方法
        event.stopPropagation();
        // 如果只剩一个标签，阻止关闭标签的操作
        if (state.navCollection.length === 1) {
            message.warn("这是最后一个标签页了");
            return;
        }

        // 1. 删除指定的标签页
        const currentIndex = state.navCollection.findIndex(nav => nav.key === key);
        const copyCollection = GlobalUtils.deepCloneUseJSON(state.navCollection);
        copyCollection.splice(currentIndex, 1);
        setState({
            ...state,
            navCollection: copyCollection,
        });
        // 2. 找到最后一个标签页，并跳转到这个页面
        const nextNav = copyCollection[copyCollection.length - 1];
        props.onClose(nextNav.key + nextNav.search);
    };

    const currentRouterName = (key: string): RouterConfig => {
        // 将路由配置扁平化
        copyRouterConfig &&
            copyRouterConfig.forEach(config => {
                if (config.children) {
                    copyRouterConfig.push(...config.children);
                } else if (config.customChildren) {
                    copyRouterConfig.push(...config.customChildren);
                }
            });

        return copyRouterConfig.filter(config => config.path === key)[0];
    };

    const setNavBarDistance = (direction: "left" | "right") => {
        let distance = 0;
        // 计算可移动父元素右侧超出父元素的长度，即点击右箭头之后，需要向左移动的距离
        // e.g 可移动父元素的父元素称为父元素
        // 父元素
        const navParentHtml = navParent.current as HTMLDivElement;
        // 可移动父元素
        const navHtml = navbarScrollWrapper.current as HTMLUListElement;
        if (!navParentHtml || !navHtml) {
            return;
        }
        // 可移动父元素下的标签成员
        const arrayLikeLi = navHtml.children;
        // 将伪数组转换未数组
        const arrayLi = Array.prototype.slice.call(arrayLikeLi) as HTMLLIElement[];

        // 父元素左/右侧距离最左边的距离
        const navParentHtmlSideToLeft = navParentHtml ? navParentHtml.getBoundingClientRect()[direction] : 0;
        // 第一/最后一个元素左/右侧距离最左边的距离
        const oneTabSideToLeft = direction === "left" ? arrayLi[0].getBoundingClientRect()[direction] || 0 : arrayLi.length ? arrayLi[arrayLi.length - 1].getBoundingClientRect()[direction] : 0;

        distance = direction === "left" ? Math.min(navParentHtmlSideToLeft - oneTabSideToLeft, navParentHtml.offsetWidth) : Math.min(oneTabSideToLeft - navParentHtmlSideToLeft, navParentHtml.offsetWidth);

        if (distance <= 0) {
            return;
        }

        const fullDistance = direction === "left" ? state.distance + distance : state.distance - distance;

        setState({
            ...state,
            distance: fullDistance,
        });

        navHtml.style.cssText = `transform: translateX(${fullDistance}px);`;
    };

    return (
        <div className="main-layout-navbar">
            <div className="nav-bar-arrow left-arrow" onClick={() => setNavBarDistance("left")}>
                <Icon type="left" />
            </div>
            <div className="nav-tab-wrapper" ref={navParent}>
                <ul className="nav-tab-container" ref={navbarScrollWrapper}>
                    {state.navCollection.map((nav, index) => {
                        currentRouterName(nav.key);
                        const navName = currentRouterName(nav.key) ? currentRouterName(nav.key).name : "未配置路由";

                        return (
                            <li className={currentClass(nav.key)} key={index} onClick={() => onTabChange(nav.key, nav.search)}>
                                {navName}
                                <i className="tab-close-icon" onClick={e => onTabClose(e, nav.key)}>
                                    <Icon type="close" className="icon-antd-close" />
                                </i>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="nav-bar-arrow right-arrow" onClick={() => setNavBarDistance("right")}>
                <Icon type="right" />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        pathname: state.router.location.pathname,
    };
};

export default connect(mapStateToProps)(NavBar);
