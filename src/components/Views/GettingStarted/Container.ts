import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import GettingStartedView from "components/Views/GettingStarted/View";

import { requestValidation } from "redux/auth/reducer";
import { requestCreatePlayer } from "redux/player/creators";
import { requestGettingStartedCards } from "redux/scryfall/creators";
import { emitResetError } from "redux/error/creators";
import { RootState } from "redux/models/RootState";
import { ErrorState } from "redux/error/models/State";

import { Card } from "models/Scryfall";
import { User } from "models/User";

interface GettingStartedViewProps {
  cards: Card[];
  errors: ErrorState;
  history: History;
  isGettingStartedFinished: boolean;
  isRequestLoading: boolean;
  user: User;
  validated: boolean;
}

interface GettingStartedViewActions {
  actions: {
    emitResetError: Function;
    requestValidation: Function;
    requestCreatePlayer: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): GettingStartedViewProps => ({
  cards: state.scryfall.cards,
  errors: state.errors,
  history: ownProps.history,
  isGettingStartedFinished: state.application.isGettingStartedFinished,
  isRequestLoading: state.application.isRequestLoading,
  user: state.users.current,
  validated: state.auth.validated
});

const mapDispatchToProps = (dispatch: Dispatch): GettingStartedViewActions => ({
  actions: bindActionCreators(
    {
      emitResetError,
      requestValidation,
      requestCreatePlayer,
      requestGettingStartedCards
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GettingStartedView));
