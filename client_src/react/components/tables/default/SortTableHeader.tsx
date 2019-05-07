import * as React from "react";
import {Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from "@material-ui/core";
import {SortDirection} from "@material-ui/core/TableCell/TableCell";
import {ICol} from "./helper";
import {ChangeEvent} from "react";

export interface ITableHeaderProps {
    colData: ICol[];
    orderBy: number;
    order: SortDirection;
    sortHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>, property: number) => void;
    withCheckboxes?: boolean;
    handleSelectAll?: (event: ChangeEvent<HTMLInputElement>) => void;
    anythingIsSelected?: boolean;
}

export interface ITableHeaderState {
}

const defaultState: ITableHeaderState = {};
export default class SortTableHeader extends React.Component<ITableHeaderProps, ITableHeaderState> {

    public state: ITableHeaderState = defaultState;

    constructor(props: ITableHeaderProps) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    }

    public createSortHandler = (property: number) => {
        return (
            (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                this.props.sortHandler(event, property);
            });
    };

    public render() {
        const {colData, orderBy, order, withCheckboxes, handleSelectAll, anythingIsSelected} = this.props;
        return (
            <TableHead>
                <TableRow key={"-1"}>
                    {withCheckboxes &&
                    <TableCell key={1} padding={"checkbox"}>
                        <Checkbox onChange={handleSelectAll} indeterminate={anythingIsSelected}/>
                    </TableCell>}
                    {colData.map((colCell, index) => {
                        if (!colCell.hidden) {
                            return (
                                <TableCell
                                    key={colCell.key}
                                    style={colCell.style}
                                    sortDirection={orderBy === index ? order : false}>
                                    {colCell.sorting && order && <Tooltip
                                        title={(order === "desc") ? "Abwärts" : "Aufwärts"}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === index}
                                            direction={order}
                                            onClick={this.createSortHandler(index)}>
                                            <p>{colCell.name}</p>
                                        </TableSortLabel>
                                    </Tooltip>}
                                    {!colCell.sorting && <p>{colCell.name}</p>}
                                </TableCell>
                            );
                        }
                        return null;
                    })}
                </TableRow>
            </TableHead>
        );
    }
}
