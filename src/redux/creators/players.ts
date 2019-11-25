import { emitResetError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";
import { EMIT_GET_PLAYERS_SUCCESS, EMIT_CREATE_PLAYER_SUCCESS } from "redux/actions/players";
import { RootState } from "redux/models/RootState";

import * as playerService from "services/player";

import * as userMapper from "mappers/user";

import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";

import { REQUEST_GETTING_STARTED_PLAYER } from "constants/request";
import { DOMAIN_ERROR_GETTING_STARTED, VIEW_ERROR_GETTING_STARTED_CREATE } from "constants/errors";

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
