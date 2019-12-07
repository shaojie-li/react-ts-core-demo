import React, { useState, useEffect } from "react";
import { Button } from "antd";

import "./index.less";

const PageHooks: React.FunctionComponent = () => {
    const [count, setCount] = useState(0);

    const MAX = 10;

    const MIN = 0;

    const updateCount = (step: 1 | -1) => setCount(Math.max(MIN, Math.min(MAX, count + step)));

    useEffect(() => {
        document.title = `你点击了${count}次`;
    }, [count]); // 监听count是否发生变化，如果count没有改变，就跳过此次执行，避免一些不必要的性能损失

    return (
        <div className="page_hooks">
            <p>{count}</p>
            <Button type="primary" onClick={() => updateCount(1)} disabled={count === MAX}>
                点击递增
            </Button>
            <Button onClick={() => updateCount(-1)} style={{ marginLeft: 20 }} disabled={count === MIN}>
                点击递减
            </Button>
        </div>
    );
};

export default PageHooks;
