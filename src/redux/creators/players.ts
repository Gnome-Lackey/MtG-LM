import {
  EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS,
  EMIT_GET_PLAYERS_SUCCESS,
  EMIT_CREATE_PLAYER_SUCCESS,
  EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST,
  EMIT_SEARCHING_FOR_PLAYERS,
  EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
  EMIT_LOADING_PLAYERS
} from "redux/actions/players";

import { emitResetError, emitRequestError } from "redux/creators/errors";
import { emitFullPageRequestLoading, emitRequestLoading } from "redux/creators/application";

import { RootState } from "redux/models/RootState";
import { PlayerAction } from "redux/models/PlayerAction";
import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import * as playerService from "services/player";

import * as userMapper from "mappers/user";
import * as playerMapper from "mappers/players";

import { REQUEST_GETTING_STARTED_PLAYER } from "constants/request";
import {
  DOMAIN_ERROR_FORM_GETTING_STARTED,
  VIEW_ERROR_FORM_GETTING_STARTED,
  DOMAIN_ERROR_GENERAL,
  VIEW_ERROR_GENERAL
} from "constants/errors";

export const emitClearPlayerResultsForRecord = (searchId: string): PlayerAction => ({
  type: EMIT_CLEAR_PLAYER_LIST_BY_RECORD,
  payload: {
    playerSearchId: searchId
  }
});

export const emitClearPlayerResults = (): PlayerAction => ({
  type: EMIT_CLEAR_PLAYER_LIST
});

export const requestCreatePlayer = (details: GettingStartedFields) => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    users: { current }
  } = getState() as RootState;

  dispatch(emitResetError(DOMAIN_ERROR_FORM_GETTING_STARTED, VIEW_ERROR_FORM_GETTING_STARTED));

  dispatch(emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const player = userMapper.toPlayer(current);
  const body = playerMapper.toCreateNode(player);

  body.epithet = details.epithet;
  body.favoriteColors = details.favoriteCard.colors;

  const data = await playerService.create(body);

  if (data.error) {
    dispatch(
      emitRequestError(
        DOMAIN_ERROR_FORM_GETTING_STARTED,
        VIEW_ERROR_FORM_GETTING_STARTED,
        data.error.message
      )
    );
  } else {
    dispatch({
      type: EMIT_CREATE_PLAYER_SUCCESS
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};

export const requestGetPlayers = (overrideLoading?: boolean) => async (dispatch: Function) => {
  dispatch(emitRequestLoading(EMIT_LOADING_PLAYERS, !overrideLoading));

  const data = await playerService.query();

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_PLAYERS_SUCCESS,
      payload: {
        players: data
      }
    });
  }

  dispatch(emitRequestLoading(EMIT_LOADING_PLAYERS, false));
};

export const requestQueryPlayersForRecordMatch = (searchId: string, query: string) => async (
  dispatch: Function
) => {
  dispatch({
    type: EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
    payload: {
      playerSearchId: searchId,
      searching: true
    }
  });

  const data = await playerService.query({
    userName: query,
    name: query
  });

  dispatch({
    type: EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS,
    payload: {
      playerSearchId: searchId,
      players: data.error ? [] : data
    }
  });

  dispatch({
    type: EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
    payload: {
      playerSearchId: searchId,
      searching: false
    }
  });
};

export const requestQueryPlayers = (query: string) => async (dispatch: Function) => {
  dispatch({
    type: EMIT_SEARCHING_FOR_PLAYERS,
    payload: {
      searching: true
    }
  });

  const data = await playerService.query({
    userName: query,
    name: query
  });

  dispatch({
    type: EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
    payload: {
      players: data.error ? [] : data
    }
  });

  dispatch({
    type: EMIT_SEARCHING_FOR_PLAYERS,
    payload: {
      searching: false
    }
  });
};
