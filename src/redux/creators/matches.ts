import {
  EMIT_CREATE_MATCH_SUCCESS,
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS
} from "redux/actions/match";

import { emitResetError, emitRequestError } from "redux/creators/errors";
import { emitRequestLoading } from "redux/creators/application";

import * as matchMapper from "mappers/matches";
import * as matchService from "services/match";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";
import { RootState } from "redux/models/RootState";

import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

export const requestMatchesBySeasonAndPlayer = (season: string, players: string[]) => async (
  dispatch: Function
) => {
  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const data = await matchService.query({
    "winners|": players,
    "losers|": players,
    season,
    seasonPoint: true
  });

  const matchRecordMap = matchMapper.toMatchRecordMap(data);

  dispatch({
    type: EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
    payload: {
      matchRecords: matchRecordMap
    }
  });

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};

export const requestCreateMatch = (details: RecordMatchFields) => async (
  dispatch: Function,
  getState: Function
) => {
  dispatch(emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const {
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

  if (data && data.error) {
    dispatch(emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, data.error.message));
  } else {
    dispatch({ type: EMIT_CREATE_MATCH_SUCCESS });

    if (details.season.key === selectedSeason.id) {
      dispatch(
        requestMatchesBySeasonAndPlayer(
          selectedSeason.id,
          selectedSeason.players.map((player) => player.id)
        )
      );
    }
  }

  dispatch(emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};
