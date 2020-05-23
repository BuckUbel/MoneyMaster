import * as React from "react";
import {ICol, IObjectWithEntityProp, IRow} from "./default/helper";
import {RenderThings} from "../../helper/util";
import DataTable, {SelectedActions} from "./default/DataTable";
import {Entity} from "../../../../base/helper/Entity";
import {getArrayFromObject} from "../../../../base/helper/util";

export interface IEntityTableInformations<T extends RenderThings | ICol> {
    id: T;

    [key: string]: T;
}

export interface IBookingTableProps {
    entities: Entity[];
    compareFunction: (a: Entity, b: Entity) => number;
    getDisplay: (a: Entity) => IEntityTableInformations<RenderThings>;
    entityTableConfiguration: any;
    baseClass: React.ComponentType<IObjectWithEntityProp>;
    noFilter?: boolean;
    defaultSortRow?: number;
    withCheckboxes?: boolean;
    selectedActions?: SelectedActions;
}

export default class EntityTable extends React.PureComponent<IBookingTableProps, {}> {

    constructor(props: IBookingTableProps) {
        super(props);
    }

    public render() {
        const {
            entities, compareFunction,
            getDisplay, entityTableConfiguration, baseClass,
            noFilter, defaultSortRow, withCheckboxes, selectedActions
        } = this.props;

        let data: IRow[] = [];
        let header: ICol[] = [];

        if (entities.length > 0) {
            data = entities.sort(compareFunction).reverse().map((entity: Entity): IRow => {
                return {id: Number(entity.id), content: getArrayFromObject(getDisplay(entity))};
            });
            header = Object.keys(getDisplay(entities[0])).map((prop): ICol => {
                return ({
                    key: prop,
                    name: entityTableConfiguration[prop].name,
                    type: entityTableConfiguration[prop].type,
                    filtering: entityTableConfiguration[prop].filtering,
                    filterOptions: entityTableConfiguration[prop].filterOptions,
                    styleOptions: entityTableConfiguration[prop].styleOptions,
                    sorting: entityTableConfiguration[prop].sorting,
                    hidden: entityTableConfiguration[prop].hidden,
                    style: entityTableConfiguration[prop].style
                });
            });
        }

        return (
            <React.Fragment>
                {entities.length > 0 &&
                <DataTable
                    rowData={data}
                    colData={header}
                    baseData={entities}
                    baseClass={baseClass}
                    defaultSortRow={defaultSortRow ? defaultSortRow : 0}
                    noFilter={noFilter}
                    withCheckboxes={withCheckboxes}
                    selectedActions={selectedActions}
                />
                }
            </React.Fragment>
        );
    }
}
