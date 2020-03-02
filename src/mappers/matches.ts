import * as querystring from "query-string";

import { MatchQueryParameters } from "services/models/QueryParams";

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
