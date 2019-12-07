import React from "react";
import { Select, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { SelectSearch } from "../type";

const Option = Select.Option;

interface Props extends FormComponentProps {
    selectSearch: SelectSearch[];
}

export const SelectWithForm: React.FunctionComponent<Props> = ({ selectSearch = [], form }) => {
    const { getFieldDecorator } = form;
    return (
        <React.Fragment>
            {selectSearch.map(
                (v, i) =>
                    !v.hide && (
                        <Form.Item key={i} label={v.label}>
                            {getFieldDecorator(v.selectProps.name, {
                                rules: v.rules,
                                initialValue: v.initialValue,
                            })(
                                <Select key={v.selectProps.name} {...v.selectProps}>
                                    {v.selectProps.optionConfig &&
                                        v.selectProps.optionConfig.map(option => (
                                            <Option key={String(option.value)} {...option}>
                                                {option.text}
                                            </Option>
                                        ))}
                                </Select>
                            )}
                        </Form.Item>
                    )
            )}
        </React.Fragment>
    );
};
