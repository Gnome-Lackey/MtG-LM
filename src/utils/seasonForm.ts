import * as moment from "moment";

import * as playerMapper from "mappers/players";
import * as setMapper from "mappers/sets";

import { Season } from "models/Season";
import { SeasonFields } from "components/Hooks/useFormData/models/FormFields";

import { DISPLAY_DATE_FORMAT } from "constants/dates";

export const buildInitialFormState = (season: Season): SeasonFields =>
  season
    ? {
        set: setMapper.toOption(season.set),
        players: season.players.map(playerMapper.toOption),
        startedDate: season.startedOn ? season.startedOn : "",
        endedDate: season.endedOn ? season.endedOn : "",
        isActive: season.isActive || false
      }
    : {
        set: null,
        players: [],
        startedDate: "",
        endedDate: "",
        isActive: false
      };

export const isSubmitDisabled = (
  season: Season,
  fields: SeasonFields,
  isFormLoading: boolean
): boolean => {
  const invalidDates =
    !fields.endedDate ||
    moment(fields.startedDate, DISPLAY_DATE_FORMAT).isAfter(
      moment(fields.endedDate, DISPLAY_DATE_FORMAT)
    );

  const updateDisabled =
    !!season &&
    fields.startedDate === season.startedOn &&
    fields.isActive === season.isActive &&
    fields.set.key === season.set.code &&
    (!fields.endedDate || fields.endedDate === season.endedOn) &&
    fields.players.every(
      (player) => !!season.players.find((seasonPlayer) => seasonPlayer.id === player.key)
    );

  const invalidEndDate = !fields.isActive && !fields.endedDate;
  const invalidRequiredFields = !fields.startedDate || !fields.set;

  return isFormLoading || invalidRequiredFields || invalidEndDate || invalidDates || updateDisabled;
};
