import * as React from "react";

export interface ISimpleLinkProps {
    href: string;
    text?: string;
    label?: string;
}

export default class SimpleLink extends React.Component<ISimpleLinkProps, {}> {

    public render() {
        const {href, text, label} = this.props;
        return (
            <React.Fragment>
                {label} <a href={href}> {text ? text : href} </a>
            </React.Fragment>
        );
    }
}