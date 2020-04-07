import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import VerifyView from "components/Views/Verify/View";

import AuthCreator from "redux/auth/creator";
import { RootState } from "redux/models/RootState";

const authCreator = new AuthCreator();

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
  userName: state.users.current ? state.users.current.userName : ""
});

const mapDispatchToProps = (dispatch: Dispatch): VerifyViewActions => ({
  actions: bindActionCreators(
    {
      emitClearCodeNeeded: authCreator.emitClearCodeNeeded,
      emitClearCodeResent: authCreator.emitClearCodeResent,
      requestConfirm: authCreator.requestConfirm,
      requestResendCode: authCreator.requestResendCode
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyView));
