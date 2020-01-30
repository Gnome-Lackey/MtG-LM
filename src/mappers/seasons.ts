import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";
import { CreateSeasonNode, UpdateSeasonNode } from "services/models/Nodes";
import { SeasonDetailsResponse } from "services/models/Responses";
import { Season } from "models/Season";
import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

export const toOption = (details: Season): DropdownOption => ({
  key: details.id,
  icon: `ss ss-${details.set.code}`,
  label: details.set.name,
  subLabel: details.startedOn
});

export const toSeason = (details: SeasonDetailsResponse): Season => ({
  id: details.id,
  isActive: details.isActive,
  players: details.players.map((player) => ({
    id: player.id,
    displayName: player.displayName,
    userName: player.userName,
    email: player.email,
    totalWins: player.totalWins,
    totalLosses: player.totalLosses,
    epithet: player.epithet,
    favoriteColors: player.colors
  })),
  set: details.set,
  startedOn: details.startedOn,
  endedOn: details.endedOn
});

export const toCreateNode = (details: SeasonFields): CreateSeasonNode => {
  const { startedDate, endedDate, players, set, isActive } = details;

  const node: CreateSeasonNode = {
    startedOn: startedDate,
    set: set.key,
    players: players.length ? players.map((player) => player.key) : [],
    isActive: isActive || false
  };

  if (endedDate) {
    node.endedOn = endedDate;
  }

  return node;
};

export const toUpdateNode = (details: SeasonFields): UpdateSeasonNode => {
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
};
