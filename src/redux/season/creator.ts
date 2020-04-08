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
import PlayerCreator from "redux/player/creator";

import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import SeasonService from "services/season";

import SeasonMapper from "mappers/seasons";
import PlayerMapper from "mappers/players";

import ErrorUtility from "utils/errors";

import { SeasonAction } from "redux/season/models/Action";
import { RootState } from "redux/models/RootState";
import { Season } from "models/Season";

import { REQUEST_CREATE_SEASON, REQUEST_GET_SEASONS } from "constants/request";
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

export default class SeasonCreator {
  private applicationCreator = new ApplicationCreator();
  private errorCreator = new ErrorCreator();
  private errorUtility = new ErrorUtility();
  private playerCreator = new PlayerCreator();
  private seasonService = new SeasonService();

  private seasonMapper = new SeasonMapper();
  private playerMapper = new PlayerMapper();

  emitSelectSeasonForEditing = (season: Season): SeasonAction => ({
    type: EMIT_SELECTED_SEASON_FOR_EDITING,
    payload: { season }
  });

  emitDeselectSeasonForEditing = (): SeasonAction => ({
    type: EMIT_DESELECTED_SEASON_FOR_EDITING
  });

  requestCreateSeason = (details: SeasonFields) => async (dispatch: Function) => {
    dispatch(this.errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

    const body = this.seasonMapper.toCreateNode(details);
    const data = await this.seasonService.create(body);

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else {
      dispatch({
        type: EMIT_CREATE_SEASON_SUCCESS,
        payload: {
          season: this.seasonMapper.toSeason(data)
        }
      });

      dispatch(this.playerCreator.emitUpdatePlayers(data.players.map(this.playerMapper.toPlayer)));
    }

    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
  };

  requestUpdateSeason = (id: string, details: SeasonFields) => async (
    dispatch: Function,
    getState: Function
  ) => {
    const {
      seasons: { list }
    }: RootState = getState();

    dispatch(this.errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, true));

    const body = this.seasonMapper.toUpdateNode(details);
    const data = await this.seasonService.update(id, body);

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else {
      const updatedSeasons = list.filter((season) => season.id !== data.id);
      const updatedSeason = this.seasonMapper.toSeason(data);

      updatedSeasons.push(updatedSeason);

      dispatch({
        type: EMIT_UPDATED_SEASON_SUCCESS,
        payload: {
          season: data,
          seasons: updatedSeasons
        }
      });

      dispatch(this.playerCreator.emitUpdatePlayers(data.players.map(this.playerMapper.toPlayer)));
    }

    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_CREATE_SEASON, false));
  };

  requestGetCurrentSeason = () => async (dispatch: Function) => {
    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_CURRENT_SEASONS, true));

    const data = await this.seasonService.getCurrent();

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else if (data) {
      dispatch({
        type: EMIT_GET_SEASON_SUCCESS,
        payload: {
          season: this.seasonMapper.toSeason(data)
        }
      });

      dispatch(this.playerCreator.emitUpdatePlayers(data.players.map(this.playerMapper.toPlayer)));
    } else {
      dispatch(
        this.errorCreator.emitRequestError(
          DOMAIN_ERROR_GENERAL,
          VIEW_ERROR_GENERAL,
          "There are no active seasons. Please contact an admin for more details."
        )
      );
    }

    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_CURRENT_SEASONS, false));
  };

  requestGetSeason = (id: string) => async (dispatch: Function) => {
    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_SEASON, true));

    const data = await this.seasonService.get(id);

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else {
      dispatch({
        type: EMIT_GET_SEASON_SUCCESS,
        payload: {
          season: this.seasonMapper.toSeason(data)
        }
      });

      dispatch(this.playerCreator.emitUpdatePlayers(data.players.map(this.playerMapper.toPlayer)));
    }

    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_SEASON, false));
  };

  requestGetSeasons = () => async (dispatch: Function) => {
    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_GET_SEASONS, true));

    const data = await this.seasonService.getAll();

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else if (data && data.length) {
      dispatch({
        type: EMIT_GET_SEASONS_SUCCESS,
        payload: {
          seasons: data.map(this.seasonMapper.toSeason)
        }
      });
    } else {
      dispatch(
        this.errorCreator.emitRequestError(
          DOMAIN_ERROR_GENERAL,
          VIEW_ERROR_GENERAL,
          "There are no seasons. Please contact an admin for more details."
        )
      );
    }

    dispatch(this.applicationCreator.emitFullPageRequestLoading(REQUEST_GET_SEASONS, false));
  };

  requestGetActiveSeasons = () => async (dispatch: Function) => {
    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, true));

    const data = await this.seasonService.query({
      active: true
    });

    const errorMessage = this.errorUtility.getErrorMessage(data);

    if (errorMessage) {
      dispatch(
        this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
      );
    } else if (data && data.length) {
      dispatch({
        type: EMIT_GET_SEASONS_SUCCESS,
        payload: {
          seasons: data.map(this.seasonMapper.toSeason)
        }
      });
    } else {
      dispatch(
        this.errorCreator.emitRequestError(
          DOMAIN_ERROR_GENERAL,
          VIEW_ERROR_GENERAL,
          "There are no active seasons. Please contact an admin for more details."
        )
      );
    }

    dispatch(this.applicationCreator.emitRequestLoading(EMIT_GET_ACTIVE_SEASONS, false));
  };
}
