import {
  EMIT_CREATE_MATCH_SUCCESS,
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
  EMIT_UPDATE_LOADING_MATCH_CREATION,
} from "redux/match/actions";

import ApplicationCreator from "redux/application/creator";
import ErrorCreator from "redux/error/creator";
import PlayerCreator from "redux/player/creator";

import MatchService from "services/match";

import MatchMapper from "mappers/matches";

import ErrorUtility from "utils/errors";
import RankUtility from "utils/rank";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";
import { RootState } from "redux/models/RootState";
import { Player } from "models/Player";

import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

const matchMapper = new MatchMapper();

export default class MatchCreator {
  private applicationCreator = new ApplicationCreator();
  private errorCreator = new ErrorCreator();
  private errorUtility = new ErrorUtility();
  private matchService = new MatchService();
  private playerCreator = new PlayerCreator();
  private rankUtility = new RankUtility();

  requestMatchesBySeasonAndPlayer(season: string, players: Player[]) {
    return async (dispatch: Function) => {
      dispatch(this.applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

      const playerIds = players.map((player) => player.id);

      const data = await this.matchService.query({
        "winners|": playerIds,
        "losers|": playerIds,
        season,
        seasonPoint: true,
      });

      const errorMessage = this.errorUtility.getErrorMessage(data);

      if (errorMessage) {
        dispatch(
          this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
        );
      } else {
        const matchRecordMap = matchMapper.toMatchRecordMap(data);

        const sortedPlayers = this.rankUtility.sortByRank(players, matchRecordMap);

        dispatch({
          type: EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
          payload: {
            matchRecords: this.rankUtility.populateRanks(sortedPlayers, matchRecordMap),
          },
        });

        dispatch(this.playerCreator.emitUpdatePlayers(sortedPlayers));
      }

      dispatch(this.applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
    };
  }

  requestCreateMatch(details: RecordMatchFields) {
    return async (dispatch: Function, getState: Function) => {
      dispatch(this.errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

      dispatch(
        this.applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, true)
      );

      const {
        players: { selected: selectedPlayers },
        seasons: { selected: selectedSeason },
      } = getState() as RootState;

      const winningGameCount = details.playerRecords.reduce(
        (wins, record) => (record.wins > wins ? record.wins : wins),
        details.playerRecords[0].wins
      );

      const winners = details.playerRecords
        .filter((record) => record.wins === winningGameCount)
        .map((record) => record.player.key);

      const losers = details.playerRecords
        .filter((record) => record.wins !== winningGameCount)
        .map((record) => record.player.key);

      const gamesPlayed = details.playerRecords.reduce((total, record) => total + record.wins, 0);

      const body = {
        losers,
        winners,
        games: gamesPlayed,
        wins: winningGameCount,
        season: details.season.key,
      };

      const data = await this.matchService.create(body);

      const errorMessage = this.errorUtility.getErrorMessage(data);

      if (errorMessage) {
        dispatch(
          this.errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage)
        );
      } else {
        dispatch({ type: EMIT_CREATE_MATCH_SUCCESS });

        if (details.season.key === selectedSeason.id) {
          dispatch(this.requestMatchesBySeasonAndPlayer(selectedSeason.id, selectedPlayers));
        }
      }

      dispatch(
        this.applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, false)
      );
    };
  }
}
