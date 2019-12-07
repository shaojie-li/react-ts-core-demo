import React, { useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { Location } from "history";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { showLoading } from "react-ts-core";
import { AntdColumnProps } from "type/common";
import { RootState } from "type/state";
import { State as PageState } from "../type";
import { QueryBizInfoListAJAXRequest, QueryBizInfoListData } from "type/api";
import { TableSearchForm, FieldConfig } from "components/TableSearch";
import { actions } from "module/miniProgramManagement/bizManagement";

import "./index.less";

export interface Props extends DispatchProp {
    pathname: Location["pathname"];
    loading: boolean;
    pageData: PageState["pageData"];
}

const BizManagement: React.FunctionComponent<Props> = props => {
    const [search, setSearch] = useState({} as QueryBizInfoListAJAXRequest);

    const fieldConfig: FieldConfig = {
        inputSearch: [
            {
                label: "业务类型",
                inputProps: { name: "biz_name" },
            },
        ],
    };

    const columns: Array<AntdColumnProps<QueryBizInfoListData>> = [
        {
            title: "业务类型",
            dataIndex: "biz_name",
            key: "biz_name",
            render: text => text || "-",
        },
        {
            title: "最近发布时间",
            dataIndex: "newest_publish_time",
            key: "newest_publish_time",
            render: text => text || "-",
        },
        {
            title: "草稿箱",
            dataIndex: "draft",
            key: "draft",
            render: (text, record) => <Link to={`/biz_management/draft?biz_code=${record.biz_code}`}>查看</Link>,
        },
        {
            title: "模版库",
            dataIndex: "template",
            key: "template",
            render: (text, record) => <Link to={`/biz_management/template?biz_code=${record.biz_code}`}>查看</Link>,
        },
        {
            title: "版本管理",
            dataIndex: "version",
            key: "version",
            render: (text, record) => <Link to={`/biz_management/version?biz_code=${record.biz_code}`}>查看</Link>,
        },
        {
            title: "发布任务",
            dataIndex: "release",
            key: "release",
            render: (text, record) => <Link to={`/biz_management/release?biz_code=${record.biz_code}`}>查看</Link>,
        },
    ];

    const queryListData = (params: QueryBizInfoListAJAXRequest) => {
        props.dispatch(actions.queryBizInfoList({ ...params, ...search }));
    };

    const pageSizeChange = (current: number, size: number) => {
        setSearch({ ...search, limit: size, offset: current - 1 });
    };

    return (
        <div className="bizManagement-main">
            <div>
                <TableSearchForm fieldConfig={fieldConfig} onSubmit={queryListData} />
            </div>
            <div>
                <Table
                    rowKey={record => record.pkid}
                    columns={columns}
                    dataSource={props.pageData ? props.pageData.data_list : []}
                    loading={props.loading}
                    pagination={
                        props.pageData
                            ? {
                                  total: props.pageData.total,
                                  defaultPageSize: props.pageData.limit,
                                  current: Math.floor(props.pageData.offset / props.pageData.limit) + 1,
                                  showSizeChanger: true,
                                  showQuickJumper: true,
                                  showTotal: total => `共 ${total} 条数据`,
                                  onShowSizeChange: (current, size) => pageSizeChange(current, size),
                              }
                            : false
                    }
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        pathname: state.router.location.pathname,
        loading: showLoading(state, "queryBizInfoList"),
        pageData: state.app.bizManagement.pageData,
    };
};

export default connect(mapStateToProps)(BizManagement);
