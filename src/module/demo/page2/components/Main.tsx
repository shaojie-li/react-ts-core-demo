import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Location } from "history";
import { Icon } from "antd";
import moment from "moment";

import { GetUserAccountAJAXRequest } from "type/api";
import { TableSearchForm, FieldConfig } from "components/TableSearch";
import { RootState } from "type/state";
import { actions } from "../index";
import { State as PageState } from "../type";

import "./index.less";

export interface Props extends DispatchProp {
    location: Location;
    currentUser: PageState["currentUser"];
    searchResult: PageState["searchResult"];
    formSearch: PageState["formSearch"];
}

const Page2: React.FunctionComponent<Props> = props => {
    const fieldConfig: FieldConfig = {
        inputSearch: [
            {
                label: "账户",
                inputProps: { name: "userAccount", prefix: <Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25)" }} /> },
                initialValue: props.formSearch.userAccount,
                rules: [
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址！",
                    },
                    {
                        required: true,
                        message: "请输入您的邮箱地址！",
                    },
                ],
            },
            {
                label: "密码",
                comparable: true,
                inputProps: { name: "password", prefix: <Icon type="lock" style={{ color: "rgba(0, 0, 0, 0.25)" }} /> },
                rules: [
                    {
                        required: true,
                        message: "请输入您的密码！",
                    },
                    {
                        pattern: /^[a-zA-Z]+\w{5,}$/,
                        message: "请输入以字母开头，包含字母、数字或下划线的密码！",
                    },
                ],
            },
            {
                label: "确认密码",
                comparable: true,
                inputProps: { name: "confirm", prefix: <Icon type="lock" style={{ color: "rgba(0, 0, 0, 0.25)" }} /> },
                rules: [
                    {
                        required: true,
                        message: "请再次输入您的密码！",
                    },
                ],
            },
        ],

        selectSearch: [
            {
                label: "用户",
                selectProps: {
                    name: "userId",
                    optionConfig: [{ disabled: true, value: "1", text: "jack" }, { value: "2", text: "lucy" }],
                },
                initialValue: props.formSearch.userId,
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        ],

        radioSearch: [
            {
                label: "开启",
                initialValue: props.formSearch.open,
                radioGroupProps: {
                    name: "open",
                    options: [
                        {
                            label: "开启",
                            value: 1,
                        },
                        {
                            label: "关闭",
                            value: 0,
                        },
                    ],
                },
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        ],

        rangePickerSearch: {
            name: "rangePicker",
            label: "日期",
            initialValue: [moment("2015-06-06", "YYYY-MM-DD"), moment("2015-06-08", "YYYY-MM-DD")],
            rangePickerProps: {},
            rules: [
                {
                    required: true,
                },
            ],
        },
    };

    const handleSubmit = (values: GetUserAccountAJAXRequest) => props.dispatch(actions.updateSearch(values));

    const handleFormSearchChange = (changedFields: any) => {
        const currentKey = Object.getOwnPropertyNames(changedFields)[0];
        currentKey && props.dispatch(actions.setFormSearch(currentKey, changedFields[currentKey].value));
    };

    return (
        <div className="page2-main">
            <div className="page-content">
                <TableSearchForm reset layout="horizontal" fieldConfig={fieldConfig} onSubmit={handleSubmit} className="page2-table-search" onChange={handleFormSearchChange} />
                <p className="stringify_result" style={{ fontSize: 16, textAlign: "left" }}>
                    {props.searchResult}
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.app.page2.currentUser,
        location: state.router.location,
        searchResult: state.app.page2.searchResult,
        formSearch: state.app.page2.formSearch,
    };
};

export default connect(mapStateToProps)(Page2);
