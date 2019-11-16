import { MultiSelectOption } from "components/Form/MultiSelect/models/MultiSelectOption";

export const mapOptionsToKeys = (options: MultiSelectOption[]): string[] =>
  options ? options.map((option: MultiSelectOption) => option.key) : [];

export const mapDataToMultiSelectOption = (data: {
  id: string;
  name: string;
}): MultiSelectOption => ({
  key: data.id,
  label: data.name
});
