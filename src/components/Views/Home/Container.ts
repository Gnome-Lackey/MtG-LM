import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import { emitToggleRecordMatchModal } from "redux/creators/application";
import { requestQueryPlayersForRecord } from "redux/creators/players";
import { requestCreateMatch } from "redux/creators/match";

import { RootState } from "redux/models/RootState";
import { User } from "models/User";
import { Player } from "models/Player";

interface HomeViewProps {
  isRequestLoading: boolean;
  potentialPlayerA: Player[];
  potentialPlayerB: Player[];
  searchingForActivePlayers: boolean;
  searchingForDefendingPlayers: boolean;
  showRecordMatchModal: boolean;
  user: User;
}

interface HomeViewActions {
  actions: {
    emitToggleRecordMatchModal: Function;
    requestCreateMatch: Function;
    requestQueryPlayersForRecord: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  isRequestLoading: state.application.isRequestLoading,
  potentialPlayerA: state.players.activePlayerList,
  potentialPlayerB: state.players.defendingPlayerList,
  searchingForActivePlayers: state.players.searchingForActivePlayers,
  searchingForDefendingPlayers: state.players.searchingForDefendingPlayers,
  showRecordMatchModal: state.application.showRecordMatchModal,
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators(
    {
      emitToggleRecordMatchModal,
      requestCreateMatch,
      requestQueryPlayersForRecord
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
