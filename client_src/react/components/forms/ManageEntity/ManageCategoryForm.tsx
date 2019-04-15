import * as React from "react";
import {Checkbox, TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {categoryFields} from "../../../../../base/model/CategoryModel";
import FormCheckBox from "../../core/simple/FormCheckBox";
import FormColorField from "../../core/simple/FormColorField";

export interface IManageCategoryFormValues {
    name: string;
    description: string;
    color: string;
    isStandard: boolean;
}

export interface IManageCategoryFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    color: (event: ChangeEvent<HTMLInputElement>) => void;
    isStandard: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IManageCategoryFormProps {
    formId: string;
    values: IManageCategoryFormValues;
    handler: IManageCategoryFormHandler;
}

export interface IManageCategoryFormState {
}

export const defaultState: IManageCategoryFormState = {};

export default class ManageCategoryForm extends React.Component<IManageCategoryFormProps, IManageCategoryFormState> {

    public state: IManageCategoryFormState = defaultState;

    constructor(props: IManageCategoryFormProps) {
        super(props);

    }

    public render() {
        const {formId, values, handler} = this.props;
        return (
            <React.Fragment>
                <form id={formId}>
                    <TextField autoFocus
                               margin="dense"
                               id={categoryFields.name.fieldName}
                               label={categoryFields.name.labelName}
                               type="text"
                               value={values.name}
                               onChange={handler.name}
                               fullWidth
                    />
                    <TextField margin="dense"
                               id={categoryFields.description.fieldName}
                               label={categoryFields.description.labelName}
                               type="text"
                               value={values.description}
                               onChange={handler.description}
                               fullWidth
                    />
                    <FormColorField id={categoryFields.color.fieldName}
                                    label={categoryFields.color.labelName}
                                    value={values.color}
                                    onChange={handler.color}
                    />
                    <FormCheckBox id={categoryFields.isStandard.fieldName}
                                  label={categoryFields.isStandard.labelName}
                                  value={values.isStandard}
                                  onChange={handler.isStandard}
                    />
                </form>
            </React.Fragment>
        );
    }
}
