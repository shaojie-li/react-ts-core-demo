import React from "react";

import "./index.less";

export default () => {
    return (
        <div className="startup-screen">
            <svg width="140px" height="140px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cy="50" cx="40.6695" fill="#3c4fa0" r="20">
                    <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite" />
                </circle>
                <circle cy="50" cx="59.3305" fill="#3c4fa0" r="20">
                    <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite" />
                </circle>
                <circle cy="50" cx="40.6695" fill="#3c4fa0" r="20">
                    <animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" repeatCount="indefinite" dur="1s" />
                </circle>
            </svg>
            <div className="bar">加载中，请稍候 ...</div>
        </div>
    );
};
