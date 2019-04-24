import * as React from "react";
import {Grid, TextField} from "@material-ui/core";
import {ChangeEvent} from "react";
import {vBookingFields} from "../../../../../base/model/VBookingModel";
import {CategoryModel} from "../../../../../base/model/CategoryModel";
import Selector from "../../core/simple/Selector";
import {ReactNode} from "react";

export interface IManageVBookingFormValues {
    name: string;
    description: string;
    categoryName: string;
    value: number;
}

export interface IManageVBookingFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    categoryName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
}

export interface IManageVBookingFormProps {
    formId: string;
    values: IManageVBookingFormValues;
    handler: IManageVBookingFormHandler;
    categories: CategoryModel[];
}

export interface IManageVBookingFormState {
    textCategories: string[];
}

export const defaultState: IManageVBookingFormState = {
    textCategories: []
};

export default class ManageVBookingForm extends React.Component<IManageVBookingFormProps, IManageVBookingFormState> {

    public static getDerivedStateFromProps(newProps: IManageVBookingFormProps, oldState: IManageVBookingFormState)
        : IManageVBookingFormState {

        const newTextCategories = newProps.categories.filter((category: CategoryModel): boolean => {
            return category.isStandard === false;
        }).map((account: CategoryModel): string => {
            return account.name;
        });
        return {
            textCategories: newTextCategories,
        };
    }

    public state: IManageVBookingFormState = defaultState;

    constructor(props: IManageVBookingFormProps) {
        super(props);

    }

    public render() {
        const {formId, values, handler} = this.props;
        return (
            <React.Fragment>
                <form id={formId}>
                    <TextField autoFocus
                               margin="dense"
                               id={vBookingFields.name.fieldName}
                               label={vBookingFields.name.labelName}
                               type="text"
                               value={values.name}
                               onChange={handler.name}
                               fullWidth/>
                    <TextField margin="dense"
                               id={vBookingFields.description.fieldName}
                               label={vBookingFields.description.labelName}
                               type="text"
                               multiline
                               value={values.description}
                               onChange={handler.description}
                               fullWidth/>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <Selector value={values.categoryName}
                                      onChange={handler.categoryName}
                                      valueArray={this.state.textCategories}
                                      helpText={"Quellkonto"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={vBookingFields.value.fieldName}
                                       label={vBookingFields.value.labelName}
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
