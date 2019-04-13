import * as React from "react";
import {Grid, TextField} from "@material-ui/core";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import FormColorField from "../core/simple/FormColorField";
import FormCheckBox from "../core/simple/FormCheckBox";
import {ChangeEvent} from "react";
import Selector from "../core/simple/Selector";
import {ReactNode} from "react";

export interface IMoveMoneyFormValues {
    srcAccountId: number;
    trgAccountId: number;
    value: number;
}

export interface IMoveMoneyFormHandler {
    srcAccountId: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    trgAccountId: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    value: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IMoveMoneyFormProps {
    formId: string;
    accounts: AccountModel[];
    values: IMoveMoneyFormValues;
    handler: IMoveMoneyFormHandler;
}

export interface IMoveMoneyFormState {
    textAccounts: string[];
}

export const defaultState: IMoveMoneyFormState = {
    textAccounts: []
};

export default class MoveMoneyForm extends React.Component<IMoveMoneyFormProps, IMoveMoneyFormState> {

    public static getDerivedStateFromProps(newProps: IMoveMoneyFormProps, oldState: IMoveMoneyFormState)
        : IMoveMoneyFormState {

        const newTextAccounts = newProps.accounts.map((account: AccountModel): string => {
            return account.name;
        });

        return {
            textAccounts: newTextAccounts,
        };
    }

    public state: IMoveMoneyFormState = defaultState;


    constructor(props: IMoveMoneyFormProps) {
        super(props);
    }

    public render() {
        const {formId, values, handler, accounts} = this.props;
        const {textAccounts} = this.state;

        return (
            <React.Fragment>
                <form id={formId}>
                    <Grid container spacing={8}>
                        <Grid xs={6}>
                            <Selector value={values.srcAccountId}
                                      onChange={handler.srcAccountId}
                                      valueArray={textAccounts}
                                      helpText={"Quellkonto"}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <Selector value={values.trgAccountId}
                                      onChange={handler.trgAccountId}
                                      valueArray={textAccounts}
                                      helpText={"Zielkonto"}
                            />
                        </Grid>
                        <Grid xs={6}>
                            <TextField margin="dense"
                                       id={accountFields.value.fieldName}
                                       label={accountFields.value.labelName}
                                       type="number"
                                       value={values.value}
                                       onChange={handler.value}
                                       fullWidth/>
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}
