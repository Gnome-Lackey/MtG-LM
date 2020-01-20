import * as uuid from "uuid";

import { RecordMatchFields } from "components/Hooks/useFormData/models/FormFields";

export const buildInitialFormState = (): RecordMatchFields => ({
  playerRecords: [
    {
      id: uuid.v4(),
      player: null,
      wins: 0
    },
    {
      id: uuid.v4(),
      player: null,
      wins: 0
    }
  ],
  season: null
});

export const isSubmitDisabled = (fields: RecordMatchFields): boolean => {
  const { playerRecords } = fields;

  const hasInvalidSeason = !fields.season;
  const hasInvalidGameCount = playerRecords.reduce((total, record) => total + record.wins, 0) <= 0;
  const hasInvalidPlayers = playerRecords.some((record) => !record.player || record.wins < 0);

  return hasInvalidSeason || hasInvalidGameCount || hasInvalidPlayers;
};
