import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {shortDescriptionFields} from "../../../../../base/model/ShortDescriptionModel";

export interface IManageShortDescriptionFormValues {
    originalContent: string;
    replaceContent: string;
}

export interface IManageShortDescriptionFormHandler {
    originalContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    replaceContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IManageShortDescriptionFormProps {
    formId: string;
    values: IManageShortDescriptionFormValues;
    handler: IManageShortDescriptionFormHandler;
}

export interface IManageShortDescriptionFormState {
}

export const defaultState: IManageShortDescriptionFormState = {};

export default class ManageShortDescriptionForm extends React.Component<IManageShortDescriptionFormProps, IManageShortDescriptionFormState> {

    public state: IManageShortDescriptionFormState = defaultState;

    constructor(props: IManageShortDescriptionFormProps) {
        super(props);

    }

    public render() {
        const {formId, values, handler} = this.props;
        return (
            <React.Fragment>
                <form id={formId}>
                    <TextField autoFocus
                               margin="dense"
                               id={shortDescriptionFields.originalContent.fieldName}
                               label={shortDescriptionFields.originalContent.labelName}
                               type="text"
                               value={values.originalContent}
                               onChange={handler.originalContent}
                               fullWidth/>
                    <TextField margin="dense"
                               id={shortDescriptionFields.replaceContent.fieldName}
                               label={shortDescriptionFields.replaceContent.labelName}
                               type="text"
                               value={values.replaceContent}
                               onChange={handler.replaceContent}
                               fullWidth/>
                </form>
            </React.Fragment>
        );
    }
}
