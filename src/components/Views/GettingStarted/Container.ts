import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import GettingStartedView from "components/Views/GettingStarted/View";

import { requestValidation } from "redux/creators/auth";
import { requestGettingStartedCards } from "redux/creators/card";
import { emitResetError } from "redux/creators/error";
import { RootState } from "redux/models/RootState";
import { ErrorState } from "redux/models/ErrorState";

import { Card } from "models/Card";
import { User } from "models/User";

interface GettingStartedViewProps {
  cards: Card[];
  errors: ErrorState;
  history: History;
  isRequestLoading: boolean;
  user: User;
  validated: boolean;
}

interface GettingStartedViewActions {
  actions: {
    emitResetError: Function;
    requestValidation: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): GettingStartedViewProps => ({
  cards: state.card.list,
  errors: state.errors,
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  user: state.users.user,
  validated: state.auth.validated
});

const mapDispatchToProps = (dispatch: Dispatch): GettingStartedViewActions => ({
  actions: bindActionCreators(
    {
      emitResetError,
      requestValidation,
      requestGettingStartedCards
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GettingStartedView));
