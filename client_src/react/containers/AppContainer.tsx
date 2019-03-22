import {connect} from "react-redux";

import App from "../App";
import {IRootState} from "../store";

const mapStateToProps = (state: IRootState) => {

    return (
        {});
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
