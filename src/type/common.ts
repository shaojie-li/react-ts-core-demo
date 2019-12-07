import { InputProps as AntdInputProps } from "antd/lib/input/Input";
import { SelectProps as AntdSelectProps } from "antd/lib/select";
import { ValidationRule as AntdValidationRule, GetFieldDecoratorOptions as AntdGetFieldDecoratorOptions } from "antd/lib/form/Form";
import { RangePickerProps as AntdRangePickerProps } from "antd/lib/date-picker/interface";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import { ColumnProps as AntdColumnProps } from "antd/lib/table/interface";
import { OptionProps as AntdOptionProps } from "antd/lib/select";
import { RadioGroupProps as AntdRadioGroupProps } from "antd/lib/radio/interface";

interface AntdInputPropsWithRules extends AntdInputProps {
    rules?: AntdValidationRule[];
}

export { AntdInputProps, AntdValidationRule, AntdInputPropsWithRules, AntdColumnProps, AntdSelectProps, AntdOptionProps, AntdGetFieldDecoratorOptions, AntdFormItemProps, AntdRadioGroupProps, AntdRangePickerProps };
