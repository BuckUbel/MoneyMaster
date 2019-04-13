import * as React from "react";
import {
    DialogContentText, Fab
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import AddIcon from "@material-ui/icons/Add";
import AddCategoryForm, {IAddCategoryFormValues} from "../../forms/AddEntity/AddCategoryForm";
import {CategoryModel} from "../../../../../base/model/CategoryModel";

export interface IAddCategoryDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IAddCategoryFormValues) => void;
}

export interface IAddCategoryDialogState {
    entity: IAddCategoryFormValues;
}

const defaultState: IAddCategoryDialogState = {
    entity: CategoryModel.createEmptyEntity()
};
export default class AddCategoryDialog extends React.Component<IAddCategoryDialogProps, IAddCategoryDialogState> {

    public state: IAddCategoryDialogState = defaultState;

    public constructor(props: IAddCategoryDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleIsStandardChange = this.handleIsStandardChange.bind(this);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {name: value})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {description: value})
        }));
    }

    public handleColorChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState((prevState: IAddCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {color: value})
        }));
    }

    public handleIsStandardChange(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        this.setState((prevState: IAddCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {isStandard: checked})
        }));
    }

    public render() {
        const {onClick} = this.props;

        const formId = "addCategoryForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Kategorie hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="secondary"
                             aria-label="Hinzufügen">
                            <AddIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                >
                    <DialogContentText>
                       Geben Sie hier die nötige Daten für eine neue Kategorie ein.
                    </DialogContentText>
                    <AddCategoryForm
                        formId={formId}
                        values={this.state.entity}
                        handler={{
                            name: this.handleNameChange,
                            description: this.handleDescriptionChange,
                            color: this.handleColorChange,
                            isStandard: this.handleIsStandardChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
