import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import LoginView from "components/Views/Login/View";

import { requestLogin } from "redux/creators/auth";
import { emitResetError } from "redux/creators/errors";
import { RootState } from "redux/models/RootState";
import { ErrorState } from "redux/models/ErrorState";


interface LoginViewProps {
  confirmationNeeded: boolean;
  errors: ErrorState;
  history: History;
  isRequestLoading: boolean;
  userName: string;
  validated: boolean;
};

interface LoginViewActions {
  actions: {
    emitResetError: Function;
    requestLogin: Function;
  };
};

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps): LoginViewProps => ({
  confirmationNeeded: state.auth.confirmationNeeded,
  errors: state.errors,
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  userName: state.users.user ? state.users.user.userName : "",
  validated: state.auth.validated
});

const mapDispatchToProps = (dispatch: Dispatch): LoginViewActions => ({
  actions: bindActionCreators(
    {
      emitResetError,
      requestLogin
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginView));
