import React, { useState } from "react";
import { Input, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { InputSearch } from "../type";

interface Props extends FormComponentProps {
    inputSearch: InputSearch[];
}

interface State {
    confirmDirty: boolean;
}

/**
 *
 * e.g 若要验证两次输入是否一致，请给inputSearch里的数组成员加上 comparable 属性，并设置其值为true
 *
 * 目前只考虑了密码输入的场景，其name属性，请分别设置为 password 和 confirm，代表第一次密码输入和确认密码输入
 *
 */

export const InputWithForm: React.FunctionComponent<Props> = ({ inputSearch = [], form }) => {
    const { getFieldDecorator } = form;

    const [state, setState] = useState({ confirmDirty: false } as State);

    const compareToFirstPassword = (rule: any, value: any, callback: any) => {
        if (value && value !== form.getFieldValue("password")) {
            callback("两次密码输入不一致！");
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule: any, value: any, callback: any) => {
        if (value && state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    const handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setState({ ...state, confirmDirty: state.confirmDirty || !!value });
    };

    return (
        <React.Fragment>
            {inputSearch.map(
                (v, i) =>
                    !v.hide && (
                        <Form.Item key={i} label={v.label}>
                            {getFieldDecorator(v.inputProps.name, {
                                rules: v.rules && [...v.rules, !!v.comparable && { validator: v.inputProps.name === "password" ? validateToNextPassword : compareToFirstPassword }],
                                initialValue: v.initialValue,
                            })(
                                <Input
                                    autoComplete="off"
                                    {...v.inputProps}
                                    onBlur={
                                        v.inputProps.name === "confirm"
                                            ? handleConfirmBlur
                                            : () => {
                                                  /** 不做处理 */
                                              }
                                    }
                                />
                            )}
                        </Form.Item>
                    )
            )}
        </React.Fragment>
    );
};
