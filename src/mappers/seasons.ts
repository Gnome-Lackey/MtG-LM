import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";
import { DropdownOption } from "components/Form/Dropdown/models/DropdownOption";
import { CreateSeasonNode, UpdateSeasonNode } from "services/models/Nodes";
import { SeasonDetailsResponse } from "services/models/Responses";
import { Season } from "models/Season";

export default class SeasonMapper {
  toOption = (details: Season): DropdownOption => ({
    key: details.id,
    icon: `ss ss-${details.set.code}`,
    label: details.set.name,
    subLabel: details.startedOn,
  });

  toSeason = (details: SeasonDetailsResponse): Season => ({
    id: details.id,
    isActive: details.isActive,
    set: details.set,
    startedOn: details.startedOn,
    endedOn: details.endedOn,
  });

  toCreateNode(details: SeasonFields): CreateSeasonNode {
    const { startedDate, endedDate, players, set, isActive } = details;

    const node: CreateSeasonNode = {
      startedOn: startedDate,
      set: set.key,
      players: players.length ? players.map((player) => player.key) : [],
      isActive: isActive || false,
    };

    if (endedDate) {
      node.endedOn = endedDate;
    }

    return node;
  }

  toUpdateNode(details: SeasonFields): UpdateSeasonNode {
    const { startedDate, endedDate, players, set, isActive } = details;

    const node: UpdateSeasonNode = { isActive: isActive || false };

    if (startedDate) {
      node.startedOn = startedDate;
    }

    if (endedDate) {
      node.endedOn = endedDate;
    }

    if (players && players.length) {
      node.players = details.players.map((player) => player.key);
    }

    if (set) {
      node.set = set.key;
    }

    return node;
  }
}
