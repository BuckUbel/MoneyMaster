import * as React from "react";
import StandardDialog from "./StandardDialog";
import {DialogContentText, Divider, Fab} from "@material-ui/core";
import EuroIcon from "@material-ui/icons/EuroSymbol";
import BookOnVirtualAccountForm, {IBookOnVirtualAccountParams} from "../forms/BookOnVirtualAccountForm";
import {ChangeEvent} from "react";
import {ReactNode} from "react";
import {AccountModel} from "../../../../base/model/AccountModel";
import {CategoryModel} from "../../../../base/model/CategoryModel";
import {VBookingModel} from "../../../../base/model/VBookingModel";

export interface IBookOnVirtualAccountDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (params: IBookOnVirtualAccountParams) => void;
    categories: CategoryModel[];
    entity: VBookingModel;
}

export interface IBookOnVirtualAccountDialogState {
    params: IBookOnVirtualAccountParams;
}

export const defaultState: IBookOnVirtualAccountDialogState = {
    params: {
        name: "",
        description: "",
        value: 0,
        categoryName: ""
    }
};

export default class BookOnVirtualAccountDialog
    extends React.Component<IBookOnVirtualAccountDialogProps, IBookOnVirtualAccountDialogState> {

    public state: IBookOnVirtualAccountDialogState = defaultState;

    public constructor(props: IBookOnVirtualAccountDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    public onSubmit() {
        this.props.submit(this.state.params);
    }

    public handleCategoryChange(event: ChangeEvent<HTMLSelectElement>, child: ReactNode) {
        const value = event.target.value;
        this.setState((prevState: IBookOnVirtualAccountDialogState) => ({
            params: Object.assign(prevState.params, {categoryName: value})
        }));
    }
    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IBookOnVirtualAccountDialogState) => ({
            params: Object.assign(prevState.params, {name: value})
        }));
    }
    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IBookOnVirtualAccountDialogState) => ({
            params: Object.assign(prevState.params, {description: value})
        }));
    }
    public handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IBookOnVirtualAccountDialogState) => ({
            params: Object.assign(prevState.params, {value})
        }));
    }

    public render() {
        const {onClick, categories} = this.props;

        const formId = "addAccountForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Konto hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="primary"
                             aria-label="Hinzufügen">
                            <EuroIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                        Geben Sie hier die nötige Daten für ein neues virtuelles Konto ein.
                    </DialogContentText>
                    <BookOnVirtualAccountForm
                        formId={formId}
                        categories={categories}
                        values={this.state.params}
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
