import * as React from "react";
import {getAllNumbersBetweenTwoNumbers} from "../../../../../../base/helper/util";
import {ChangeEvent, ReactNode} from "react";
import Selector from "../../../core/simple/Selector";

export interface IPageSelecterProps {
    count: number;
    rowsPerPage: number;
    page: number;
    onPageChange: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
}

export default class PageSelector extends React.Component<IPageSelecterProps> {

    public render() {
        const {count, rowsPerPage, page, onPageChange} = this.props;
        const lastPage = Math.ceil(count / rowsPerPage);

        return (
            <React.Fragment>
                <Selector value={page + 1} onChange={onPageChange}
                          valueArray={getAllNumbersBetweenTwoNumbers(1, lastPage)}
                          helpText={"Seite wählen"}/>
            </React.Fragment>
        );
    }
}
