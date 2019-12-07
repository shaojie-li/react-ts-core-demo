import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { push, replace } from "connected-react-router";
import { Location } from "history";
import { DispatchProp } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Breadcrumb, Icon, ConfigProvider, Spin } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import Login from "module/main/components/Login/Login";
import { ErrorBoundary } from "react-ts-core";
import NavBar from "./NavBar/NavBar";
import { RootState } from "type/state";
import { actions } from "../index";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import { State as PageState } from "../type";

moment.locale("zh-cn");

import "./main.less";

type FlatRouterConfig = PageState["flatRouterConfig"];

interface Props extends DispatchProp {
    location: Location;
    isLogin: boolean;
    currentRouter: PageState["currentRouter"];
    loginData: PageState["loginData"];
    flatRouterConfig: FlatRouterConfig;
    collapsed?: boolean;
}

interface State {
    activeKey: string;
    collapsed: boolean;
}

const Main: React.FunctionComponent<Props> = props => {
    const initialState: State = {
        activeKey: "",
        collapsed: false,
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const activeKey = props.location.pathname.replace(/\//, "");
        props.isLogin && setState({ ...state, activeKey });

        !props.isLogin && props.location.pathname !== "/login" && props.dispatch(replace("/login"));
        props.isLogin && props.location.pathname === "/login" && props.dispatch(replace("/"));
    }, [props.location]);

    const logout = () => props.dispatch(actions.logout());

    const handlerSwitchRouter = (fullPath: string) => props.dispatch(push(`/${fullPath}`));

    const tabClose = (nextPath: string) => props.dispatch(push(`/${nextPath ? nextPath : "index"}`));

    const toggleCollapsed = () => {
        setState({
            ...state,
            collapsed: !state.collapsed,
        });
    };

    const renderRoutes = (flatRouterConfig: FlatRouterConfig) => flatRouterConfig.map(config => <Route key={config.path} exact path={`/${config.path}`} component={config.permission ? lazy(() => import(`module/${config.fileName}/index`)) : lazy(() => import("module/page403/components/Main"))} />);

    return (
        <React.Fragment>
            <ConfigProvider locale={zh_CN}>
                {props.isLogin ? (
                    <div className="main-layout">
                        <div className="main-with-side-container">
                            <SideMenu collapsed={state.collapsed} />
                            <div className="main-body">
                                <Header loginData={props.loginData} logout={logout} onFoldChange={toggleCollapsed} collapsed={state.collapsed} />
                                <NavBar activeKey={state.activeKey} search={props.location.search} onChange={handlerSwitchRouter} onClose={tabClose} />
                                <div className="main-content">
                                    <div className="module-bread-crumb">
                                        <Breadcrumb>
                                            {props.currentRouter && props.currentRouter.breadcrumbConfig && props.currentRouter.breadcrumbConfig.length > 1 && (
                                                <Breadcrumb.Item onClick={() => props.dispatch(actions.goBack())}>
                                                    <Icon type="rollback" />
                                                </Breadcrumb.Item>
                                            )}
                                            {props.currentRouter && props.currentRouter.breadcrumbConfig ? (
                                                props.currentRouter.breadcrumbConfig.map((breadcrumb, index) => (
                                                    <Breadcrumb.Item key={index} onClick={() => breadcrumb.path && props.dispatch(push(breadcrumb.path))}>
                                                        <span>{breadcrumb.name}</span>
                                                    </Breadcrumb.Item>
                                                ))
                                            ) : (
                                                <Breadcrumb.Item>
                                                    <span>未配置路由</span>
                                                </Breadcrumb.Item>
                                            )}
                                        </Breadcrumb>
                                    </div>
                                    {useMemo(
                                        () => (
                                            <div className="module-container">
                                                <ErrorBoundary>
                                                    <Suspense fallback={<Spin className="global_spin" tip="加载中..." size="large" delay={300} />}>
                                                        <Switch>
                                                            <Route exact path="/" render={() => <Redirect to="/index" />} />
                                                            {renderRoutes(props.flatRouterConfig)}
                                                            <Route component={lazy(() => import("module/page404/components/Main"))} />
                                                        </Switch>
                                                    </Suspense>
                                                </ErrorBoundary>
                                            </div>
                                        ),
                                        [props.location]
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    useMemo(() => <Route exact path="/login" component={Login} />, [props.location])
                )}
            </ConfigProvider>
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        isLogin: state.app.main.isLogin,
        location: state.router.location,
        currentRouter: state.app.main.currentRouter,
        loginData: state.app.main.loginData,
        flatRouterConfig: state.app.main.flatRouterConfig,
    };
};

export default connect(mapStateToProps)(Main);
