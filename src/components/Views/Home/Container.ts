import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import { RootState } from "redux/models/RootState";
import { User } from "models/User";

interface HomeViewProps {
  user: User;
}

interface HomeViewActions {
  actions: {};
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators({}, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeView));
