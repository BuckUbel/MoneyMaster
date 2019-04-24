import * as React from "react";
import StandardDialog from "./StandardDialog";
import {DialogContentText, Divider, Fab} from "@material-ui/core";
import EuroIcon from "@material-ui/icons/EuroSymbol";
import MoveMoneyForm, {IMoveMoneyParams} from "../forms/MoveMoneyForm";
import {ChangeEvent} from "react";
import {ReactNode} from "react";
import {AccountModel} from "../../../../base/model/AccountModel";

export interface IMoveMoneyDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (params: IMoveMoneyParams) => void;
    accounts: AccountModel[];
}

export interface IMoveMoneyDialogState {
    params: IMoveMoneyParams;
}

export const defaultState: IMoveMoneyDialogState = {
    params: {
        srcAccountName: "",
        trgAccountName: "",
        value: 0
    }
};

export default class MoveMoneyDialog extends React.Component<IMoveMoneyDialogProps, IMoveMoneyDialogState> {

    public state: IMoveMoneyDialogState = defaultState;

    public constructor(props: IMoveMoneyDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleSrcAccountIdChange = this.handleSrcAccountIdChange.bind(this);
        this.handleTrgAccountIdChange = this.handleTrgAccountIdChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public onSubmit() {
        this.props.submit(this.state.params);
    }

    public handleSrcAccountIdChange(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        const value = event.target.value;
        this.setState((prevState: IMoveMoneyDialogState) => ({
            params: Object.assign(prevState.params, {srcAccountName: value})
        }));
    }

    public handleTrgAccountIdChange(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        const value = event.target.value;
        this.setState((prevState: IMoveMoneyDialogState) => ({
            params: Object.assign(prevState.params, {trgAccountName: value})
        }));
    }

    public handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IMoveMoneyDialogState) => ({
            params: Object.assign(prevState.params, {value})
        }));
    }

    public render() {
        const {onClick, accounts} = this.props;

        const formId = "addAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Konto hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="primary"
                             aria-label="Hinzufügen">
                            <EuroIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Geben Sie hier die nötige Daten für ein neues virtuelles Konto ein.
                    </DialogContentText>
                    <MoveMoneyForm
                        formId={formId}
                        accounts={accounts}
                        values={this.state.params}
                        handler={{
                            srcAccountName: this.handleSrcAccountIdChange,
                            trgAccountName: this.handleTrgAccountIdChange,
                            value: this.handleValueChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
