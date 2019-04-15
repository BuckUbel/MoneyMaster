import * as React from "react";
import {
    DialogContentText, Fab
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import ManageAccountForm, {IManageAccountFormValues} from "../../forms/ManageEntity/ManageAccountForm";
import AddIcon from "@material-ui/icons/Add";
import {AccountModel, IAccountIdentity} from "../../../../../base/model/AccountModel";

export interface IAddAccountDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IManageAccountFormValues[]) => void;
}

export interface IAddAccountDialogState {
    entity: IAccountIdentity;
}

const defaultState: IAddAccountDialogState = {
    entity: AccountModel.createEmptyEntity()
};
export default class AddAccountDialog extends React.Component<IAddAccountDialogProps, IAddAccountDialogState> {

    public state: IAddAccountDialogState = defaultState;

    public constructor(props: IAddAccountDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleIsCoreChange = this.handleIsCoreChange.bind(this);
    }

    public onSubmit() {
        this.props.submit([this.state.entity]);
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {name: value})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {description: value})
        }));
    }

    public handleColorChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {color: value})
        }));
    }

    public handleIsCoreChange(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        this.setState((prevState: IAddAccountDialogState) => ({
            entity: Object.assign(prevState.entity, {isCore: checked})
        }));
    }

    public render() {
        const {onClick} = this.props;

        const formId = "addAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Konto hinzufügen"}
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
                        Geben Sie hier die nötige Daten für ein neues virtuelles Konto ein.
                    </DialogContentText>
                    <ManageAccountForm
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
