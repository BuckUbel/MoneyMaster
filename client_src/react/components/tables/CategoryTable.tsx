import * as React from "react";
import {ICol, IRow} from "./default/helper";
import {RenderThings} from "../../helper/util";
import EntityTable, {IEntityTableInformations} from "./EntityTable";
import Category from "../core/Category";
import {categoryFields, CategoryModel} from "../../../../base/model/CategoryModel";
import CategoryContainer from "../../containers/core/CategoryContainer";

export interface ICategoryTableProps {
    categories: CategoryModel[];
}

export default class CategoryTable extends React.Component<ICategoryTableProps, {}> {

    constructor(props: ICategoryTableProps) {
        super(props);
    }

    public render() {
        const {categories} = this.props;

        return (
            <React.Fragment>
                <EntityTable
                    entities={categories}
                    compareFunction={Category.compare}
                    getDisplay={Category.getDisplay}
                    entityTableConfiguration={categoryTableConfiguration}
                    baseClass={CategoryContainer}
                    noFilter={true}
                    defaultSortRow={4}
                />
            </React.Fragment>
        );
    }
}

export interface ICategoryTableInformations<T extends RenderThings | ICol> extends IEntityTableInformations<T> {
    name: T;
    description: T;
    color: T;
    isStandard: T;

    [key: string]: T;
}

export const categoryTableConfiguration: ICategoryTableInformations<ICol> = {
    id: {
        name: categoryFields.id.labelName,
        filtering: false,
        sorting: false,
        hidden: true,
        type: "number",
    },
    name: {
        name: categoryFields.name.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    description: {
        name: categoryFields.description.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    color: {
        name: categoryFields.color.labelName,
        filtering: false,
        sorting: true,
        type: "string",
    },
    isStandard: {
        name: categoryFields.isStandard.labelName,
        filtering: false,
        sorting: true,
        type: "boolean",
    },
};
