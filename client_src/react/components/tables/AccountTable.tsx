import * as React from "react";
import {ICol, IRow} from "./default/helper";
import {RenderThings} from "../../helper/util";
import EntityTable, {IEntityTableInformations} from "./EntityTable";
import Account from "../core/Account";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import AccountContainer from "../../containers/core/AccountContainer";

export interface IAccountTableProps {
    accounts: AccountModel[];
}

export default class AccountTable extends React.Component<IAccountTableProps, {}> {

    constructor(props: IAccountTableProps) {
        super(props);
    }

    public render() {
        const {accounts} = this.props;

        return (
            <React.Fragment>
                <EntityTable
                    entities={accounts}
                    compareFunction={Account.compare}
                    getDisplay={Account.getDisplay}
                    entityTableConfiguration={accountTableConfiguration}
                    baseClass={AccountContainer}
                    noFilter={true}
                    defaultSortRow={3}
                />
            </React.Fragment>
        );
    }
}

export interface IAccountTableInformations<T extends RenderThings | ICol> extends IEntityTableInformations<T> {
    name: T;
    description: T;
    value: T;
    color: T;
    isReal: T;
    isCore: T;

    [key: string]: T;
}

export const accountTableConfiguration: IAccountTableInformations<ICol> = {
    id: {
        name: accountFields.id.labelName,
        filtering: false,
        sorting: false,
        hidden: true,
        type: "number",
    },
    name: {
        name: accountFields.name.labelName,
        filtering: true,
        sorting: true,
        type: "string",
    },
    description: {
        name: accountFields.description.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    value: {
        name: accountFields.value.labelName,
        filtering: true,
        sorting: true,
        type: "number",
        styleOptions: {
            coloredNumbers: true
        }
    },
    color: {
        name: accountFields.color.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    isReal: {
        name: accountFields.isReal.labelName,
        filtering: false,
        sorting: true,
        type: "boolean",
    },
    isCore: {
        name: accountFields.isCore.labelName,
        filtering: false,
        sorting: true,
        type: "boolean",
    },
};
