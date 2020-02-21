import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import HomeView from "components/Views/Home/View";

import { emitToggleRecordMatchModal } from "redux/creators/application";
import {
  emitClearPlayerResultsForRecord,
  requestQueryPlayersForRecordMatch
} from "redux/creators/players";
import { requestCreateMatch } from "redux/creators/matches";
import {
  requestGetActiveSeasons,
  requestGetCurrentSeason,
  requestGetSeason,
  requestGetSeasonMetadata
} from "redux/creators/seasons";

import { RootState } from "redux/models/RootState";
import { User } from "models/User";
import { PlayerSearchResultMap } from "redux/models/PlayerState";
import { Season, SeasonMetadata } from "models/Season";

interface HomeViewProps {
  isLoadingSeason: boolean;
  isLoadingActiveSeasons: boolean;
  isLoadingCurrentSeason: boolean;
  isMatchRequestLoading: boolean;
  selectedMetadata: SeasonMetadata;
  metadata: SeasonMetadata[];
  playerSearchResultsMap: PlayerSearchResultMap;
  seasons: Season[];
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
    requestQueryPlayersForRecordMatch: Function;
    requestGetSeasonMetadata: Function;
  };
}

const mapStateToProps = (state: RootState): HomeViewProps => ({
  isLoadingSeason: state.seasons.getSeasonLoading,
  isLoadingActiveSeasons: state.seasons.getActiveSeasonsLoading,
  isLoadingCurrentSeason:  state.seasons.getCurrentSeasonLoading,
  isMatchRequestLoading: state.matches.loading,
  metadata: state.seasons.metadata,
  playerSearchResultsMap: state.players.searchResultsMap,
  seasons: state.seasons.list,
  selectedMetadata: state.seasons.selectedMetadata,
  selectedSeason: state.seasons.selected,
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
      requestGetCurrentSeason,
      requestGetSeasonMetadata,
      requestGetSeason,
      requestQueryPlayersForRecordMatch
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeView));
