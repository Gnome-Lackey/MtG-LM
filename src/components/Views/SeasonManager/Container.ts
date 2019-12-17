import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { History } from "history";

import SeasonMangerView from "components/Views/SeasonManager/View";

import {
  emitSelectSeason,
  emitDeselectSeason,
  requestCreateSeason,
  requestGetSeasons
} from "redux/creators/seasons";
import { requestGetSetByCode } from "redux/creators/scryfall";
import { requestQueryPlayers } from "redux/creators/players";

import { RootState } from "redux/models/RootState";
import { Set } from "models/Set";
import { Player } from "models/Player";
import { Season } from "models/Season";

interface SeasonMangerViewProps {
  history: History;
  potentialSets: Set[];
  potentialPlayers: Player[];
  searchForPlayer: boolean;
  searchForSet: boolean;
  selectedSeason: Season;
  seasons: Season[];
}

interface SeasonMangerViewActions {
  actions: {
    requestGetSetByCode: Function;
    requestQueryPlayers: Function;
    emitSelectSeason: Function;
    emitDeselectSeason: Function;
    requestCreateSeason: Function;
    requestGetSeasons: Function;
  };
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps
): SeasonMangerViewProps => ({
  history: ownProps.history,
  searchForSet: state.scryfall.searching,
  potentialSets: state.scryfall.setSearchResults,
  potentialPlayers: state.players.searchResults,
  searchForPlayer: state.players.searching,
  selectedSeason: state.seasons.selected,
  seasons: state.seasons.list
});

const mapDispatchToProps = (dispatch: Dispatch): SeasonMangerViewActions => ({
  actions: bindActionCreators(
    {
      requestGetSetByCode,
      requestQueryPlayers,
      emitSelectSeason,
      emitDeselectSeason,
      requestGetSeasons,
      requestCreateSeason
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SeasonMangerView));