import { notification } from "antd";
import { ErrorListener, Exception } from "react-ts-core";
import { SagaIterator } from "redux-saga";

export class ErrorHandler implements ErrorListener {
    *onError(exception: Exception): SagaIterator {
        notification.error({
            message: "错误提示",
            description: exception.message,
        });
    }
}
