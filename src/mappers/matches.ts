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

    const uniquePlayers = Object.keys(
      [...winnerIds, ...loserIds].reduce((map: { [key: string]: boolean }, id) => {
        map[id] = true;
        return map;
      }, {})
    );

    uniquePlayers.forEach((id: string) => {
      const winners = winnerIds.filter((winnerId) => winnerId !== id);
      const losers = loserIds.filter((loserId) => loserId !== id);
      const otherPlayers = [...winners, ...losers];

      const isWin = winners.length > 0;

      if (records[id]) {
        const recordCopy = records[id];

        recordCopy.wins += isWin ? 1 : 0;
        recordCopy.losses += isWin ? 0 : 1;
        recordCopy.opponentsPlayed = recordCopy.opponentsPlayed.concat(otherPlayers);
        recordCopy.opponentsBeat = recordCopy.opponentsBeat.concat(losers);
      } else {
        records[id] = {
          id,
          wins: isWin ? 1 : 0,
          losses: isWin ? 0 : 1,
          opponentsPlayed: otherPlayers,
          opponentsBeat: losers
        };
      }
    });

    return records;
  }, {});
