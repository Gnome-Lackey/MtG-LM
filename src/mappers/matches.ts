import * as querystring from "query-string";

import { MatchQueryParameters } from "services/models/QueryParams";
import { MatchResponse } from "services/models/Responses";
import { MatchRecordMap } from "models/Match";

export const toSearchQueryString = (queryParams: MatchQueryParameters): string => {
  if (!queryParams) {
    return null;
  }

  return querystring.stringify({
    "winners*": queryParams.winners,
    "losers*": queryParams.losers,
    season: queryParams.season,
    seasonPoint: queryParams.seasonPoint
  });
};

export const toMatchRecordMap = (matches: MatchResponse[]): MatchRecordMap =>
  matches.reduce((records: MatchRecordMap, match: MatchResponse) => {
    const winnerIds = match.winners;

    winnerIds.forEach((id: string) => {
      const isWin = match.games - match.wins < match.wins;

      if (records[id]) {
        const recordCopy = records[id];

        recordCopy.wins += isWin ? 1 : 0;
        recordCopy.losses += isWin ? 0 : 1;
        recordCopy.opponentsPlayed = recordCopy.opponentsPlayed.concat(match.losers);
      } else {
        records[id] = {
          wins: isWin ? 1 : 0,
          losses: isWin ? 0 : 1,
          opponentsPlayed: match.losers
        };
      }
    });

    return records;
  }, {});
