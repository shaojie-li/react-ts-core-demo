import { GlobalUtils } from "utils/Global";
import { LoginAjaxRequest, LoginAjaxResponse } from "type/api";

class LoginAJAXService {
    login(params: LoginAjaxRequest): Promise<LoginAjaxResponse> {
        return GlobalUtils.ajax("POST", "/app/mock/20/login", {}, params);
    }
}

export default new LoginAJAXService();
