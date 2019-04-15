import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {accountFields} from "../../../../../base/model/AccountModel";
import FormColorField from "../../core/simple/FormColorField";
import {categoryFields} from "../../../../../base/model/CategoryModel";
import FormCheckBox from "../../core/simple/FormCheckBox";

export interface IManageAccountFormValues {
    name: string;
    description: string;
    color: string;
    isCore: boolean;
}

export interface IManageAccountFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    color: (event: ChangeEvent<HTMLInputElement>) => void;
    isCore: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IManageAccountFormProps {
    formId: string;
    values: IManageAccountFormValues;
    handler: IManageAccountFormHandler;
}

export interface IManageAccountFormState {
}

export const defaultState: IManageAccountFormState = {};

export default class ManageAccountForm extends React.Component<IManageAccountFormProps, IManageAccountFormState> {

    public state: IManageAccountFormState = defaultState;

    constructor(props: IManageAccountFormProps) {
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
