import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";

export interface IPasswordFormValues {
    password: string;
}

export interface IPasswordFormHandler {
    password: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IPasswordFormProps {
    formId: string;
    values: IPasswordFormValues;
    handler: IPasswordFormHandler;
}

export interface IPasswordFormState {
}

export const defaultState: IPasswordFormState = {};

export default class PasswordForm extends React.Component<IPasswordFormProps, IPasswordFormState> {

    public state: IPasswordFormState = defaultState;

    constructor(props: IPasswordFormProps) {
        super(props);

    }

    public render() {
        const {formId, values, handler} = this.props;
        return (
            <React.Fragment>
                <form id={formId}>
                    <TextField autoFocus
                               margin="dense"
                               id="password"
                               label="Passwort"
                               type="password"
                               value={values.password}
                               onChange={handler.password}
                               fullWidth/>
                </form>
            </React.Fragment>
        );
    }
}
