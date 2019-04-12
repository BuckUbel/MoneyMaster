import * as React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {ChangeEvent} from "react";
import ColorField from "./ColorField";
import Input from "@material-ui/core/es/Input/Input";

export interface IFormColorFieldsProps {
    id: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default class FormColorField extends React.Component<IFormColorFieldsProps, {}> {

    constructor(props: IFormColorFieldsProps) {
        super(props);
    }

    public render() {
        const {value, onChange, id, label} = this.props;
        return (
            <React.Fragment>
                <FormControlLabel
                    control={
                        <React.Fragment>
                            <Input
                                id={id}
                                value={value}
                                onChange={onChange}
                                type={"color"}
                                disableUnderline={true}
                                inputProps={{
                                    style: {
                                        width: "24px",
                                        height: "24px",
                                        padding: "12px"
                                    }
                                }}

                            />
                        </React.Fragment>
                    }
                    label={label}
                    labelPlacement={"start"}
                />
            </React.Fragment>
        );
    }
}
