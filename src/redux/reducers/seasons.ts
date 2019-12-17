import { handleActions } from "redux-actions";

import {
  EMIT_GET_SEASONS_SUCCESS,
  EMIT_CREATE_SEASON_SUCCESS,
  EMIT_SELECTED_SEASON
} from "redux/actions/seasons";

import { SeasonState } from "redux/models/SeasonState";
import { SeasonAction } from "redux/models/SeasonAction";

const INITIAL_STATE: SeasonState = {
  list: [],
  selected: null
};

export default handleActions(
  {
    [EMIT_GET_SEASONS_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      list: action.payload.seasons
    }),
    [EMIT_CREATE_SEASON_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      list: [...state.list, action.payload.season]
    }),
    [EMIT_SELECTED_SEASON]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      selected: action.payload.selectedSeason
    })
  },
  INITIAL_STATE
);
