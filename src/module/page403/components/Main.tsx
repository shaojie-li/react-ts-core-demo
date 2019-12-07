import React from "react";
import forbiddenImage from "assets/images/403.gif";

const Page403: React.FunctionComponent = () => (
    <div className="page-404" style={{ flex: "1 1 0%", justifyContent: "center", alignItems: "center", display: "flex", height: "100%", fontSize: 80, textAlign: "center" }}>
        <div>
            <img style={{ width: 560 }} src={forbiddenImage} alt="" />
            <p style={{ fontSize: 18, fontStyle: "italic", color: "#666" }}>Sorry，您暂无访问权限~~</p>
        </div>
    </div>
);

export default Page403;
