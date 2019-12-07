import React from "react";
import { Button, Form } from "antd";
import { FormComponentProps, FormProps } from "antd/lib/form";
import classnames from "classnames";

import { ObjectUtils } from "utils/Object";
import { InputWithForm } from "./Input";
import { SelectWithForm } from "./Select";
import { RadioWithForm } from "./Radio";
import { RangePickerWithForm } from "./RangePicker";
import { FieldConfig } from "./index";

import "./index.less";

interface Props extends FormComponentProps {
    /** 布局 */
    layout?: "horizontal" | "inline" | "vertical";
    /** 表单配置项 */
    fieldConfig?: FieldConfig;
    /** 给组件添加类名 */
    className?: string;
    /** 给组件添加行内样式 */
    style?: React.CSSProperties;
    /** 按钮文字 */
    buttonText?: string;
    buttonLoading?: boolean;
    /** 提交search表单事件 */
    onSubmit?: (values: { [k: string]: any }) => void;
    /** 是否提供清空查询条件按钮 */
    reset?: boolean;
    /** 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store */
    onChange?: (changedFields: any, allFields: any) => void;
}

const TableSearch: React.FunctionComponent<Props> = ({ fieldConfig = {}, className, style, form, buttonLoading = false, buttonText = "查询", layout = "inline", onSubmit, reset }) => {
    const formItemLayout: Pick<FormProps, "wrapperCol" | "labelCol"> =
        layout === "inline"
            ? {}
            : {
                  labelCol: {
                      xs: { span: 24 },
                      sm: { span: 6 },
                  },
                  wrapperCol: {
                      xs: { span: 24 },
                      sm: { span: 18 },
                  },
              };

    const tailFormItemLayout =
        layout === "inline"
            ? {}
            : {
                  wrapperCol: {
                      xs: {
                          span: 24,
                          offset: 0,
                      },
                      sm: {
                          span: 16,
                          offset: 0,
                      },
                  },
              };

    const cls = classnames({
        "common-table-search": true,
        [className]: className,
    });

    const handleSubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();

        const { validateFields } = form;
        validateFields((err, values) => {
            if (!err) {
                const awesomeArray = [];
                for (const key in values) {
                    if (key && (values[key] || values[key] === 0 || typeof values[key] === "boolean")) {
                        awesomeArray.push(key);
                    }
                }

                const result = ObjectUtils.pick(values, awesomeArray);
                onSubmit(result);
                console.info("result", result);
            }
        });
    };

    const handleReset = () => form.resetFields();

    return (
        <div className={cls} style={style}>
            <Form {...formItemLayout} onSubmit={handleSubmit} layout={layout}>
                <InputWithForm inputSearch={fieldConfig.inputSearch} form={form} />
                <SelectWithForm selectSearch={fieldConfig.selectSearch} form={form} />
                <RadioWithForm radioSearch={fieldConfig.radioSearch} form={form} />
                <RangePickerWithForm rangePickerSearch={fieldConfig.rangePickerSearch} form={form} />
                <Form.Item {...tailFormItemLayout} style={{ textAlign: "left" }}>
                    {typeof onSubmit === "function" && (
                        <Button type="primary" htmlType="submit" loading={buttonLoading}>
                            {buttonText}
                        </Button>
                    )}
                    {reset && (
                        <Button type="ghost" onClick={handleReset} style={{ marginLeft: 10 }}>
                            清空
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

const TableSearchForm = Form.create<Props>({
    onFieldsChange(props, changedFields, allFields) {
        typeof props.onChange === "function" && props.onChange(changedFields, allFields);
    },
})(TableSearch);

export { TableSearchForm };
