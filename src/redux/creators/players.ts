import { emitResetError } from "redux/creators/error";
import { emitRequestLoading } from "redux/creators/application";

import * as playerService from "services/player";

import * as userMapper from "mappers/user";

import { EMIT_GET_PLAYERS_SUCCESS } from "redux/actions/player";
import { User } from "models/User";

import { REQUEST_GETTING_STARTED_PLAYER } from "constants/request";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

export const requestCreatePlayer = (details: User) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const body = userMapper.toPlayer(details);

  await playerService.create(body);

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};

export const requestGetPlayers = () => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE));

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true));

  const response = await playerService.query();

  if (response.data.error) {
    // TODO: Handle error
  } else {
    dispatch({
      type: EMIT_GET_PLAYERS_SUCCESS,
      payload: {
        players: response.data
      }
    });
  }

  dispatch(emitRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false));
};
