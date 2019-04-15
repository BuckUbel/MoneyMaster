import * as React from "react";
import {IRootState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {load} from "../../api";
import {connect} from "react-redux";
import {categoryActions, CategoryModel, ICategoryIdentity} from "../../../../base/model/CategoryModel";
import {IEntityClass} from "../../../../base/helper/Entity";
import Category from "../../components/core/Category";

export interface ICategoryContainerProps {
    fetchCategory: (id: number) => Promise<any>;
    editCategories: (accounts: ICategoryIdentity[]) => Promise<any>;
    deleteCategories: (ids: number[]) => Promise<any>;
    entity: CategoryModel;
}

export interface ICategoryOwnProps {
    entity: IEntityClass;
}

class CategoryContainer extends React.Component<ICategoryContainerProps, {}> {

    constructor(props: ICategoryContainerProps) {
        super(props);
        this.editCategories = this.editCategories.bind(this);
        this.deleteCategories = this.deleteCategories.bind(this);
    }

    public async componentDidMount() {
        await this.props.fetchCategory(this.props.entity.id);
    }

    public async editCategories(category: ICategoryIdentity) {
        try {
            await this.props.editCategories([category]);
            await this.props.fetchCategory(this.props.entity.id);
        } catch (error) {
            console.error(error);

        }
    }

    public async deleteCategories(id: number) {
        try {
            await this.props.deleteCategories([id]);
            await this.props.fetchCategory(this.props.entity.id);
        } catch (error) {
            console.error(error);

        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.entity &&
                <Category
                    entity={this.props.entity}
                    deleteAction={this.deleteCategories}
                    editAction={this.editCategories}
                />}
            </React.Fragment>
        );
    }
}

const mapsStateToProps = (state: IRootState, ownProps: ICategoryOwnProps) => {
    return (
        {
            entity: ownProps.entity ?
                ownProps.entity.id ?
                    state.categories.data.find((account) => account.id === Number(ownProps.entity.id)) :
                    null :
                null,
        }
    );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>) => ({
    fetchCategory: (id: number) => dispatch(load(categoryActions.actions.load(id))),
    editCategories: (cateogories: ICategoryIdentity[]) => dispatch(load(categoryActions.actions.edit(cateogories))),
    deleteCategories: (ids: number[]) => dispatch(load(categoryActions.actions.delete(ids))),
});
export default connect(mapsStateToProps, mapDispatchToProps)(CategoryContainer);
