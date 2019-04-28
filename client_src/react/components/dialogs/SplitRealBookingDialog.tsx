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
    associatedBase: BookingModel|AccountModel;
}

export interface ISplitRealBookingDialogRealProps {
    onClick?: (fct: () => void) => void;
    submit: (params: ISplitRealBookingParams, oldEntity: VBookingModel) => void;
    entity: VBookingModel;
}

export interface ISplitRealBookingDialogState {
    params: ISplitRealBookingParams;
    originalParams: ISplitRealBookingParams;
    maxValue: number;
    minValue: number;
}

export default class SplitRealBookingDialog
    extends React.Component<ISplitRealBookingDialogProps, ISplitRealBookingDialogState> {

    public static VBookingToSplitRealBookingDialog(vb: VBookingModel): ISplitRealBookingParams {
        return {
            name: vb.name,
            description: vb.description,
            value: vb.value,
            category: CategoryModel.createEmptyEntity()
        };
    }

    public static getDerivedStateFromProps(
        newProps: ISplitRealBookingDialogProps,
        oldState: ISplitRealBookingDialogState
    )
        : ISplitRealBookingDialogState {
//TODO: finde the cause, why originalParams and params are equal

        const associatedVBookingSum = newProps.associatedVBookings.length > 0 ? newProps.associatedVBookings
            .map(
                (aVB) => aVB.value)
            .reduce(
                (acc, cV) => acc + cV) : 0;
        const newMaxValue: number = newProps.associatedBase.value - associatedVBookingSum;

        let newParams = oldState.params;
        const newOriginalParams = SplitRealBookingDialog.VBookingToSplitRealBookingDialog(newProps.entity);
        if (oldState.originalParams !== newOriginalParams) {
            newParams = Object.assign({}, newOriginalParams);
        }
        return {
            params: newParams,
            originalParams: newOriginalParams,
            maxValue: newProps.associatedBase.value > 0 ? newMaxValue : 0,
            minValue: newProps.associatedBase.value > 0 ? 0 : newMaxValue
        };
    }

    public state: ISplitRealBookingDialogState = {
        params: SplitRealBookingDialog.VBookingToSplitRealBookingDialog(this.props.entity),
        originalParams: SplitRealBookingDialog.VBookingToSplitRealBookingDialog(this.props.entity),
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
            newParams.category = newCategory ? newCategory : null;
            const newOriginalParams = oldState.originalParams;
            const newOriginalCategory = this.props.categories.find((category: CategoryModel): boolean => {
                return category.id === this.props.entity.categoryId;
            });
            newOriginalParams.category = newOriginalCategory ? newOriginalCategory : null;
            return ({params: newParams, originalParams: newOriginalParams});
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
        const {onClick, categories, associatedBase} = this.props;
        const {maxValue, minValue} = this.state;
        const formId = "addAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Virtuelle Buchung bearbeiten"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="primary"
                             aria-label="Bearbeiten">
                            <EditIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Geben Sie hier die nötigen Daten für die virtuelle Buchung ein.
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
