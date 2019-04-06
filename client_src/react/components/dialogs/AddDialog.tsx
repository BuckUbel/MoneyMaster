import * as React from "react";
import {
    DialogContentText, Fab
} from "@material-ui/core";
import StandardDialog from "./StandardDialog";
import {ChangeEvent} from "react";
import AddAccountForm, {IAddAccountFormValues} from "../forms/AddAccountForm";
import AddIcon from "@material-ui/icons/Add";


export interface IAddDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IAddAccountFormValues) => void;
}

export interface IAddDialogState {
    entity: IAddAccountFormValues;
}

const defaultState: IAddDialogState = {
    entity: {
        name: "",
        description: "",
        color: "",
        isCore: true,
    }
};
export default class AddDialog extends React.Component<IAddDialogProps, IAddDialogState> {

    public state: IAddDialogState = defaultState;

    public constructor(props: IAddDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleIsCoreChange = this.handleIsCoreChange.bind(this);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddDialogState) => ({
            entity: Object.assign(prevState.entity, {entity: {name: value}})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddDialogState) => ({
            entity: Object.assign(prevState.entity, {entity: {description: value}})
        }));
    }

    public handleColorChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddDialogState) => ({
            entity: Object.assign(prevState.entity, {entity: {color: value}})
        }));
    }

    public handleIsCoreChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddDialogState) => ({
            entity: Object.assign(prevState.entity, {entity: {isCore: value}})
        }));
    }

    public render() {
        const {onClick} = this.props;

        const formId = "passwordForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Entität hinzufügen"}
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
                        Damit der Server sicher ihre Daten abrufen kann, benötigt er nach jedem Start ihr Passwort.
                        Wenn sie dieses einmal eingegeben haben.
                        Kann der Server zu seiner Laufzeit immer wieder darauf zugreifen.
                    </DialogContentText>
                    <AddAccountForm
                        formId={formId}
                        values={this.state.entity}
                        handler={{
                            name: this.handleNameChange,
                            description: this.handleDescriptionChange,
                            color: this.handleColorChange,
                            isCore: this.handleIsCoreChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
