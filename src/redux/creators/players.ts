import { emitResetError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";

import {
  EMIT_GET_ACTIVE_PLAYERS_SUCCESS,
  EMIT_GET_DEFENDING_PLAYERS_SUCCESS,
  EMIT_GET_PLAYERS_SUCCESS,
  EMIT_CREATE_PLAYER_SUCCESS,
  EMIT_SEARCHING_FOR_ACTIVE_PLAYERS,
  EMIT_SEARCHING_FOR_DEFENDING_PLAYERS
} from "redux/actions/players";

import { RootState } from "redux/models/RootState";

import * as playerService from "services/player";

import * as userMapper from "mappers/user";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import { REQUEST_GETTING_STARTED_PLAYER } from "constants/request";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";
import { ACTIVE_PLAYER } from "constants/players";

export const requestCreatePlayer = (details: GettingStartedFields) => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    users: { current }
  } = getState() as RootState;

  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const body = userMapper.toPlayer(current);

  body.epithet = details.epithet;
  body.favoriteColors = details.favoriteCard.colors;

  await playerService.create(body);

  dispatch({
    type: EMIT_CREATE_PLAYER_SUCCESS
  });

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};

export const requestGetPlayers = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const { data } = await playerService.query();

  if (data.error) {
    // TODO: Handle error
  } else {
    dispatch({
      type: EMIT_GET_PLAYERS_SUCCESS,
      payload: {
        players: data
      }
    });
  }

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};

export const requestQueryPlayersForRecord = (playerType: string, query: string) => async (
  dispatch: Function
) => {
  const isActivePlayer = playerType === ACTIVE_PLAYER;

  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  const searchActionType = isActivePlayer
    ? EMIT_SEARCHING_FOR_ACTIVE_PLAYERS
    : EMIT_SEARCHING_FOR_DEFENDING_PLAYERS;

  dispatch({
    type: searchActionType,
    payload: {
      searching: true
    }
  });

  const { data } = await playerService.query({
    userName: query,
    name: query
  });

  if (data.error) {
    // Handle Error
  } else {
    const successActionType = isActivePlayer
      ? EMIT_GET_ACTIVE_PLAYERS_SUCCESS
      : EMIT_GET_DEFENDING_PLAYERS_SUCCESS;

    dispatch({
      type: successActionType,
      payload: {
        players: data
      }
    });
  }

  dispatch({
    type: searchActionType,
    payload: {
      searching: false
    }
  });
};
