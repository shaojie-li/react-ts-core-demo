import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Table } from "antd";
import { Location } from "history";

import { MerchantListData } from "type/api";
import { AntdColumnProps } from "type/common";
import { RootState } from "type/state";
import { State as PageState } from "../type";
import { TableSearchForm, FieldConfig } from "components/TableSearch";

import "./index.less";

export interface Props extends DispatchProp {
    pathname: Location["pathname"];
    search: Location["search"];
    merchantList: PageState["merchantList"];
    loading: number;
}

const Page1: React.FunctionComponent<Props> = props => {
    const { merchantList } = props;

    const columns: Array<AntdColumnProps<MerchantListData>> = [
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "商户名称",
            dataIndex: "merchantName",
            key: "merchantName",
        },
        {
            title: "商户编号",
            dataIndex: "merchant_id",
            key: "merchant_id",
        },
        {
            title: "激活状态",
            dataIndex: "activateStatus",
            key: "activateStatus",
            render: text => (text === 1 ? "激活" : "未激活"),
        },
        {
            title: "创建人",
            dataIndex: "createUserName",
            key: "createUserName",
        },
        {
            title: "邮箱地址",
            dataIndex: "email",
            key: "email",
        },
    ];

    const fieldConfig: FieldConfig = {
        inputSearch: [
            {
                label: "商户",
                inputProps: { name: "name" },
            },
            {
                label: "编号",
                inputProps: { name: "id" },
            },
        ],

        selectSearch: [
            {
                label: "性别",
                initialValue: "",
                selectProps: {
                    name: "sex",
                    optionConfig: [
                        {
                            value: "",
                            text: "全部",
                        },
                        {
                            disabled: true,
                            value: "1",
                            text: "男",
                        },
                        {
                            value: "2",
                            text: "女",
                        },
                        {
                            value: "3",
                            text: "不方便透露",
                        },
                    ],
                },
            },
        ],
    };

    const handleSubmit = (values: any) => console.info(values);

    return (
        <div className="page1-main">
            <div>
                <TableSearchForm fieldConfig={fieldConfig} onSubmit={handleSubmit} />
            </div>
            <div>
                <Table columns={columns} dataSource={merchantList ? merchantList.data : []} loading={props.loading === 1} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        pathname: state.router.location.pathname,
        search: state.router.location.search,
        merchantList: state.app.page1.merchantList,
        loading: state.loading.getMerchantList,
    };
};

export default connect(mapStateToProps)(Page1);
