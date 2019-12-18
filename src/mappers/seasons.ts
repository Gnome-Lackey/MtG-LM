import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";
import { CreateSeasonNode, UpdateSeasonNode } from "services/models/Nodes";

export const toCreateNode = (details: SeasonFields): CreateSeasonNode => ({
  startedOn: details.startedDate,
  endedOn: details.endedDate,
  players: details.players.length ? details.players.map((player) => player.key) : [],
  set: details.set.key,
  isActive: details.isActive || false
});

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
