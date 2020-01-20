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
import { requestGetActiveSeasons } from "redux/creators/seasons";

import { RootState } from "redux/models/RootState";
import { Player } from "models/Player";
import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/models/PlayerState";
import { Season } from "models/Season";

interface HomeViewProps {
  areRecordsLoading: boolean;
  isMatchRequestLoading: boolean;
  players: Player[];
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
  showRecordMatchModal: boolean;
  user: User;
}

interface HomeViewActions {
  actions: {
    emitClearPlayerResultsForRecord: Function;
    emitToggleRecordMatchModal: Function;
    requestCreateMatch: Function;
    requestGetActiveSeasons: Function;
    requestGetPlayers: Function;
    requestQueryPlayersForRecord: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  areRecordsLoading: state.players.loading,
  isMatchRequestLoading: state.matches.loading,
  players: state.players.list,
  playerSearchResultsMap: state.players.searchResultsMap,
  seasons: state.seasons.list,
  showRecordMatchModal: state.application.showRecordMatchModal,
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators(
    {
      emitClearPlayerResultsForRecord,
      emitToggleRecordMatchModal,
      requestCreateMatch,
      requestGetActiveSeasons,
      requestGetPlayers,
      requestQueryPlayersForRecord
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
