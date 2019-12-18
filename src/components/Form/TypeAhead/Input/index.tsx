import * as React from "react";

import TypeAheadAction from "components/Form/TypeAhead/Input/Action";

import "./styles.scss";

interface TypeAheadInputProps {
  handleChange: React.ChangeEventHandler;
  handleKeyPress: React.KeyboardEventHandler;
  id: string;
  isSearching: boolean;
  label?: string;
  placeholder?: string;
  searchText: string;
  setSearchText: Function;
}

const TypeAheadInput = ({
  handleChange,
  handleKeyPress,
  id,
  isSearching,
  label,
  placeholder,
  searchText,
  setSearchText
}: TypeAheadInputProps): React.FunctionComponentElement<TypeAheadInputProps> => (
  <label className="type-ahead-label" htmlFor={id}>
    {label || null}
    <div className="input-container">
      <input
        autoComplete="off"
        id={id}
        value={searchText}
        className="input"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <TypeAheadAction
        hasText={!!searchText}
        isSearching={isSearching}
        setSearchValue={setSearchText}
      />
    </div>
  </label>
);

export default TypeAheadInput;
