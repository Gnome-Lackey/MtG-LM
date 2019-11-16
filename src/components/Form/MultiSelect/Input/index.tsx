import * as React from "react";

import MultiSelectAction from "components/Form/MultiSelect/Action";
import { MultiSelectOption } from "components/Form/MultiSelect/models/MultiSelectOption";

import "./styles.scss";

interface MultiSelectInputProps {
  handleChange: React.ChangeEventHandler;
  handleKeyPress: React.KeyboardEventHandler;
  id: string;
  isSearching: boolean;
  label?: string;
  placeholder?: string;
  searchText: string;
  selected: MultiSelectOption[];
  setSearchText: Function;
  setShowSelected: Function;
  showPanel: boolean;
  showSelected: boolean;
  single: boolean;
}

function buildPlaceHolderText(
  placeholder: string,
  selected: MultiSelectOption[],
  showPanel: boolean,
  single: boolean
): string {
  if (showPanel) {
    return "";
  } else if (placeholder) {
    return placeholder;
  } else if (single) {
    return selected[0] ? selected[0].label : "";
  } else {
    const optionString = selected.map((option) => option.label).join(", ");

    let stringEnd = optionString.length < 20 ? optionString.length : 20;
    stringEnd = /[, ]/.test(optionString.charAt(stringEnd - 1)) ? stringEnd - 2 : stringEnd;

    return `${optionString.slice(0, stringEnd)}...`;
  }
}

const MultiSelectInput = ({
  handleChange,
  handleKeyPress,
  id,
  isSearching,
  label,
  placeholder,
  searchText,
  selected,
  setSearchText,
  setShowSelected,
  showPanel,
  showSelected,
  single
}: MultiSelectInputProps): React.FunctionComponentElement<MultiSelectInputProps> => {
  const placeholderText = buildPlaceHolderText(placeholder, selected, showPanel, single);

  return (
    <label className="multi-select-label" htmlFor={id}>
      {label || null}
      <div className="input-container">
        <input
          autoComplete="off"
          id={id}
          value={searchText}
          className="input"
          placeholder={placeholderText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <MultiSelectAction
          hasText={!!searchText}
          isPanelMode={showPanel}
          isSearching={isSearching}
          isSelected={showSelected}
          selectedCount={selected.length}
          setShowSelected={setShowSelected}
          setSearchValue={setSearchText}
        />
      </div>
    </label>
  );
};

export default MultiSelectInput;
