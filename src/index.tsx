import { startApp } from "react-ts-core";
import { ErrorHandler } from "./module/ErrorHandler";
import { Main } from "./module/main";
import { setTheme } from "setTheme";

setTheme();

startApp({
    componentType: Main,
    errorListener: new ErrorHandler(),
    logger: {
        serverURL: "https://www.baidu.com",
        sendingFrequency: 10,
    },
});
