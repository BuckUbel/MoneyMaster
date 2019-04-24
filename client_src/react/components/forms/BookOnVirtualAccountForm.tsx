import * as React from "react";
import {Grid, TextField} from "@material-ui/core";
import {accountFields, AccountModel} from "../../../../base/model/AccountModel";
import {ChangeEvent} from "react";
import Selector from "../core/simple/Selector";
import {ReactNode} from "react";
import {CategoryModel} from "../../../../base/model/CategoryModel";

export interface IBookOnVirtualAccountParams {
    name: string;
    description: string;
    categoryName: string;
    value: number;
}

export interface IBookOnVirtualAccountFormHandler {
    name: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    description: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    value: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    categoryName: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void;
}

export interface IBookOnVirtualAccountFormProps {
    formId: string;
    categories: CategoryModel[];
    values: IBookOnVirtualAccountParams;
    handler: IBookOnVirtualAccountFormHandler;
}

export interface IBookOnVirtualAccountFormState {
    textCategories: string[];
}

export const defaultState: IBookOnVirtualAccountFormState = {
    textCategories: []
};

export default class BookOnVirtualAccountForm
    extends React.Component<IBookOnVirtualAccountFormProps, IBookOnVirtualAccountFormState> {

    public static getDerivedStateFromProps(
        newProps: IBookOnVirtualAccountFormProps,
        oldState: IBookOnVirtualAccountFormState
    )
        : IBookOnVirtualAccountFormState {

        const newTextCategories = newProps.categories.map((category: CategoryModel): string => {
            return category.name;
        });

        return {
            textCategories: newTextCategories,
        };
    }

    public state: IBookOnVirtualAccountFormState = defaultState;

    constructor(props: IBookOnVirtualAccountFormProps) {
        super(props);
    }

    public render() {
        const {formId, values, handler} = this.props;
        const {textCategories} = this.state;

        return (
            <React.Fragment>
                <form id={formId} autoComplete={"off"}>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={accountFields.name.fieldName}
                                       label={accountFields.name.labelName}
                                       type="number"
                                       value={values.name}
                                       onChange={handler.name}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={accountFields.description.fieldName}
                                       label={accountFields.description.labelName}
                                       type="number"
                                       value={values.description}
                                       onChange={handler.description}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField margin="dense"
                                       id={accountFields.value.fieldName}
                                       label={accountFields.value.labelName}
                                       type="number"
                                       value={values.value}
                                       onChange={handler.value}
                                       fullWidth
                                       autoComplete={"off"}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Selector value={values.categoryName}
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
