import React from "react";
import notFoundImage from "assets/images/404.gif";

const Page404: React.FunctionComponent = () => (
    <div className="page-404" style={{ flex: "1 1 0%", justifyContent: "center", alignItems: "center", display: "flex", height: "100%", fontSize: 80 }}>
        <div>
            <h5 style={{ fontSize: 120, color: "#f90" }}>404</h5>
            <p style={{ fontSize: 18, fontStyle: "italic", color: "#666" }}>Sorry，您访问的页面不存在~~</p>
        </div>
        <img style={{ width: 280 }} src={notFoundImage} alt="" />
    </div>
);

export default Page404;
