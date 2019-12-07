export interface BaseListAjaxRequest {
    limit: number;
    offset: number;
}

export interface BaseListAjaxResponse<T> {
    data_list: T[];
    retcode: string;
    retmsg: string;
    limit: number;
    offset: number;
    total: number;
}

/** 小程序管理业务类型列表请求参数 */
export interface QueryBizInfoListAJAXRequest extends BaseListAjaxRequest {
    biz_name?: string;
}

export interface QueryBizInfoListData {
    pkid: string;
    biz_code: string;
    biz_name: string;
    remark: string;
    rel_component_num: number;
    max_publish_version: number;
    max_publish_desc: string;
    max_publish_time: string;
    newest_publish_version: number;
    newest_publish_desc: string;
    newest_publish_time: string;
    memo: string;
    state: number;
}

/** 小程序管理业务类型列表响应数据 */
export type QueryBizInfoListAJAXResponse = BaseListAjaxResponse<QueryBizInfoListData>;

export interface LoginAjaxRequest {
    account: string;
    password: string;
}

export interface LoginAjaxResponse {
    userInfo: {
        user_name: string;
        phone_number: string;
        gender: "男" | "女" | "";
    };
    C_AUTHID?: string;
    retcode?: string;
}

export interface GetUserAccountAJAXRequest {
    userAccount: string;
    password: string;
}

export interface MerchantListData {
    createTime: string;
    merchantName: string;
    activateStatus: 1 | 0;
    createUserName: "超级管理员" | "管理员" | "运营";
    merchant_id?: string;
    email?: string;
    key: number;
}

export interface GetMerchantListAJAXResponse {
    logId: string;
    status: boolean;
    data: MerchantListData[];
}
