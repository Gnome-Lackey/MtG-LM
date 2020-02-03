import {
  EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS,
  EMIT_CREATE_PLAYER_SUCCESS,
  EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST_BY_RECORD,
  EMIT_CLEAR_PLAYER_LIST,
  EMIT_SEARCHING_FOR_PLAYERS,
  EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
  EMIT_UPDATE_PLAYER_ROLE_SUCCESS,
  REQUEST_UPDATE_PLAYER_ROLE,
  EMIT_LOADING_PLAYER_ROLES,
  EMIT_GET_PLAYER_ROLES_SUCCESS
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
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

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

  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const player = userMapper.toPlayer(current);
  const body = playerMapper.toCreateNode(player);

  body.epithet = details.epithet;
  body.favoriteColors = details.favoriteCard.colors;

  const data = await playerService.create(body);

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_CREATE_PLAYER_SUCCESS
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};

export const requestUpdatePlayerRole = (id: string, role: string) => async (
  dispatch: Function,
  getState: Function
) => {
  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitRequestLoading(REQUEST_UPDATE_PLAYER_ROLE, true));

  const {
    players: { roles }
  } = getState() as RootState;

  const data = await playerService.updateRole(id, { role });

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    const dupRoles = [...roles];
    const roleIndex = roles.findIndex((nextRole) => nextRole.id === id);

    dupRoles[roleIndex] = {...data, role };

    dispatch({
      type: EMIT_UPDATE_PLAYER_ROLE_SUCCESS,
      payload: { playerRoles: dupRoles }
    });
  }

  dispatch(emitRequestLoading(REQUEST_UPDATE_PLAYER_ROLE, false));
};

export const requestGetPlayerRoles = () => async (dispatch: Function) => {
  dispatch(emitRequestLoading(EMIT_LOADING_PLAYER_ROLES, true));

  const data = await playerService.getRoles();

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_PLAYER_ROLES_SUCCESS,
      payload: {
        playerRoles: data
      }
    });
  }

  dispatch(emitRequestLoading(EMIT_LOADING_PLAYER_ROLES, false));
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

export const requestQueryPlayersForRecordMatch = (
  searchId: string,
  query: string,
  seasonId: string
) => async (dispatch: Function) => {
  dispatch({
    type: EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
    payload: {
      playerSearchId: searchId,
      searching: true
    }
  });

  const data = await playerService.query({
    userName: query,
    name: query,
    season: seasonId
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
