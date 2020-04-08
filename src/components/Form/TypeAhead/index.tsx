import * as React from "react";
import * as classNames from "classnames";
import { debounce } from "debounce";

import TypeAheadInput from "components/Form/TypeAhead/Input";
import TypeAheadSearchOptions from "components/Form/TypeAhead/SearchOptions";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

import "./styles.scss";

interface TypeAheadProps {
  autoSubmit?: boolean;
  clearHandler?: Function;
  id: string;
  isSearching: boolean;
  label?: string;
  options: TypeAheadOption[];
  placeholder?: string;
  searchHandler: Function;
  selectHandler: Function;
}

const TypeAhead = ({
  autoSubmit,
  clearHandler,
  id,
  isSearching,
  label,
  options,
  placeholder,
  searchHandler,
  selectHandler
}: TypeAheadProps): React.FunctionComponentElement<TypeAheadProps> => {
  const reference = React.useRef();

  const [searchText, setSearchText] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);
  const [handleSearch] = React.useState(() => debounce(searchHandler, 300));

  const handleSelect = (option: TypeAheadOption): void => {
    document.getElementById(id).focus();

    if (!autoSubmit) {
      setSearchText(option.label);
    }

    setShowSearch(false);
    selectHandler(option);
  };

  const handleChange = (ev: React.ChangeEvent): void => {
    ev.preventDefault();

    const { value } = ev.target as any;

    const hasValue = !!value;

    setSearchText(value);

    if (hasValue) {
      handleSearch(value);
    } else {
      handleSearch.clear();

      setShowSearch(false);

      if (clearHandler) {
        clearHandler();
      }
    }
  };

  const handleKeyPress = (ev: React.KeyboardEvent): void => {
    const { key } = ev;

    if (key === "Escape") {
      setShowSearch(false);
    } else if (key === "Enter") {
      ev.preventDefault();
    }
  };

  React.useEffect(() => {
    const foundContent = !isSearching && !!searchText;

    setShowSearch(foundContent);

    if (isSearching) {
      setIsEmptyResult(false);
    }

    if (foundContent) {
      setShowSearch(true);
    }
  }, [isSearching]);

  React.useEffect(() => {
    setIsEmptyResult(!options.length);
  }, [options]);

  useOnClickOutside(reference, () => setShowSearch(false));

  return (
    <div ref={reference} className="form-type-ahead">
      <div className={classNames("search", { show: showSearch }, { "has-label": !!label })}>
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
          isEmptyResult={isEmptyResult}
          options={options}
          show={showSearch}
        />
      </div>
    </div>
  );
};

export default TypeAhead;
