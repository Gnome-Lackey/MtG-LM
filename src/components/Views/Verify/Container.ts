import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import VerifyView from "components/Views/Verify/View";

import {
  emitClearCodeNeeded,
  emitClearCodeResent,
  requestConfirm,
  requestResendCode
} from "redux/creators/auth";
import { RootState } from "redux/models/RootState";

interface VerifyViewProps {
  confirmed: boolean;
  confirmationCodeNeeded: boolean;
  codeResent: boolean;
  history: History;
  isRequestLoading: boolean;
  userName: string;
}

interface VerifyViewActions {
  actions: {
    emitClearCodeNeeded: Function;
    emitClearCodeResent: Function;
    requestConfirm: Function;
    requestResendCode: Function;
  };
}

const mapStateToProps = (state: RootState, ownProps: RouteComponentProps): VerifyViewProps => ({
  codeResent: state.auth.codeResent,
  confirmed: state.auth.confirmed,
  confirmationCodeNeeded: state.auth.confirmationCodeNeeded,
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  userName: state.users.user ? state.users.user.name : ""
});

const mapDispatchToProps = (dispatch: Dispatch): VerifyViewActions => ({
  actions: bindActionCreators(
    {
      emitClearCodeNeeded,
      emitClearCodeResent,
      requestConfirm,
      requestResendCode
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifyView));
