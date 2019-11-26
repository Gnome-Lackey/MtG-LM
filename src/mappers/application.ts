import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

export const mapOptionsToKeys = (options: TypeAheadOption[]): string[] =>
  options ? options.map((option: TypeAheadOption) => option.key) : [];

export const mapDataToTypeAheadOption = (data: {
  id: string;
  name: string;
}): TypeAheadOption => ({
  key: data.id,
  label: data.name
});
