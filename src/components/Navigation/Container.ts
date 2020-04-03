import * as React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import NavigationView from "components/Navigation/View";

import { emitResetError } from "redux/error/creators";
import AuthCreator from "redux/auth/creator";

import { RootState } from "redux/models/RootState";
import { ErrorState } from "redux/error/models/State";
import { User } from "models/User";

const authCreator = new AuthCreator();

interface NavigationProps {
  children: React.FunctionComponent<any>;
  errors: ErrorState;
  loggingOut: boolean;
  showMask: boolean;
  user: User;
  validated: boolean;
}

interface NavigationActions {
  actions: {
    emitResetError: Function;
    requestLogout: Function;
    requestValidation: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: React.ComponentProps<any>
): NavigationProps => ({
  children: ownProps.children,
  errors: state.errors,
  loggingOut: state.auth.loggingOut,
  showMask: state.application.showMask,
  user: state.users.current,
  validated: state.auth.validated
});

const mapDispatchToProps = (dispatch: Dispatch): NavigationActions => ({
  actions: bindActionCreators(
    {
      emitResetError,
      requestLogout: authCreator.requestLogout,
      requestValidation: authCreator.requestValidation
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationView);
