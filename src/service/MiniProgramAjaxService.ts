import { GlobalUtils } from "utils/Global";
import { QueryBizInfoListAJAXRequest, QueryBizInfoListAJAXResponse } from "type/api";

class MiniProgramAjaxService {
    queryBizInfoList(params?: QueryBizInfoListAJAXRequest): Promise<QueryBizInfoListAJAXResponse> {
        return GlobalUtils.ajax("POST", "/app/mock/20/query_biz_info_by_page", {}, params);
    }
}

export default new MiniProgramAjaxService();
