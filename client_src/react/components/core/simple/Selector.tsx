import * as React from "react";
import {FormControl, FormHelperText, MenuItem, Select} from "@material-ui/core";
import {ChangeEvent} from "react";
import {ReactNode} from "react";

export interface ISelectorResponse {
    value: string;
    name: string;
}

export interface ISelectorProps {
    keyValue?: string;
    emptyValue?: string;
    value: any;
    onChange: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    valueArray: any[];
    helpText: string;
}

export default class Selector extends React.Component<ISelectorProps> {

    constructor(props: ISelectorProps) {
        super(props);
    }

    public render() {
        const {value, onChange, valueArray, helpText, keyValue, emptyValue} = this.props;

        return (
            <React.Fragment>
                <form>
                    <FormControl>
                        <Select
                            value={value}
                            onChange={onChange}
                            displayEmpty={false}
                            autoWidth={true}
                            style={{textAlign: "center"}}
                            variant={"outlined"}
                            name={keyValue}
                        >
                            {emptyValue && <MenuItem key="1" value={""}> <em>{emptyValue}</em></MenuItem>}
                            {valueArray.map((singleValue: any, index: number) => {
                                return (
                                    <MenuItem
                                        key={index + 1}
                                        value={singleValue}
                                        style={{textAlign: "center"}}
                                    >
                                        {singleValue}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {helpText && <FormHelperText>{helpText}</FormHelperText>}
                    </FormControl>
                </form>
            </React.Fragment>
        );
    }
}
