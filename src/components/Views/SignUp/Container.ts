import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import SignUpView from "components/Views/SignUp/View";

import { requestSignUp } from "redux/auth/reducer";
import { emitResetError } from "redux/error/creators";
import { RootState } from "redux/models/RootState";
import { ErrorState } from "redux/error/models/State";

import { User } from "models/User";

interface SignUpViewProps {
  errors: ErrorState;
  history: History;
  isRequestLoading: boolean;
  user: User;
}

interface SignUpViewActions {
  actions: {
    emitResetError: Function;
    requestSignUp: Function;
  };
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps): SignUpViewProps => ({
  errors: state.errors,
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): SignUpViewActions => ({
  actions: bindActionCreators(
    {
      emitResetError,
      requestSignUp
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUpView));
