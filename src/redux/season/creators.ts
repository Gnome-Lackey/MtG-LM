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

import ApplicationCreator from "redux/application/creator";
import ErrorCreator from "redux/error/creator";
import { emitUpdatePlayers } from "redux/player/creators";

import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import SeasonService from "services/season";

import * as seasonMapper from "mappers/seasons";
import * as playerMapper from "mappers/players";

import ErrorUtility from "utils/errors";

import { SeasonAction } from "redux/season/models/Action";
import { RootState } from "redux/models/RootState";
import { Season } from "models/Season";

import { REQUEST_CREATE_SEASON, REQUEST_GET_SEASONS } from "constants/request";
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

const applicationCreator = new ApplicationCreator();
const errorCreator = new ErrorCreator();
const errorUtility = new ErrorUtility();
const seasonService = new SeasonService();

export const emitSelectSeasonForEditing = (season: Season): SeasonAction => ({
  type: EMIT_SELECTED_SEASON_FOR_EDITING,
  payload: { season }
});

export const emitDeselectSeasonForEditing = (): SeasonAction => ({
  type: EMIT_DESELECTED_SEASON_FOR_EDITING
});

export const requestCreateSeason = (details: SeasonFields) => async (dispatch: Function) => {
  dispatch(errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

  const body = seasonMapper.toCreateNode(details);
  const data = await seasonService.create(body);

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({
      type: EMIT_CREATE_SEASON_SUCCESS,
      payload: {
        season: seasonMapper.toSeason(data)
      }
    });

    dispatch(emitUpdatePlayers(data.players.map(playerMapper.toPlayer)));
  }

  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
};

export const requestUpdateSeason = (id: string, details: SeasonFields) => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    seasons: { list }
  }: RootState = getState();

  dispatch(errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

  const body = seasonMapper.toUpdateNode(details);
  const data = await seasonService.update(id, body);

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    const updatedSeasons = list.filter((season) => season.id !== data.id);
    const updatedSeason = seasonMapper.toSeason(data);

    updatedSeasons.push(updatedSeason);

    dispatch({
      type: EMIT_UPDATED_SEASON_SUCCESS,
      payload: {
        season: data,
        seasons: updatedSeasons
      }
    });

    dispatch(emitUpdatePlayers(data.players.map(playerMapper.toPlayer)));
  }

  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
};

export const requestGetCurrentSeason = () => async (dispatch: Function) => {
  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_CURRENT_SEASONS, true));

  const data = await seasonService.getCurrent();

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({
      type: EMIT_GET_SEASON_SUCCESS,
      payload: {
        season: seasonMapper.toSeason(data)
      }
    });

    dispatch(emitUpdatePlayers(data.players.map(playerMapper.toPlayer)));
  }

  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_CURRENT_SEASONS, false));
};

export const requestGetSeason = (id: string) => async (dispatch: Function) => {
  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_SEASON, true));

  const data = await seasonService.get(id);

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({
      type: EMIT_GET_SEASON_SUCCESS,
      payload: {
        season: seasonMapper.toSeason(data)
      }
    });

    dispatch(emitUpdatePlayers(data.players.map(playerMapper.toPlayer)));
  }

  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_SEASON, false));
};

export const requestGetSeasons = () => async (dispatch: Function) => {
  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_GET_SEASONS, true));

  const data = await seasonService.getAll();

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({
      type: EMIT_GET_SEASONS_SUCCESS,
      payload: {
        seasons: data.map(seasonMapper.toSeason)
      }
    });
  }

  dispatch(applicationCreator.emitFullPageRequestLoading(REQUEST_GET_SEASONS, false));
};

export const requestGetActiveSeasons = () => async (dispatch: Function) => {
  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, true));

  const data = await seasonService.query({
    active: true
  });

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({
      type: EMIT_GET_SEASONS_SUCCESS,
      payload: {
        seasons: data.map(seasonMapper.toSeason)
      }
    });
  }

  dispatch(applicationCreator.emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, false));
};
