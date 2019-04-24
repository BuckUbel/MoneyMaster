import * as React from "react";
import {RenderThings} from "../../../helper/util";
import {Typography} from "@material-ui/core";

export interface IMultilineTextProps {
    text: string;
}

export interface IMultilineTextState {
    multilineText: RenderThings;
}

export const defaultState: IMultilineTextState = {
    multilineText: ""
};

export default class MultilineText extends React.Component<IMultilineTextProps, IMultilineTextState> {

    public static getDerivedStateFromProps(nextProps: IMultilineTextProps, prevState: IMultilineTextState)
        : IMultilineTextState {
        const {text} = nextProps;
        const newMultilineText = text ? text.split("\n").map((i: string, key: number) => {
            return <Typography component={"p"} key={key}>{i}</Typography>;
        }) : "";
        return ({
            multilineText: newMultilineText
        });
    }

    public state: IMultilineTextState = defaultState;

    constructor(props: IMultilineTextProps) {
        super(props);
    }

    public render() {
        const {multilineText} = this.state;
        return (
            <React.Fragment>
                {multilineText}
            </React.Fragment>
        );
    }
}
