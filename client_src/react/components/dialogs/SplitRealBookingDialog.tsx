import * as React from "react";
import StandardDialog from "./StandardDialog";
import {DialogContentText, Divider, Fab} from "@material-ui/core";
import SplitRealBookingForm, {
    ISplitRealBookingFormProps,
    ISplitRealBookingFormState,
    ISplitRealBookingParams
} from "../forms/SplitRealBookingForm";
import {ChangeEvent} from "react";
import {ReactNode} from "react";
import EditIcon from "@material-ui/icons/Edit";
import {AccountModel} from "../../../../base/model/AccountModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {VBookingModel} from "../../../../base/model/VBookingModel";
import {IEditAccountDialogState} from "./EditEntity/EditAccountDialog";
import {BookingModel} from "../../../../base/model/BookingModel";

export interface ISplitRealBookingDialogProps extends ISplitRealBookingDialogRealProps {
    categories: CategoryModel[];
    associatedVBookings: VBookingModel[];
    associatedBooking: BookingModel;
}

export interface ISplitRealBookingDialogRealProps {
    onClick?: (fct: () => void) => void;
    submit: (params: ISplitRealBookingParams, oldEntity: VBookingModel) => void;
    entity: VBookingModel;
}

export interface ISplitRealBookingDialogState {
    params: ISplitRealBookingParams;
    maxValue: number;
    minValue: number;
}

export default class SplitRealBookingDialog
    extends React.Component<ISplitRealBookingDialogProps, ISplitRealBookingDialogState> {

    public static getDerivedStateFromProps(
        newProps: ISplitRealBookingDialogProps,
        oldState: ISplitRealBookingDialogState
    )
        : ISplitRealBookingDialogState {

        const associatedVBookingSum = newProps.associatedVBookings.length > 0 ? newProps.associatedVBookings
            .map(
                (aVB) => aVB.value)
            .reduce(
                (acc, cV) => acc + cV) : 0;
        const newMaxValue: number = newProps.associatedBooking.value - associatedVBookingSum;

        return {
            params: oldState.params,
            maxValue: newProps.associatedBooking.value > 0 ? newMaxValue : 0,
            minValue: newProps.associatedBooking.value > 0 ? 0 : newMaxValue
        };
    }

    public state: ISplitRealBookingDialogState = {
        params: {
            name: this.props.entity.name,
            description: this.props.entity.description,
            value: this.props.entity.value,
            category: CategoryModel.createEmptyEntity()
        },
        maxValue: 0,
        minValue: 0,
    };

    public constructor(props: ISplitRealBookingDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public componentDidMount() {

        this.setState((oldState: ISplitRealBookingDialogState) => {
            const newParams = oldState.params;
            const newCategory = this.props.categories.find((category: CategoryModel): boolean => {
                return category.id === this.props.entity.categoryId;
            });
            // newParams.categoryName = newCategory ? newCategory.name ? newCategory.name : "" : "";
            newParams.category = newCategory ? newCategory : null;
            return ({params: newParams});
        });
    }

    public onSubmit() {
        this.props.submit(this.state.params, this.props.entity);
    }

    public handleCategoryChange(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        const value = event.target.value;
        const newCategory = this.props.categories.find((category: CategoryModel): boolean => {
            return category.name === value;
        });
        this.setState((prevState: ISplitRealBookingDialogState) => ({
            params: Object.assign(prevState.params, {category: newCategory})
        }));
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: ISplitRealBookingDialogState) => ({
            params: Object.assign(prevState.params, {name: value})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: ISplitRealBookingDialogState) => ({
            params: Object.assign(prevState.params, {description: value})
        }));
    }

    public handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = Number(event.target.value);
        this.setState((prevState: ISplitRealBookingDialogState) => {
            // const {maxValue, minValue} = prevState;
            // let newValue = prevState.params.value;
            // if (value < maxValue && value > minValue) {
            //     newValue = value;
            // }
            return ({params: Object.assign(prevState.params, {value})});
        });
    }

    public render() {
        const {onClick, categories, associatedBooking} = this.props;
        const {maxValue, minValue} = this.state;
        const formId = "addAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Konto hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="primary"
                             aria-label="Hinzufügen">
                            <EditIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Geben Sie hier die nötigen Daten für die Aufteilung dieser realen Buchung in Virtuelle ein.
                    </DialogContentText>
                    <SplitRealBookingForm
                        formId={formId}
                        categories={categories}
                        values={this.state.params}
                        maxValue={maxValue}
                        minValue={minValue}
                        handler={{
                            name: this.handleNameChange,
                            description: this.handleDescriptionChange,
                            value: this.handleValueChange,
                            categoryName: this.handleCategoryChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
