import * as React from "react";
import {TextField} from "@material-ui/core";
import {dateToYMDString} from "../../../../../base/helper/time/dateHelper";

export interface ITextFieldProps {
    required?: boolean;
}

export interface IDateTextFieldProps {
    name: string;
    label?: string;
    value: Date;
    min?: Date;
    max?: Date;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    textFieldProps?: ITextFieldProps;
}

export interface IDateTextFieldState {
}

const defaultState: IDateTextFieldState = {};
export default class DateTextField extends React.Component<IDateTextFieldProps, IDateTextFieldState> {

    public state: IDateTextFieldState = defaultState;

    constructor(props: IDateTextFieldProps) {
        super(props);
    }

    public render() {

        const {name, label, value, min, max, onChange, textFieldProps} = this.props;

        const dateFieldLabel = label ? label : name;

        return (
            <React.Fragment>
                <form noValidate>
                    <TextField
                        id={name}
                        label={dateFieldLabel}
                        name={name}
                        variant={"outlined"}
                        type="date"
                        value={value ? dateToYMDString(value, "-") : ""}
                        inputProps={{
                            // className: "no-spinners",
                            min: min ? dateToYMDString(min, "-") : "",
                            max: max ? dateToYMDString(max, "-") : ""
                        }}
                        onChange={onChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required={textFieldProps ? textFieldProps.required ? textFieldProps.required : false : false}
                    />
                </form>
            </React.Fragment>
        );
    }
}
