import * as querystring from "query-string";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

import { CreatePlayerNode } from "services/models/Nodes";
import { PlayerQueryParameters } from "services/models/QueryParams";
import { PlayerView } from "services/models/Views";

import { Player } from "models/Player";

export const toPlayer = (player: PlayerView): Player => ({
  id: player.id,
  displayName: player.displayName,
  userName: player.userName,
  email: player.email,
  totalWins: player.totalWins,
  totalLosses: player.totalLosses,
  epithet: player.epithet,
  favoriteColors: player.colors
});

export const toOption = (player: Player): TypeAheadOption => ({
  label: player.displayName,
  subLabel: `${player.epithet} / ${player.userName}`,
  icon: "fas fa-user",
  key: player.id
});

export const toCreateNode = (player: Player): CreatePlayerNode => ({
  id: player.id,
  name: player.displayName,
  userName: player.userName,
  email: player.email,
  epithet: player.epithet,
  favoriteColors: player.favoriteColors
});

export const toSearchQueryString = (queryParams: PlayerQueryParameters): string => {
  if (!queryParams) {
    return null;
  }

  return querystring.stringify({
    "name|": queryParams.name,
    season: queryParams.season,
    "userName|": queryParams.userName
  });
};
