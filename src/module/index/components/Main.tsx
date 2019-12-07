import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface Props {}

const Home: React.FunctionComponent<Props> = () => {
    return (
        <div className="home-main">
            <Link to="/index/with_search?v=1&ds=2">
                <Button style={{ marginRight: 20 }}>无权限访问</Button>
            </Link>
            <Link to="/page1">
                <Button>404</Button>
            </Link>
        </div>
    );
};

export { Home };
