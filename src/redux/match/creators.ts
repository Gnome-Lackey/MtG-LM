import {
  EMIT_CREATE_MATCH_SUCCESS,
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
  EMIT_UPDATE_LOADING_MATCH_CREATION
} from "redux/match/actions";

import { emitResetError, emitRequestError } from "redux/error/creators";
import { emitRequestLoading } from "redux/application/creators";
import { emitUpdatePlayers } from "redux/player/creators";

import * as matchMapper from "mappers/matches";
import * as matchService from "services/match";

import ErrorUtility from "utils/errors";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";
import { RootState } from "redux/models/RootState";

import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";
import { Player } from "models/Player";

const errorUtility = new ErrorUtility();

export const requestMatchesBySeasonAndPlayer = (season: string, players: Player[]) => async (
  dispatch: Function
) => {
  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const playerIds = players.map((player) => player.id);

  const data = await matchService.query({
    "winners|": playerIds,
    "losers|": playerIds,
    season,
    seasonPoint: true
  });

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    const matchRecordMap = matchMapper.toMatchRecordMap(data);

    const sortedPlayers = players.sort((playerA: Player, playerB: Player) => {
      const recordA = matchRecordMap[playerA.id];
      const recordB = matchRecordMap[playerB.id];

      const playedMatchPointFactorA = recordA.playersPlayed.length / Math.floor(players.length / 8);
      const playedMatchPointFactorB = recordB.playersPlayed.length / Math.floor(players.length / 8);

      const recordAPoints = recordA.wins * 3 + playedMatchPointFactorA;
      const recordBPoints = recordB.wins * 3 + playedMatchPointFactorB;

      if (recordAPoints > recordBPoints) return -1;
      if (recordAPoints < recordBPoints) return 1;
    });

    dispatch({
      type: EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
      payload: {
        matchRecords: matchRecordMap
      }
    });

    dispatch(emitUpdatePlayers(sortedPlayers));
  }

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};

export const requestCreateMatch = (details: RecordMatchFields) => async (
  dispatch: Function,
  getState: Function
) => {
  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, true));

  const {
    players: { selected: selectedPlayers },
    seasons: { selected: selectedSeason }
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
    season: details.season.key
  };

  const data = await matchService.create(body);

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({ type: EMIT_CREATE_MATCH_SUCCESS });

    if (details.season.key === selectedSeason.id) {
      dispatch(requestMatchesBySeasonAndPlayer(selectedSeason.id, selectedPlayers));
    }
  }

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, false));
};
