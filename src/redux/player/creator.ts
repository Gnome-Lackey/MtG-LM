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
  EMIT_GET_PLAYER_ROLES_SUCCESS,
  EMIT_UPDATE_PLAYERS
} from "redux/player/actions";

import ApplicationCreator from "redux/application/creator";
import ErrorCreator from "redux/error/creator";

import PlayerService from "services/player";

import UserMapper from "mappers/user";
import PlayerMapper from "mappers/players";

import ErrorUtility from "utils/errors";

import { RootState } from "redux/models/RootState";
import { PlayerAction } from "redux/player/models/Action";
import { GettingStartedFields } from "components/Hooks/useFormData/models/FormFields";
import { Player } from "models/Player";

import { REQUEST_GETTING_STARTED_PLAYER } from "constants/request";
import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

export default class PlayerCreator {
  private applicationCreator = new ApplicationCreator();
  private playerService = new PlayerService();
  private errorCreator = new ErrorCreator();
  private errorUtility = new ErrorUtility();

  private playerMapper = new PlayerMapper();
  private userMapper = new UserMapper();

  emitClearPlayerResultsForRecord = (searchId: string): PlayerAction => {
    return {
      type: EMIT_CLEAR_PLAYER_LIST_BY_RECORD,
      payload: {
        playerSearchId: searchId
      }
    };
  };

  emitClearPlayerResults = (): PlayerAction => {
    return {
      type: EMIT_CLEAR_PLAYER_LIST
    };
  };

  emitUpdatePlayers = (players: Player[]): PlayerAction => {
    return {
      type: EMIT_UPDATE_PLAYERS,
      payload: { players }
    };
  };

  requestCreatePlayer = (details: GettingStartedFields) => {
    return async (dispatch: Function, getState: Function) => {
      const {
        users: { current }
      } = getState() as RootState;

      dispatch(this.errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

      dispatch(
        this.applicationCreator.emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, true)
      );

      const player = this.userMapper.toPlayer(current);
      const body = this.playerMapper.toCreateNode(player);

      body.epithet = details.epithet;
      body.favoriteColors = details.favoriteCard.colors;

      const data = await this.playerService.create(body);

      const errorMessage = this.errorUtility.getErrorMessage(data);

      if (errorMessage) {
        dispatch(
          this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
        );
      } else {
        dispatch({
          type: EMIT_CREATE_PLAYER_SUCCESS
        });
      }

      dispatch(
        this.applicationCreator.emitFullPageRequestLoading(REQUEST_GETTING_STARTED_PLAYER, false)
      );
    };
  };

  requestUpdatePlayerRole = (id: string, role: string) => {
    return async (dispatch: Function, getState: Function) => {
      dispatch(this.applicationCreator.emitRequestLoading(REQUEST_UPDATE_PLAYER_ROLE, true));

      const {
        players: { roles }
      } = getState() as RootState;

      const data = await this.playerService.updateRole(id, { role });

      const errorMessage = this.errorUtility.getErrorMessage(data);

      if (errorMessage) {
        dispatch(
          this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
        );
      } else {
        const dupRoles = [...roles];
        const roleIndex = roles.findIndex((nextRole) => nextRole.id === id);

        dupRoles[roleIndex] = { ...data, role };

        dispatch({
          type: EMIT_UPDATE_PLAYER_ROLE_SUCCESS,
          payload: { playerRoles: dupRoles }
        });
      }

      dispatch(this.applicationCreator.emitRequestLoading(REQUEST_UPDATE_PLAYER_ROLE, false));
    };
  };

  requestGetPlayerRoles = () => {
    return async (dispatch: Function) => {
      dispatch(this.applicationCreator.emitFullPageRequestLoading(EMIT_LOADING_PLAYER_ROLES, true));

      const data = await this.playerService.getRoles();

      const errorMessage = this.errorUtility.getErrorMessage(data);

      if (errorMessage) {
        dispatch(
          this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
        );
      } else {
        dispatch({
          type: EMIT_GET_PLAYER_ROLES_SUCCESS,
          payload: {
            playerRoles: data
          }
        });
      }

      dispatch(
        this.applicationCreator.emitFullPageRequestLoading(EMIT_LOADING_PLAYER_ROLES, false)
      );
    };
  };

  requestQueryPlayers = (query: string) => {
    return async (dispatch: Function) => {
      dispatch({
        type: EMIT_SEARCHING_FOR_PLAYERS,
        payload: {
          searching: true
        }
      });

      const data = await this.playerService.query({
        userName: query,
        name: query
      });

      dispatch({
        type: EMIT_GET_PLAYER_SEARCH_RESULTS_SUCCESS,
        payload: {
          players: this.errorUtility.hasError(data) ? [] : data
        }
      });

      dispatch({
        type: EMIT_SEARCHING_FOR_PLAYERS,
        payload: {
          searching: false
        }
      });
    };
  };

  requestQueryPlayersForRecordMatch = (searchId: string, query: string, seasonId: string) => {
    return async (dispatch: Function) => {
      dispatch({
        type: EMIT_SEARCHING_FOR_PLAYERS_BY_RECORD,
        payload: {
          playerSearchId: searchId,
          searching: true
        }
      });

      const data = await this.playerService.query({
        userName: query,
        name: query,
        season: seasonId
      });

      dispatch({
        type: EMIT_GET_PLAYER_SEARCH_RESULTS_BY_RECORD_SUCCESS,
        payload: {
          playerSearchId: searchId,
          players: this.errorUtility.hasError(data) ? [] : data
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
  };
}
