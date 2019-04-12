import * as React from "react";
import {TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {shortDescriptionFields} from "../../../../base/model/ShortDescriptionModel";

export interface IAddShortDescriptionFormValues {
    originalContent: string;
    replaceContent: string;
}

export interface IAddShortDescriptionFormHandler {
    originalContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    replaceContent: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IAddShortDescriptionFormProps {
    formId: string;
    values: IAddShortDescriptionFormValues;
    handler: IAddShortDescriptionFormHandler;
}

export interface IAddShortDescriptionFormState {
}

export const defaultState: IAddShortDescriptionFormState = {};

export default class AddShortDescriptionForm extends React.Component<IAddShortDescriptionFormProps, IAddShortDescriptionFormState> {

    public state: IAddShortDescriptionFormState = defaultState;

    constructor(props: IAddShortDescriptionFormProps) {
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
