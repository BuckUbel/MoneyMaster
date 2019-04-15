import * as React from "react";
import {
    Button,
    DialogContentText, Fab, Tooltip
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddCategoryForm from "../../forms/AddEntity/AddCategoryForm";
import {CategoryModel, ICategoryIdentity} from "../../../../../base/model/CategoryModel";

export interface IEditCategoryDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: ICategoryIdentity) => void;
    delete: (id: number) => void;
    entity: ICategoryIdentity;
}

export interface IEditCategoryDialogState {
    entity: ICategoryIdentity;
}

const defaultState: IEditCategoryDialogState = {
    entity: CategoryModel.createEmptyEntity()
};
export default class EditCategoryDialog extends React.Component<IEditCategoryDialogProps, IEditCategoryDialogState> {

    public state: IEditCategoryDialogState = Object.assign({}, defaultState, this.props);

    public constructor(props: IEditCategoryDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleIsStandardChange = this.handleIsStandardChange.bind(this);
    }

    public handleDelete() {
        this.props.delete(this.state.entity.id);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleNameChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {name: value})
        }));
    }

    public handleDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {description: value})
        }));
    }

    public handleColorChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {color: value})
        }));
    }

    public handleIsStandardChange(event: ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        this.setState((prevState: IEditCategoryDialogState) => ({
            entity: Object.assign(prevState.entity, {isStandard: checked})
        }));
    }

    public render() {
        const {onClick} = this.props;
        const {entity} = this.state;

        const formId = "addCategoryForm";

        return (
            <React.Fragment>
                <StandardDialog
                    title={"Kategorie hinzufügen"}
                    formName={formId}
                    createOpenButton={(handleOpen) =>
                        <Fab onClick={onClick ? () => onClick(handleOpen) : handleOpen} color="secondary"
                             aria-label="Hinzufügen">
                            <EditIcon/>
                        </Fab>
                    }
                    submitFunction={this.onSubmit}
                    optionalActions={
                        (handleClose) =>
                            <Tooltip
                                title={"Nur Kategorien, welche keine Standardkategorien sind können gelöscht werden."}
                                enterDelay={300}
                            >
                                <span>
                                <Button disabled={entity.isStandard} onClick={() => {
                                    handleClose();
                                    this.handleDelete();
                                }} color="secondary">
                                    Löschen
                                </Button>
                                </span>
                            </Tooltip>
                    }
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
