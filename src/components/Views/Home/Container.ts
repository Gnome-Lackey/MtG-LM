import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import { emitToggleRecordMatchModal } from "redux/creators/application";
import {
  emitClearPlayerResultsForRecord,
  requestGetPlayers,
  requestQueryPlayersForRecord
} from "redux/creators/players";
import { requestCreateMatch } from "redux/creators/matches";

import { RootState } from "redux/models/RootState";
import { Player } from "models/Player";
import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/models/PlayerState";

interface HomeViewProps {
  areRecordsLoading: boolean;
  isMatchRequestLoading: boolean;
  players: Player[];
  playerSearchResultsMap: PlayerSearchResultMap;
  showRecordMatchModal: boolean;
  user: User;
}

interface HomeViewActions {
  actions: {
    emitClearPlayerResultsForRecord: Function;
    emitToggleRecordMatchModal: Function;
    requestCreateMatch: Function;
    requestGetPlayers: Function;
    requestQueryPlayersForRecord: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  areRecordsLoading: state.players.loading,
  isMatchRequestLoading: state.matches.loading,
  players: state.players.list,
  playerSearchResultsMap: state.players.searchResultsMap,
  showRecordMatchModal: state.application.showRecordMatchModal,
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators(
    {
      emitClearPlayerResultsForRecord,
      emitToggleRecordMatchModal,
      requestCreateMatch,
      requestGetPlayers,
      requestQueryPlayersForRecord
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
