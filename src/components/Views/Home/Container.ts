import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import { emitToggleRecordMatchModal } from "redux/creators/application";
import {
  emitClearPlayersForRecord,
  requestGetPlayers,
  requestQueryPlayersForRecord
} from "redux/creators/players";
import { requestCreateMatch } from "redux/creators/match";

import { RootState } from "redux/models/RootState";
import { Player } from "models/Player";

interface HomeViewProps {
  isRequestLoading: boolean;
  players: Player[];
  potentialPlayerA: Player[];
  potentialPlayerB: Player[];
  searchingForAPlayers: boolean;
  searchingForBPlayers: boolean;
  showRecordMatchModal: boolean;
}

interface HomeViewActions {
  actions: {
    emitClearPlayersForRecord: Function;
    emitToggleRecordMatchModal: Function;
    requestCreateMatch: Function;
    requestGetPlayers: Function;
    requestQueryPlayersForRecord: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  isRequestLoading: state.application.isRequestLoading,
  players: state.players.list,
  potentialPlayerA: state.players.playerAList,
  potentialPlayerB: state.players.playerBList,
  searchingForAPlayers: state.players.searchingForAPlayers,
  searchingForBPlayers: state.players.searchingForBPlayers,
  showRecordMatchModal: state.application.showRecordMatchModal
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators(
    {
      emitClearPlayersForRecord,
      emitToggleRecordMatchModal,
      requestCreateMatch,
      requestGetPlayers,
      requestQueryPlayersForRecord
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
