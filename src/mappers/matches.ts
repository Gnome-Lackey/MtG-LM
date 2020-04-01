import * as querystring from "query-string";

import { MatchQueryParameters } from "services/models/QueryParams";
import { MatchResponse } from "services/models/Responses";
import { MatchRecordMap } from "models/Match";

export const toSearchQueryString = (queryParams: MatchQueryParameters): string => {
  if (!queryParams) {
    return null;
  }

  return querystring.stringify({
    "winners|": queryParams.winners,
    "losers|": queryParams.losers,
    season: queryParams.season,
    seasonPoint: queryParams.seasonPoint
  });
};

export const toMatchRecordMap = (matches: MatchResponse[]): MatchRecordMap =>
  matches.reduce((records: MatchRecordMap, match: MatchResponse) => {
    const winnerIds = match.winners;
    const loserIds = match.losers;

    const uniquePlayers = [...winnerIds, ...loserIds];

    uniquePlayers.forEach((id: string) => {
      const otherWinners = winnerIds.filter((winnerId) => winnerId !== id);
      const otherLosers = loserIds.filter((loserId) => loserId !== id);

      const isWin = winnerIds.some((winnerId) => winnerId === id);

      if (records[id]) {
        const recordCopy = records[id];

        const newOpponentsDefeated = isWin
          ? otherLosers.filter((loserId) => !recordCopy.opponentsDefeated.includes(loserId))
          : [];

        const newPlayersPlayed = isWin
          ? otherLosers.filter((loserId) => !recordCopy.playersPlayed.includes(loserId))
          : otherWinners.filter((winnerId) => !recordCopy.playersPlayed.includes(winnerId));

        recordCopy.wins += isWin ? 1 : 0;
        recordCopy.losses += isWin ? 0 : 1;
        recordCopy.playersPlayed = recordCopy.playersPlayed.concat(newPlayersPlayed);
        recordCopy.opponentsDefeated = recordCopy.opponentsDefeated.concat(newOpponentsDefeated);
      } else {
        records[id] = {
          id,
          wins: isWin ? 1 : 0,
          losses: isWin ? 0 : 1,
          playersPlayed: isWin ? otherLosers : otherWinners,
          opponentsDefeated: isWin ? otherLosers : []
        };
      }
    });
    
    return records;
  }, {});
