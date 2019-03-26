import * as React from "react";
import {ICol, IRow} from "./default/helper";
import {RenderThings} from "../../helper/util";
import EntityTable, {IEntityTableInformations} from "./EntityTable";
import ShortDescription from "../core/ShortDescription";
import {shortDescriptionFields, ShortDescriptionModel} from "../../../../base/model/ShortDescriptionModel";

export interface IShortDescriptionTableProps {
    shortDescriptions: ShortDescriptionModel[];
}

export default class ShortDescriptionTable extends React.Component<IShortDescriptionTableProps, {}> {

    constructor(props: IShortDescriptionTableProps) {
        super(props);
    }

    public render() {
        const {shortDescriptions} = this.props;

        return (
            <React.Fragment>
                <EntityTable
                    entities={shortDescriptions}
                    compareFunction={ShortDescription.compare}
                    getDisplay={ShortDescription.getDisplay}
                    entityTableConfiguration={shortDescriptionTableConfiguration}
                    baseClass={ShortDescription}
                />
            </React.Fragment>
        );
    }
}

export interface IShortDescriptionTableInformations<T extends RenderThings | ICol> extends IEntityTableInformations<T> {
    originalContent: T;
    replaceContent: T;

    [key: string]: T;
}

export const shortDescriptionTableConfiguration: IShortDescriptionTableInformations<ICol> = {
    id: {
        name: shortDescriptionFields.id.labelName,
        filtering: false,
        sorting: false,
        hidden: true,
        type: "number",
    },
    originalContent: {
        name: shortDescriptionFields.originalContent.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    replaceContent: {
        name: shortDescriptionFields.replaceContent.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
};
