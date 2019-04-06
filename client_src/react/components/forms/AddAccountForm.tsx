import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {accountFields} from "../../../../base/model/AccountModel";

export interface IAddAccountFormValues {
    name: string;
    description: string;
    color: string;
    isCore: boolean;
}

export interface IAddAccountFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    color: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    isCore: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IPasswordFormProps {
    formId: string;
    values: IAddAccountFormValues;
    handler: IAddAccountFormHandler;
}

export interface IAddAccountFormState {
}

export const defaultState: IAddAccountFormState = {};

export default class AddAccountForm extends React.Component<IPasswordFormProps, IAddAccountFormState> {

    public state: IAddAccountFormState = defaultState;

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
                               id={accountFields.name.fieldName}
                               label={accountFields.name.labelName}
                               type="text"
                               value={values.name}
                               onChange={handler.name}
                               fullWidth/>
                    <TextField margin="dense"
                               id={accountFields.description.fieldName}
                               label={accountFields.description.labelName}
                               type="text"
                               value={values.description}
                               onChange={handler.description}
                               fullWidth/>
                    <TextField margin="dense"
                               id={accountFields.color.fieldName}
                               label={accountFields.color.labelName}
                               type="color"
                               value={values.color}
                               onChange={handler.color}
                               fullWidth/>
                    <TextField margin="dense"
                               id={accountFields.isCore.fieldName}
                               label={accountFields.isCore.labelName}
                               type="checkbox"
                               value={values.isCore}
                               onChange={handler.isCore}
                               fullWidth/>
                </form>
            </React.Fragment>
        );
    }
}
