import React from "react";
import { Radio, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { RadioSearch } from "../type";

const RadioGroup = Radio.Group;

interface Props extends FormComponentProps {
    radioSearch: RadioSearch[];
}

export const RadioWithForm: React.FunctionComponent<Props> = ({ radioSearch = [], form }) => {
    const { getFieldDecorator } = form;
    return (
        <React.Fragment>
            {radioSearch.map(
                (v, i) =>
                    !v.hide && (
                        <Form.Item key={i} label={v.label}>
                            {getFieldDecorator(v.radioGroupProps.name, {
                                rules: v.rules,
                                initialValue: v.initialValue,
                            })(<RadioGroup {...v.radioGroupProps} />)}
                        </Form.Item>
                    )
            )}
        </React.Fragment>
    );
};
