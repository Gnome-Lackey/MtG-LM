import { handleActions } from "redux-actions";

import {
  EMIT_CREATE_SEASON_SUCCESS,
  EMIT_GET_SEASONS_SUCCESS,
  EMIT_SELECTED_SEASON_FOR_EDITING,
  EMIT_DESELECTED_SEASON_FOR_EDITING,
  EMIT_UPDATED_SEASON_SUCCESS,
  EMIT_GET_ACTIVE_SEASONS,
  EMIT_GET_SEASON_SUCCESS,
  EMIT_GET_SEASON,
  EMIT_GET_CURRENT_SEASONS
} from "redux/season/actions";

import { SeasonState } from "redux/season/models/State";
import { SeasonAction } from "redux/season/models/Action";

const INITIAL_STATE: SeasonState = {
  editing: null,
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
    [EMIT_SELECTED_SEASON_FOR_EDITING]: (
      state: SeasonState,
      action: SeasonAction
    ): SeasonState => ({
      ...state,
      editing: action.payload.season
    }),
    [EMIT_DESELECTED_SEASON_FOR_EDITING]: (state: SeasonState): SeasonState => ({
      ...state,
      editing: null
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
