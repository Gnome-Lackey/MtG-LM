import {
  EMIT_CREATE_SEASON_SUCCESS,
  EMIT_GET_SEASONS_SUCCESS,
  EMIT_SELECTED_SEASON,
  EMIT_DESELECTED_SEASON
} from "redux/actions/seasons";

import { emitResetError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";

import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import * as seasonService from "services/season";

import * as seasonMapper from "mappers/seasons";

import { SeasonAction } from "redux/models/SeasonAction";
import { Season } from "models/Season";

import { REQUEST_CREATE_SEASON, REQUEST_GET_SEASONS } from "constants/request";
import { DOMAIN_ERROR_SEASON_CREATE, VIEW_ERROR_SEASON_CREATE } from "constants/errors";

export const emitSelectSeason = (season: Season): SeasonAction => ({
  type: EMIT_SELECTED_SEASON,
  payload: { selectedSeason: season }
});

export const emitDeselectSeason = (): SeasonAction => ({
  type: EMIT_DESELECTED_SEASON
});

export const requestCreateSeason = (details: SeasonFields) => async (dispatch: Function) => {
  dispatch(emitResetError(DOMAIN_ERROR_SEASON_CREATE, VIEW_ERROR_SEASON_CREATE));

  dispatch(emitRequestLoading(REQUEST_CREATE_SEASON, true));

  const body = seasonMapper.toCreateNode(details);
  const { data } = await seasonService.create(body);

  if (data.error) {
    // TODO: Handle error
  } else {
    dispatch({
      type: EMIT_CREATE_SEASON_SUCCESS,
      payload: {
        season: data
      }
    });
  }

  dispatch(emitRequestLoading(REQUEST_CREATE_SEASON, false));
};

export const requestGetSeasons = () => async (dispatch: Function) => {
  dispatch(emitRequestLoading(REQUEST_GET_SEASONS, true));

  const { data } = await seasonService.getAllDetails();

  if (data.error) {
    // TODO: Handle error
  } else {
    dispatch({
      type: EMIT_GET_SEASONS_SUCCESS,
      payload: {
        seasons: data
      }
    });
  }

  dispatch(emitRequestLoading(REQUEST_GET_SEASONS, false));
};
