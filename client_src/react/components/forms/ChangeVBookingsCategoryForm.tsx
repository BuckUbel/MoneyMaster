import * as React from "react";
import {Grid, Input, InputAdornment, TextField, Typography} from "@material-ui/core";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import {ChangeEvent} from "react";
import Selector from "../core/simple/Selector";
import {ReactNode} from "react";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import Booking from "../core/Booking";
import {vBookingFields, VBookingModel} from "../../../../base/model/VBookingModel";

export interface IChangeVBookingsCategoryParams {
    category: CategoryModel;
}

export interface IChangeVBookingsCategoryFormHandler {
    categoryName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
}

export interface IChangeVBookingsCategoryFormProps {
    formId: string;
    categories: CategoryModel[];
    values: IChangeVBookingsCategoryParams;
    handler: IChangeVBookingsCategoryFormHandler;
}

export interface IChangeVBookingsCategoryFormState {
    textCategories: string[];
    textCategory: string;
}

export const defaultState: IChangeVBookingsCategoryFormState = {
    textCategories: [],
    textCategory: "",
};

export default class ChangeVBookingsCategoryForm
    extends React.Component<IChangeVBookingsCategoryFormProps, IChangeVBookingsCategoryFormState> {

    public static getDerivedStateFromProps(
        newProps: IChangeVBookingsCategoryFormProps,
        oldState: IChangeVBookingsCategoryFormState)
        : IChangeVBookingsCategoryFormState {

        let newTextCategory = "";
        const newTextCategories = newProps.categories.map((category: CategoryModel): string => {
            if (category.id === newProps.values.category.id) {
                newTextCategory = category.name;
            }
            return category.name;
        });

        return {
            textCategories: newTextCategories,
            textCategory: newTextCategory
        };
    }

    public state: IChangeVBookingsCategoryFormState = defaultState;

    constructor(props: IChangeVBookingsCategoryFormProps) {
        super(props);
    }

    public render() {
        const {formId, handler} = this.props;
        const {textCategories, textCategory} = this.state;

        return (
            <React.Fragment>
                <form id={formId} autoComplete={"off"}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <Selector value={textCategory}
                                      onChange={handler.categoryName}
                                      valueArray={textCategories}
                                      helpText={"Kategorie"}
                            />
                        </Grid>
                    </Grid>
                </form>
            </React.Fragment>
        );
    }
}
