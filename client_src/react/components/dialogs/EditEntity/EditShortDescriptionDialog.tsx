import * as React from "react";
import {
    Button,
    DialogContentText, Fab, Tooltip
} from "@material-ui/core";
import StandardDialog from "../StandardDialog";
import {ChangeEvent} from "react";
import EditIcon from "@material-ui/icons/Edit";
import ManageShortDescriptionForm from "../../forms/ManageEntity/ManageShortDescriptionForm";
import {IShortDescriptionIdentity, ShortDescriptionModel} from "../../../../../base/model/ShortDescriptionModel";

export interface IEditShortDescriptionDialogProps {
    onClick?: (fct: () => void) => void;
    submit: (entity: IShortDescriptionIdentity) => void;
    delete: (id: number) => void;
    entity: IShortDescriptionIdentity;
}

export interface IEditShortDescriptionDialogState {
    entity: IShortDescriptionIdentity;
}

const defaultState: IEditShortDescriptionDialogState = {
    entity: ShortDescriptionModel.createEmptyEntity()
};

export default class EditShortDescriptionDialog
    extends React.Component<IEditShortDescriptionDialogProps, IEditShortDescriptionDialogState> {

    public state: IEditShortDescriptionDialogState = Object.assign({}, defaultState, this.props);

    public constructor(props: IEditShortDescriptionDialogProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOriginalContentChange = this.handleOriginalContentChange.bind(this);
        this.handleReplaceContentChange = this.handleReplaceContentChange.bind(this);
    }

    public handleDelete() {
        this.props.delete(this.state.entity.id);
    }

    public onSubmit() {
        this.props.submit(this.state.entity);
    }

    public handleOriginalContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditShortDescriptionDialogState) => ({
            entity: Object.assign(prevState.entity, {originalContent: value})
        }));
    }

    public handleReplaceContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        this.setState((prevState: IEditShortDescriptionDialogState) => ({
            entity: Object.assign(prevState.entity, {replaceContent: value})
        }));
    }

    public render() {
        const {onClick} = this.props;
        const {entity} = this.state;

        const formId = "editShortDescriptionForm";

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
                            <Button onClick={() => {
                                handleClose();
                                this.handleDelete();
                            }} color="secondary">
                                Löschen
                            </Button>
                    }
                >
                    <DialogContentText>
                        Geben Sie hier die nötige Daten für eine neue Kurzbeschreibung ein.
                    </DialogContentText>
                    <ManageShortDescriptionForm
                        formId={formId}
                        values={this.state.entity}
                        handler={{
                            originalContent: this.handleOriginalContentChange,
                            replaceContent: this.handleReplaceContentChange,
                        }}
                    />
                </StandardDialog>
            </React.Fragment>
        );
    }
}
