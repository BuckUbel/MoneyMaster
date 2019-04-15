import * as React from "react";
import {
    DialogContentText, Fab
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import AddIcon from "@material-ui/icons/Add";
import ManageShortDescriptionForm, {IManageShortDescriptionFormValues} from "../../forms/ManageEntity/ManageShortDescriptionForm";
import {ShortDescriptionModel} from "../../../../../base/model/ShortDescriptionModel";

export interface IAddShortDescriptionDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IManageShortDescriptionFormValues) => void;
}

export interface IAddShortDescriptionDialogState {
    entity: IManageShortDescriptionFormValues;
}

const defaultState: IAddShortDescriptionDialogState = {
    entity: ShortDescriptionModel.createEmptyEntity()
};
export default class AddShortDescriptionDialog extends React.Component<IAddShortDescriptionDialogProps, IAddShortDescriptionDialogState> {

    public state: IAddShortDescriptionDialogState = defaultState;

    public constructor(props: IAddShortDescriptionDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOriginalContentChange = this.handleOriginalContentChange.bind(this);
        this.handleReplaceContentChange = this.handleReplaceContentChange.bind(this);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleOriginalContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddShortDescriptionDialogState) => ({
            entity: Object.assign(prevState.entity, {originalContent: value})
        }));
    }

    public handleReplaceContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddShortDescriptionDialogState) => ({
            entity: Object.assign(prevState.entity, {replaceContent: value})
        }));
    }


    public render() {
        const {onClick} = this.props;

        const formId = "addShortDescriptionForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Kategorie hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="secondary"
                             aria-label="Hinzufügen">
                            <AddIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                       Geben Sie hier die nötige Daten für eine neue Kategorie ein.
                    </DialogContentText>
                    <ManageShortDescriptionForm
                        formId={formId}
                        values={this.state.entity}
                        handler={{
                            originalContent: this.handleOriginalContentChange,
                            replaceContent: this.handleReplaceContentChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
