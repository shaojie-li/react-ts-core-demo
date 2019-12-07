import React from "react";
import { DatePicker, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

import { RangePickerSearch } from "../type";

const { RangePicker } = DatePicker;

interface Props extends FormComponentProps {
    rangePickerSearch: RangePickerSearch;
}

export const RangePickerWithForm: React.FunctionComponent<Props> = ({ rangePickerSearch = { hide: false } as RangePickerSearch, form }) => {
    const { getFieldDecorator } = form;
    return (
        <React.Fragment>
            {!rangePickerSearch.hide && rangePickerSearch.name && (
                <Form.Item key="rangePicker" label={rangePickerSearch.label}>
                    {getFieldDecorator(rangePickerSearch.name, {
                        rules: rangePickerSearch.rules,
                        initialValue: rangePickerSearch.initialValue,
                    })(<RangePicker {...rangePickerSearch.rangePickerProps} />)}
                </Form.Item>
            )}
        </React.Fragment>
    );
};
