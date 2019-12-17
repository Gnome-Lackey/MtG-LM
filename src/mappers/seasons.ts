import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";
import { CreateSeasonNode } from "services/models/Nodes";

export const toCreateNode = (details: SeasonFields): CreateSeasonNode => ({
  startedOn: details.startedDate,
  endedOn: details.endedDate,
  players: details.players.map((player) => player.key),
  set: details.set.key,
  isActive: details.isActive
});
