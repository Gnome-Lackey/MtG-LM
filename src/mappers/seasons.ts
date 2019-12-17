import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";
import { CreateSeasonNode } from "services/models/Nodes";

export const toCreateNode = (details: SeasonFields): CreateSeasonNode => ({
  startedOn: details.startedDate,
  endedOn: details.endedDate,
  players: details.playerOptions.map((player) => player.key),
  set: details.setOption.key
});
