import React, { useState, useEffect } from "react";
import { connect, DispatchProp } from "react-redux";
import { Icon } from "antd";
import md5 from "md5";

import { RootState } from "type/state";
import { State as BizState } from "../../type";
import { TableSearchForm, FieldConfig } from "components/TableSearch";
import { LoginAjaxRequest } from "type/api";
import { actions } from "module/main";
import { RegExUtils } from "utils/RegEx";

import "./login.less";

interface Props extends DispatchProp {
    loading: number;
    loginData: BizState["loginData"];
}

const Login: React.FunctionComponent<Props> = props => {
    const IMAGE_VERIFICATION_CODE = "2201301004";

    const initalFieldConfig: FieldConfig = {
        inputSearch: [
            {
                inputProps: { name: "account", autoComplete: "account", prefix: <Icon type="user" /> },
                rules: [
                    {
                        required: true,
                        message: "请输入手机号",
                        pattern: RegExUtils.mobilePhone,
                    },
                ],
            },
            {
                inputProps: { name: "password", type: "password", autoComplete: "current-password", prefix: <Icon type="lock" /> },
                rules: [
                    {
                        required: true,
                        message: "请输入密码",
                    },
                ],
            },
        ],
    };

    const [fieldConfig] = useState(initalFieldConfig);

    useEffect(() => {
        if (props.loginData && props.loginData.retcode === IMAGE_VERIFICATION_CODE) {
            fieldConfig.inputSearch.push({
                inputProps: { name: "img_id", autoComplete: "username" },
                rules: [
                    {
                        required: true,
                        message: "请输入图片验证码",
                    },
                ],
            });
        }
    }, [props.loginData]);

    const onLogin = (values: LoginAjaxRequest) => props.dispatch(actions.login({ ...values, password: md5(values.password) }));

    return (
        <div className="module-login-main">
            <div className="login-wrap">
                <h5 className="tab-title">电子卡后台框架登录</h5>
                <TableSearchForm className="login-box" layout="vertical" fieldConfig={fieldConfig} buttonLoading={props.loading > 0} onSubmit={onLogin} buttonText="登录" />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.loading.login,
        loginData: state.app.main.loginData,
    };
};

export default connect(mapStateToProps)(Login);
