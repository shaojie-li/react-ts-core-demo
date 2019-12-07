import { AntdInputProps, AntdSelectProps, AntdOptionProps, AntdGetFieldDecoratorOptions, AntdRadioGroupProps, AntdRangePickerProps } from "type/common";

type BaseSearchProps = AntdGetFieldDecoratorOptions & { label?: React.ReactNode; hide?: boolean };

/** 包含input配置项和其校验规则 */
export interface InputSearch extends BaseSearchProps {
    /** input参数，参见 [input-antd](https://ant.design/components/input-cn/#API) */
    inputProps: AntdInputProps;
    comparable?: boolean;
}

interface SelectProps extends AntdSelectProps {
    name: string;
    /** option配置项，为一个json数组，数组元素参见 [option-antd](https://ant.design/components/select-cn/#Option-props) */
    optionConfig: OptionProps[];
}

interface OptionProps extends AntdOptionProps {
    text: React.ReactNode;
}

export interface SelectSearch extends BaseSearchProps {
    /** select参数 */
    selectProps: SelectProps;
}

export interface RadioSearch extends BaseSearchProps {
    /** Radio.Group参数，参见 [RadioGroup-antd](https://ant.design/components/radio-cn/#RadioGroup) */
    radioGroupProps: AntdRadioGroupProps;
}

export interface RangePickerSearch extends BaseSearchProps {
    name: string;
    rangePickerProps: AntdRangePickerProps;
}

export interface FieldConfig {
    /** input配置项，类型为一个json数组 */
    inputSearch?: InputSearch[];
    /** select配置项，类型为一个json数组 */
    selectSearch?: SelectSearch[];
    /** radio配置项，类型为一个json数组 */
    radioSearch?: RadioSearch[];
    rangePickerSearch?: RangePickerSearch;
}
