import * as React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {ChangeEvent} from "react";
import ColorField from "./ColorField";

export interface IFormCheckBoxProps {
    id: string;
    label: string;
    value: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default class FormCheckBox extends React.Component<IFormCheckBoxProps, {}> {

    constructor(props: IFormCheckBoxProps) {
        super(props);
    }

    public render() {
        const {value, onChange, id, label} = this.props;
        return (
            <React.Fragment>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={value}
                            onChange={onChange}
                        />
                    }
                    label={label}
                    labelPlacement={"start"}
                />
            </React.Fragment>
        );
    }
}
