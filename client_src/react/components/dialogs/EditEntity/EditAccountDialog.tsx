import * as React from "react";
import {
    Button,
    DialogContentText, Fab, Tooltip
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import ManageAccountForm from "../../forms/ManageEntity/ManageAccountForm";
import EditIcon from "@material-ui/icons/Edit";
import {AccountModel, IAccountIdentity} from "../../../../../base/model/AccountModel";

export interface IEditAccountDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IAccountIdentity) => void;
    delete: (id: number) => void;
    entity: IAccountIdentity;
}

export interface IEditAccountDialogState {
    entity: IAccountIdentity;
}

const defaultState: IEditAccountDialogState = {
    entity: AccountModel.createEmptyEntity()
};
export default class EditAccountDialog extends React.Component<IEditAccountDialogProps, IEditAccountDialogState> {

    public state: IEditAccountDialogState = Object.assign({}, defaultState, this.props);

    public constructor(props: IEditAccountDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleIsCoreChange = this.handleIsCoreChange.bind(this);

    }

    public handleDelete() {
        this.props.delete(this.state.entity.id);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {name: value})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {description: value})
        }));
    }

    public handleColorChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {color: value})
        }));
    }

    public handleIsCoreChange(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        this.setState((prevState: IEditAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {isCore: checked})
        }));
    }

    public render() {
        const {onClick} = this.props;
        const {entity} = this.state;

        const formId = "editAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Konto hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="secondary"
                             aria-label="Hinzufügen">
                            <EditIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                    optionalActions={
                        (handleClose) =>
                            <Tooltip title={"Nur freie virtuelle Konten können gelöscht werden."} enterDelay={300}>
                                <span>
                                <Button disabled={entity.isReal || entity.isCore} onClick={() => {
                                    handleClose();
                                    this.handleDelete();
                                }} color="secondary">
                                    Löschen
                                </Button>
                                </span>
                            </Tooltip>
                    }
                >
                    <DialogContentText>
                        Verändern Sie hier die nötigen Daten für das ausgewählte Konto ein.
                    </DialogContentText>
                    <ManageAccountForm
                        formId={formId}
                        values={entity}
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
