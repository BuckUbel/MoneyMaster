import * as React from "react";
import StandardDialog from "./StandardDialog";
import {DialogContentText, Divider, Fab} from "@material-ui/core";
import ChangeVBookingsCategoryForm, {
    IChangeVBookingsCategoryParams
} from "../forms/ChangeVBookingsCategoryForm";
import {ChangeEvent} from "react";
import {ReactNode} from "react";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import {CategoryModel} from "../../../../base/model/CategoryModel";

export interface IChangeVBookingsCategoryDialogProps extends IChangeVBookingsCategoryDialogRealProps {
    categories: CategoryModel[];
}

export interface IChangeVBookingsCategoryDialogRealProps {
    onClick?: (fct: () => void) => void;
    submit: (params: IChangeVBookingsCategoryParams, ids: number[]) => void;
    categoryId: number;
    vBookingIds: number[];
}

export interface IChangeVBookingsCategoryDialogState {
    params: IChangeVBookingsCategoryParams;
}

export default class ChangeVBookingsCategoryDialog
    extends React.Component<IChangeVBookingsCategoryDialogProps, IChangeVBookingsCategoryDialogState> {

    public state: IChangeVBookingsCategoryDialogState = {
        params: {
            category: this.props.categories.find((category: CategoryModel): boolean => {
                return category.id === this.props.categoryId;
            })
        },
    };

    public constructor(props: IChangeVBookingsCategoryDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    public componentDidMount() {
        this.setState((oldState: IChangeVBookingsCategoryDialogState) => {
            const newParams = oldState.params;
            const newCategory = this.props.categories.find((category: CategoryModel): boolean => {
                return category.id === this.props.categoryId;
            });
            newParams.category = newCategory ? newCategory : null;
            return ({params: newParams});
        });
    }

    public onSubmit() {
        this.props.submit(this.state.params, this.props.vBookingIds);
    }

    public handleCategoryChange(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        const value = event.target.value;
        const newCategory = this.props.categories.find((category: CategoryModel): boolean => {
            return category.name === value;
        });
        this.setState((prevState: IChangeVBookingsCategoryDialogState) => ({
            params: Object.assign(prevState.params, {category: newCategory})
        }));
    }

    public render() {
        const {onClick, categories, vBookingIds} = this.props;
        const formId = "changeVBookingsCategory";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Virtuelle Buchungen bearbeiten"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen}
                             color="primary"
                             aria-label="Verschieben"
                             disabled={vBookingIds.length === 0}
                        >
                            <SwapHorizIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Wählen sie hier die neue Kategorie für ihre {vBookingIds.length} Einträge aus.
                    </DialogContentText>
                    <ChangeVBookingsCategoryForm
                        formId={formId}
                        categories={categories}
                        values={this.state.params}
                        handler={{
                            categoryName: this.handleCategoryChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
