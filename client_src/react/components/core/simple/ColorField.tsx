import * as React from "react";

export interface IColorFieldProps {
    color: string;
}

export default class ColorField extends React.Component<IColorFieldProps, {}> {

    public render() {
        const {color} = this.props;
        return (
            <React.Fragment>
                <div style={{backgroundColor: color, width: "10px", height: "10px"}}/>
            </React.Fragment>
        );
    }
}
