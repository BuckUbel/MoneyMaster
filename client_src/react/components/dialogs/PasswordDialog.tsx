import * as React from "react";
import {
    DialogContentText, TextField
} from "@material-ui/core";
import StandardDialog from "./StandardDialog";
import IconButton from "@material-ui/core/Button/Button";
import ClouddownloadIcon from "@material-ui/icons/CloudDownload";
import {ChangeEvent} from "react";

export interface IPasswordDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (password: string) => void;
}

export interface IPasswordDialogState {
    password: string;
}

const defaultState: IPasswordDialogState = {
    password: ""
};
export default class PasswordDialog extends React.Component<IPasswordDialogProps, IPasswordDialogState> {

    public state: IPasswordDialogState = defaultState;

    public constructor(props: IPasswordDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    public onSubmit(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.props.submit(this.state.password);
    }

    public handlePasswordChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({password: event.target.value});
    }

    public render() {
        const {onClick} = this.props;
        return (
            <React.Fragment>
                <StandardDialog
                    title={"Passwort eintragen"}
                    createOpenButton={(handleOpen) =>
                        <IconButton onClick={onClick ? () => onClick(handleOpen) : handleOpen} color={"inherit"}>
                            <ClouddownloadIcon/>
                        </IconButton>
                    }
                    // openFunction={}
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Damit der Server sicher ihre Daten abrufen kann, benötigt er nach jedem Start ihr Passwort.
                        Wenn sie dieses einmal eingegeben haben.
                        Kann der Server zu seiner Laufzeit immer wieder darauf zugreifen.
                    </DialogContentText>
                    <form id="passwordForm">
                        <TextField autoFocus
                                   margin="dense"
                                   id="name"
                                   label="Passwort"
                                   type="password"
                                   value={this.state.password}
                                   onChange={this.handlePasswordChange}
                                   fullWidth/>
                    </form>
                </StandardDialog>
            </React.Fragment>
        );
    }
}
