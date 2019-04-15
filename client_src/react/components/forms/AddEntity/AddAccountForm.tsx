import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {accountFields} from "../../../../../base/model/AccountModel";
import FormColorField from "../../core/simple/FormColorField";
import {categoryFields} from "../../../../../base/model/CategoryModel";
import FormCheckBox from "../../core/simple/FormCheckBox";

export interface IAddAccountFormValues {
    name: string;
    description: string;
    color: string;
    isCore: boolean;
}

export interface IAddAccountFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    color: (event: ChangeEvent<HTMLInputElement>) => void;
    isCore: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IAddAccountFormProps {
    formId: string;
    values: IAddAccountFormValues;
    handler: IAddAccountFormHandler;
}

export interface IAddAccountFormState {
}

export const defaultState: IAddAccountFormState = {};

export default class AddAccountForm extends React.Component<IAddAccountFormProps, IAddAccountFormState> {

    public state: IAddAccountFormState = defaultState;

    constructor(props: IAddAccountFormProps) {
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
                               multiline
                               value={values.description}
                               onChange={handler.description}
                               fullWidth/>
                    <FormColorField id={categoryFields.color.fieldName}
                                    label={categoryFields.color.labelName}
                                    value={values.color}
                                    onChange={handler.color}
                    />
                    <FormCheckBox id={accountFields.isCore.fieldName}
                                  label={accountFields.isCore.labelName}
                                  value={values.isCore}
                                  onChange={handler.isCore}
                    />
                </form>
            </React.Fragment>
        );
    }
}
