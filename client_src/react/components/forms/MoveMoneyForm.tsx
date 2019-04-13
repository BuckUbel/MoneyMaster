import * as React from "react";
import {Grid, TextField} from "@material-ui/core";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import FormColorField from "../core/simple/FormColorField";
import FormCheckBox from "../core/simple/FormCheckBox";
import {ChangeEvent} from "react";
import Selector from "../core/simple/Selector";
import {ReactNode} from "react";
import {IMoveMoneyParams} from "../../containers/views/AccountViewContainer";

export interface IMoveMoneyFormHandler {
    srcAccountName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    trgAccountName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
    value: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IMoveMoneyFormProps {
    formId: string;
    accounts: AccountModel[];
    values: IMoveMoneyParams;
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

        const newTextAccounts = newProps.accounts.filter((account: AccountModel): boolean => {
            return account.isReal === false;
        }).map((account: AccountModel): string => {
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
        const {formId, values, handler} = this.props;
        const {textAccounts} = this.state;

        return (
            <React.Fragment>
                <form id={formId} autoComplete={"off"}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <Selector value={values.srcAccountName}
                                      onChange={handler.srcAccountName}
                                      valueArray={textAccounts}
                                      helpText={"Quellkonto"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Selector value={values.trgAccountName}
                                      onChange={handler.trgAccountName}
                                      valueArray={textAccounts}
                                      helpText={"Zielkonto"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={accountFields.value.fieldName}
                                       label={accountFields.value.labelName}
                                       type="number"
                                       value={values.value}
                                       onChange={handler.value}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}
