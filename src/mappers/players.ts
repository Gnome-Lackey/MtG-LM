import { Player } from "models/Player";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

export const toOption = (player: Player): TypeAheadOption => ({
  label: player.displayName,
  subLabel: player.userName,
  key: player.id
});
