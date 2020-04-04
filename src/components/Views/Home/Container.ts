import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import ApplicationCreator from "redux/application/creator";
import MatchCreator from "redux/match/creator";
import {
  emitClearPlayerResultsForRecord,
  requestQueryPlayersForRecordMatch
} from "redux/player/creators";
import {
  requestGetActiveSeasons,
  requestGetCurrentSeason,
  requestGetSeason
} from "redux/season/creators";

import { RootState } from "redux/models/RootState";
import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/player/models/State";
import { Season } from "models/Season";
import { MatchRecordMap } from "models/Match";
import { Player } from "models/Player";

const applicationCreator = new ApplicationCreator();
const matchCreator = new MatchCreator();

interface HomeViewProps {
  isLoadingSeason: boolean;
  isLoadingActiveSeasons: boolean;
  isLoadingCurrentSeason: boolean;
  isLoadingMatchCreation: boolean;
  isLoadingMatches: boolean;
  matchRecords: MatchRecordMap;
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
  selectedPlayers: Player[];
  selectedSeason: Season;
  showRecordMatchModal: boolean;
  user: User;
}

interface HomeViewActions {
  actions: {
    emitClearPlayerResultsForRecord: Function;
    emitToggleRecordMatchModal: Function;
    requestCreateMatch: Function;
    requestGetActiveSeasons: Function;
    requestGetCurrentSeason: Function;
    requestGetSeason: Function;
    requestMatchesBySeasonAndPlayer: Function;
    requestQueryPlayersForRecordMatch: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  isLoadingSeason: state.seasons.getSeasonLoading,
  isLoadingActiveSeasons: state.seasons.getActiveSeasonsLoading,
  isLoadingCurrentSeason: state.seasons.getCurrentSeasonLoading,
  isLoadingMatchCreation: state.matches.loadingMatchCreation,
  isLoadingMatches: state.matches.loadingAllMatches,
  matchRecords: state.matches.matchRecords,
  playerSearchResultsMap: state.players.searchResultsMap,
  seasons: state.seasons.list,
  selectedPlayers: state.players.selected,
  selectedSeason: state.seasons.selected,
  showRecordMatchModal: state.application.showRecordMatchModal,
  user: state.users.current
});

const mapDispatchToProps = (dispatch: Dispatch): HomeViewActions => ({
  actions: bindActionCreators(
    {
      emitClearPlayerResultsForRecord,
      emitToggleRecordMatchModal: applicationCreator.emitToggleRecordMatchModal,
      requestCreateMatch: matchCreator.requestCreateMatch,
      requestGetActiveSeasons,
      requestGetCurrentSeason,
      requestGetSeason,
      requestMatchesBySeasonAndPlayer: matchCreator.requestMatchesBySeasonAndPlayer,
      requestQueryPlayersForRecordMatch
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
