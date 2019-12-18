import { Set } from "models/Set";
import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

export const toOption = (set: Set): TypeAheadOption => ({
  label: set.name,
  key: set.code
});
