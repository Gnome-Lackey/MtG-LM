import {
  EMIT_CREATE_MATCH_SUCCESS,
  EMIT_UPDATE_LOADING_MATCHES,
  EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
  EMIT_UPDATE_LOADING_MATCH_CREATION
} from "redux/match/actions";

import ApplicationCreator from "redux/application/creator";
import ErrorCreator from "redux/error/creator";
import { emitUpdatePlayers } from "redux/player/creators";

import MatchService from "services/match";

import * as matchMapper from "mappers/matches";

import ErrorUtility from "utils/errors";
import RankUtility from "utils/rank";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";
import { RootState } from "redux/models/RootState";
import { Player } from "models/Player";

import { DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL } from "constants/errors";

const applicationCreator = new ApplicationCreator();
const errorCreator = new ErrorCreator();
const errorUtility = new ErrorUtility();
const matchService = new MatchService();
const rankUtility = new RankUtility();

export const requestMatchesBySeasonAndPlayer = (season: string, players: Player[]) => async (
  dispatch: Function
) => {
  dispatch(applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, true));

  const playerIds = players.map((player) => player.id);

  const data = await matchService.query({
    "winners|": playerIds,
    "losers|": playerIds,
    season,
    seasonPoint: true
  });

  const errorMessage = errorUtility.getErrorMessage(data);

  if (errorMessage) {
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    const matchRecordMap = matchMapper.toMatchRecordMap(data);

    const sortedPlayers = rankUtility.sortByRank(players, matchRecordMap);

    dispatch({
      type: EMIT_GET_MATCH_SEARCH_RESULTS_SUCCESS,
      payload: {
        matchRecords: rankUtility.populateRanks(sortedPlayers, matchRecordMap)
      }
    });

    dispatch(emitUpdatePlayers(sortedPlayers));
  }

  dispatch(applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCHES, false));
};

export const requestCreateMatch = (details: RecordMatchFields) => async (
  dispatch: Function,
  getState: Function
) => {
  dispatch(errorCreator.emitResetError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL));

  dispatch(applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, true));

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
    dispatch(errorCreator.emitRequestError(DOMAIN_ERROR_GENERAL, VIEW_ERROR_GENERAL, errorMessage));
  } else {
    dispatch({ type: EMIT_CREATE_MATCH_SUCCESS });

    if (details.season.key === selectedSeason.id) {
      dispatch(requestMatchesBySeasonAndPlayer(selectedSeason.id, selectedPlayers));
    }
  }

  dispatch(applicationCreator.emitRequestLoading(EMIT_UPDATE_LOADING_MATCH_CREATION, false));
};
