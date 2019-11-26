import * as React from "react";

import TypeAheadInput from "components/Form/TypeAhead/Input";
import TypeAheadSearchOptions from "components/Form/TypeAhead/SearchOptions";
import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import "./styles.scss";

interface TypeAheadProps {
  id: string;
  isSearching: boolean;
  label?: string;
  options: TypeAheadOption[];
  placeholder?: string;
  searchHandler: Function;
  selectedOption: TypeAheadOption;
  selectHandler: Function;
}

const TypeAhead = ({
  id,
  isSearching,
  label,
  options,
  placeholder,
  searchHandler,
  selectedOption,
  selectHandler
}: TypeAheadProps): React.FunctionComponentElement<TypeAheadProps> => {
  const reference = React.useRef();
  const [searchText, setSearchText] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);

  const handleSelect = (option: TypeAheadOption): void => {
    document.getElementById(id).focus();

    if (selectHandler) {
      selectHandler(option);
    }
  };

  const handleChange = (ev: React.ChangeEvent): void => {
    ev.preventDefault();

    const { value } = ev.target as any;

    const hasValue = !!value;

    setSearchText(value);
    setShowSearch(hasValue);

    if (hasValue) {
      searchHandler(value);
    }
  };

  const handleKeyPress = (ev: React.KeyboardEvent): void => {
    const { key } = ev;

    if (key === "Escape") {
      setSearchText("");
      setShowSearch(false);
    } else if (key === "Enter") {
      ev.preventDefault();
    }
  };

  React.useEffect(() => {
    setShowSearch(!isSearching);
  }, [isSearching]);

  useOnClickOutside(reference, () => setShowSearch(false));

  return (
    <div ref={reference} className="form-type-ahead">
      <div className="search">
        <TypeAheadInput
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          id={id}
          isSearching={isSearching}
          label={label}
          placeholder={placeholder}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <TypeAheadSearchOptions
          handleSelect={handleSelect}
          hasLabel={!!label}
          options={options}
          selectedOption={selectedOption}
          show={showSearch}
        />
      </div>
    </div>
  );
};

export default TypeAhead;
