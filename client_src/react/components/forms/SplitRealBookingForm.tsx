import * as React from "react";
import {Grid, Input, InputAdornment, TextField, Typography} from "@material-ui/core";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import {ChangeEvent} from "react";
import Selector from "../core/simple/Selector";
import {ReactNode} from "react";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import Booking from "../core/Booking";
import {vBookingFields, VBookingModel} from "../../../../base/model/VBookingModel";

export interface ISplitRealBookingParams {
    name: string;
    description: string;
    category: CategoryModel;
    value: number;
}

export interface ISplitRealBookingFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    categoryName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
}

export interface ISplitRealBookingFormProps {
    formId: string;
    categories: CategoryModel[];
    maxValue: number;
    minValue: number;
    values: ISplitRealBookingParams;
    handler: ISplitRealBookingFormHandler;
}

export interface ISplitRealBookingFormState {
    textCategories: string[];
    textCategory: string;
}

export const defaultState: ISplitRealBookingFormState = {
    textCategories: [],
    textCategory: "",
};

export default class SplitRealBookingForm
    extends React.Component<ISplitRealBookingFormProps, ISplitRealBookingFormState> {

    public static getDerivedStateFromProps(newProps: ISplitRealBookingFormProps, oldState: ISplitRealBookingFormState)
        : ISplitRealBookingFormState {

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

    public state: ISplitRealBookingFormState = defaultState;

    constructor(props: ISplitRealBookingFormProps) {
        super(props);
    }

    public render() {
        const {formId, values, handler, maxValue, minValue} = this.props;
        const {textCategories, textCategory} = this.state;

        const reallyMaxValue = maxValue === 0 ? minValue : maxValue;
        const calcRest = maxValue === 0 ? Number(((minValue - values.value) * (-1)).toFixed(2))
            : Number(((maxValue - values.value) * (-1)).toFixed(2));
        return (
            <React.Fragment>
                <form id={formId} autoComplete={"off"}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={vBookingFields.name.fieldName}
                                       label={vBookingFields.name.labelName}
                                       type="text"
                                       value={values.name}
                                       onChange={handler.name}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField margin="dense"
                                       id={vBookingFields.description.fieldName}
                                       label={vBookingFields.description.labelName}
                                       type="text"
                                       multiline
                                       rows={2}
                                       value={values.description}
                                       onChange={handler.description}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4}>
                                <TextField margin="dense"
                                           id={vBookingFields.value.fieldName}
                                           label={vBookingFields.value.labelName}
                                           type="number"
                                           inputProps={{max: maxValue, min: minValue}}
                                           value={values.value}
                                           onChange={handler.value}
                                           fullWidth
                                           autoComplete={"off"}
                                           InputProps={{
                                               startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                               style: Booking.getColorOnBaseOfValue(values.value)
                                           }}
                                />
                            </Grid>
                            <Grid container item xs={12} justify={"flex-start"} spacing={8}>
                                <Grid item xs={3}>
                                    <TextField
                                        margin={"dense"}
                                        label="Übriger Wert"
                                        variant={"outlined"}
                                        value={Booking.getColoredString(calcRest)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                            readOnly: true,
                                            style: Booking.getColorOnBaseOfValue(calcRest)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        margin={"dense"}
                                        label="Maximal Wert"
                                        variant={"outlined"}
                                        value={Booking.getColoredString(reallyMaxValue)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                            readOnly: true,
                                            style: Booking.getColorOnBaseOfValue(reallyMaxValue)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
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
