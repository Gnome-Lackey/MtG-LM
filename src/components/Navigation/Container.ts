import * as React from 'react';
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import NavigationView from "components/Navigation/View";

import {
  requestLogout,
  requestValidation
} from "redux/creators/auth";

import { RootState } from "redux/models/RootState";
import { User } from 'models/User';

interface NavigationProps {
  children: React.FunctionComponent<any>;
  loggingOut: boolean;
  showMask: boolean;
  user: User;
  validated: boolean;
};

interface NavigationActions {
  actions: {
    requestLogout: Function;
    requestValidation: Function;
  };
};

const mapStateToProps = (state: RootState, ownProps: React.ComponentProps<any>): NavigationProps => ({
  children: ownProps.children,
  loggingOut: state.auth.loggingOut,
  showMask: state.application.showMask,
  user: state.users.user,
  validated: state.auth.validated
});

const mapDispatchToProps = (dispatch: Dispatch): NavigationActions => ({
  actions: bindActionCreators(
    {
      requestLogout,
      requestValidation
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationView);
