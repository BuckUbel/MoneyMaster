import * as React from "react";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from "@material-ui/core";
import {RenderThings} from "../../helper/util";

export interface IStandardDialogProps {
    title: string;
    formName: string;
    createOpenButton?: (openFunction: () => void) => RenderThings;
    createSubmitButton?: (closeFunction: () => void) => RenderThings;
    createCancelButton?: (closeFunction: () => void) => RenderThings;
    openFunction?: () => void;
    submitFunction?: () => void;
}

export interface IStandardDialogState {
    open: boolean;
}

const defaultState: IStandardDialogState = {
    open: false,
};

type formStatus = "OPENED" | "CANCELLED" | "SUBMITTED";

export default class StandardDialog extends React.Component<IStandardDialogProps, IStandardDialogState> {

    public state: IStandardDialogState = defaultState;

    constructor(props: IStandardDialogProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick(nextStatus: formStatus) {
        return (event?: React.MouseEvent<HTMLElement>) => {
            let willOpen = false;
            if (nextStatus === "OPENED") {
                willOpen = true;
                if (this.props.openFunction) {
                    this.props.openFunction();
                }
            }
            if (nextStatus === "CANCELLED") {
                willOpen = false;
            }
            if (nextStatus === "SUBMITTED") {
                willOpen = false;
                if (this.props.submitFunction) {
                    event.preventDefault();
                    this.props.submitFunction();
                }
            }
            this.setState({open: willOpen});
        };
    }

    public render() {
        const {title, children, createOpenButton, createSubmitButton, createCancelButton, formName} = this.props;

        return (
            <React.Fragment>
                {createOpenButton ? createOpenButton(this.handleClick("OPENED")) :
                    <Button color="inherit" onClick={this.handleClick("OPENED")}>
                        Öffnen
                    </Button>}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClick("CANCELLED")}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        {createCancelButton ? createCancelButton(this.handleClick("CANCELLED")) :
                            <Button onClick={this.handleClick("CANCELLED")} color="primary">
                                Abrrechen
                            </Button>}
                        {createSubmitButton ? createSubmitButton(this.handleClick("SUBMITTED")) :
                            <Button onClick={this.handleClick("SUBMITTED")} color="secondary" type={"submit"} form={formName}>
                                Abschicken
                            </Button>
                        }
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}
