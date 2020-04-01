import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import SeasonMangerView from "components/Views/SeasonManager/View";

import {
  emitSelectSeasonForEditing,
  emitDeselectSeasonForEditing,
  requestCreateSeason,
  requestGetSeasons,
  requestUpdateSeason
} from "redux/season/creators";

import { requestGetSetByCode } from "redux/scryfall/creators";
import { requestQueryPlayers } from "redux/player/creators";

import { RootState } from "redux/models/RootState";
import { Set } from "models/Scryfall";
import { Player } from "models/Player";
import { Season } from "models/Season";

interface SeasonMangerViewProps {
  history: History;
  isRequestLoading: boolean;
  potentialSets: Set[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchForSet: boolean;
  selectedPlayers: Player[];
  selectedSeason: Season;
  seasons: Season[];
}

interface SeasonMangerViewActions {
  actions: {
    emitDeselectSeasonForEditing: Function;
    emitSelectSeasonForEditing: Function;
    requestGetSetByCode: Function;
    requestQueryPlayers: Function;
    requestCreateSeason: Function;
    requestGetSeasons: Function;
    requestUpdateSeason: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): SeasonMangerViewProps => ({
  history: ownProps.history,
  isRequestLoading: state.application.isRequestLoading,
  searchForSet: state.scryfall.searching,
  potentialSets: state.scryfall.setSearchResults,
  potentialPlayers: state.players.searchResults,
  searchForPlayer: state.players.searching,
  selectedPlayers: state.players.selected,
  selectedSeason: state.seasons.editing,
  seasons: state.seasons.list
});

const mapDispatchToProps = (dispatch: Dispatch): SeasonMangerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetSetByCode,
      requestQueryPlayers,
      emitSelectSeasonForEditing,
      emitDeselectSeasonForEditing,
      requestGetSeasons,
      requestCreateSeason,
      requestUpdateSeason
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SeasonMangerView));
