import { handleActions } from "redux-actions";

import {
  EMIT_CREATE_SEASON_SUCCESS,
  EMIT_GET_SEASONS_SUCCESS,
  EMIT_SELECTED_SEASON,
  EMIT_DESELECTED_SEASON,
  EMIT_UPDATED_SEASON_SUCCESS,
  EMIT_GET_ACTIVE_SEASONS,
  EMIT_GET_SEASON_SUCCESS,
  EMIT_GET_SEASON,
  EMIT_GET_CURRENT_SEASONS
} from "redux/actions/seasons";

import { SeasonState } from "redux/models/SeasonState";
import { SeasonAction } from "redux/models/SeasonAction";

const INITIAL_STATE: SeasonState = {
  getSeasonLoading: false,
  getCurrentSeasonLoading: false,
  getActiveSeasonsLoading: false,
  list: [],
  selected: null
};

export default handleActions(
  {
    [EMIT_GET_SEASON_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      selected: action.payload.season
    }),
    [EMIT_GET_SEASONS_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      list: action.payload.seasons
    }),
    [EMIT_CREATE_SEASON_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      list: [...state.list, action.payload.season]
    }),
    [EMIT_UPDATED_SEASON_SUCCESS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      selected: action.payload.season,
      list: action.payload.seasons
    }),
    [EMIT_SELECTED_SEASON]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      selected: action.payload.season
    }),
    [EMIT_DESELECTED_SEASON]: (state: SeasonState): SeasonState => ({
      ...state,
      selected: null
    }),
    [EMIT_GET_SEASON]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      getSeasonLoading: action.payload.loading
    }),
    [EMIT_GET_CURRENT_SEASONS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      getCurrentSeasonLoading: action.payload.loading
    }),
    [EMIT_GET_ACTIVE_SEASONS]: (state: SeasonState, action: SeasonAction): SeasonState => ({
      ...state,
      getActiveSeasonsLoading: action.payload.loading
    })
  },
  INITIAL_STATE
);
