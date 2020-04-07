import * as querystring from "query-string";

import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";
import { CreatePlayerNode } from "services/models/Nodes";
import { PlayerQueryParameters } from "services/models/QueryParams";
import { PlayerView } from "services/models/Views";
import { Player } from "models/Player";

export default class PlayerMapper {
  toPlayer = (player: PlayerView): Player => ({
    id: player.id,
    displayName: player.displayName,
    userName: player.userName,
    email: player.email,
    totalWins: player.totalWins,
    totalLosses: player.totalLosses,
    epithet: player.epithet,
    favoriteColors: player.colors,
  });

  toOption = (player: Player): TypeAheadOption => ({
    label: player.displayName,
    subLabel: `${player.epithet} / ${player.userName}`,
    icon: "fas fa-user",
    key: player.id,
  });

  toCreateNode = (player: Player): CreatePlayerNode => ({
    id: player.id,
    name: player.displayName,
    userName: player.userName,
    email: player.email,
    epithet: player.epithet,
    favoriteColors: player.favoriteColors,
  });

  toSearchQueryString(queryParams: PlayerQueryParameters): string {
    if (!queryParams) {
      return null;
    }

    return querystring.stringify({
      "name|": queryParams.name,
      season: queryParams.season,
      "userName|": queryParams.userName,
    });
  }
}
