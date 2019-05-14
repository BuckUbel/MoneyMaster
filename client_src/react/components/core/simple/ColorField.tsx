import * as React from "react";
import {CSSProperties} from "react";

export interface IColorFieldProps {
    color: string;
    style?: CSSProperties;
    className?: string;
}

export default class ColorField extends React.Component<IColorFieldProps, {}> {

    public render() {
        const {color, style, className} = this.props;
        return (
            <React.Fragment>
                <div className={className}
                     style={Object.assign({backgroundColor: color, width: "10px", height: "10px"}, style)}/>
            </React.Fragment>
        );
    }
}
