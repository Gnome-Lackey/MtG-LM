import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";
import { Set } from "models/Scryfall";

export default class SetMapper {
  toOption = (set: Set): TypeAheadOption => ({
    label: set.name,
    key: set.code,
  });
}
