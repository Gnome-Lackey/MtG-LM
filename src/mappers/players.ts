import * as querystring from "query-string";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

import { CreatePlayerNode } from "services/models/Nodes";
import { PlayerQueryParameters } from "services/models/QueryParams";

import { Player } from "models/Player";

export const toOption = (player: Player): TypeAheadOption => ({
  label: player.displayName,
  subLabel: `(${player.epithet} / ${player.userName})`,
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
