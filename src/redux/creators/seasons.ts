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

import { emitResetError, emitRequestError } from "redux/creators/errors";
import { emitFullPageRequestLoading, emitRequestLoading } from "redux/creators/application";

import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import * as seasonService from "services/season";

import * as seasonMapper from "mappers/seasons";

import { SeasonAction } from "redux/models/SeasonAction";
import { RootState } from "redux/models/RootState";
import { Season } from "models/Season";

import { REQUEST_CREATE_SEASON, REQUEST_GET_SEASONS } from "constants/request";
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

export const emitSelectSeason = (season: Season): SeasonAction => ({
  type: EMIT_SELECTED_SEASON,
  payload: { season }
});

export const emitDeselectSeason = (): SeasonAction => ({
  type: EMIT_DESELECTED_SEASON
});

export const requestCreateSeason = (details: SeasonFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

  const body = seasonMapper.toCreateNode(details);
  const data = await seasonService.create(body);

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_CREATE_SEASON_SUCCESS,
      payload: {
        season: data
      }
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
};

export const requestUpdateSeason = (id: string, details: SeasonFields) => async (
  dispatch: Function,
  getState: Function
) => {
  const {
    seasons: { list }
  }: RootState = getState();

  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

  const body = seasonMapper.toUpdateNode(details);
  const data = await seasonService.update(id, body);

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
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
  }

  dispatch(emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
};

export const requestGetCurrentSeason = () => async (dispatch: Function) => {
  dispatch(emitRequestLoading(EMIT_GET_CURRENT_SEASONS, true));

  const data = await seasonService.getCurrent();

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_SEASON_SUCCESS,
      payload: {
        season: data
      }
    });
  }

  dispatch(emitRequestLoading(EMIT_GET_CURRENT_SEASONS, false));
};

export const requestGetSeason = (id: string) => async (dispatch: Function) => {
  dispatch(emitRequestLoading(EMIT_GET_SEASON, true));

  const data = await seasonService.get(id);

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_SEASON_SUCCESS,
      payload: {
        season: data
      }
    });
  }

  dispatch(emitRequestLoading(EMIT_GET_SEASON, false));
};

export const requestGetSeasons = () => async (dispatch: Function) => {
  dispatch(emitFullPageRequestLoading(REQUEST_GET_SEASONS, true));

  const data = await seasonService.getAllDetails();

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_SEASONS_SUCCESS,
      payload: {
        seasons: data
      }
    });
  }

  dispatch(emitFullPageRequestLoading(REQUEST_GET_SEASONS, false));
};

export const requestGetActiveSeasons = () => async (dispatch: Function) => {
  dispatch(emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, true));

  const data = await seasonService.query({
    active: true
  });

  if (data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({
      type: EMIT_GET_SEASONS_SUCCESS,
      payload: {
        seasons: data
      }
    });
  }

  dispatch(emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, false));
};
