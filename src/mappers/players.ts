import { Player } from "models/Player";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";
import { CreatePlayerNode } from "services/models/Nodes";

export const toOption = (player: Player): TypeAheadOption => ({
  label: player.displayName,
  subLabel: player.userName,
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
