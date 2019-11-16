import * as React from "react";
import * as classNames from "classnames";

import MultiSelectInput from "components/Form/MultiSelect/Input";
import MultiSelectSearchOptions from "components/Form/MultiSelect/SearchOptions";
import MultiSelectSelectedOptions from "components/Form/MultiSelect/SelectedOptions";
import { MultiSelectOption } from "components/Form/MultiSelect/models/MultiSelectOption";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import "./styles.scss";

interface MultiSelectProps {
  deselectHandler?: Function;
  id: string;
  isSearching: boolean;
  label?: string;
  options: MultiSelectOption[];
  placeholder?: string;
  searchHandler: Function;
  selectedOptions: MultiSelectOption[];
  selectHandler?: Function;
  showPanel?: boolean;
  single?: boolean;
}

const MultiSelect = ({
  deselectHandler,
  id,
  isSearching,
  label,
  options,
  placeholder,
  searchHandler,
  selectedOptions,
  selectHandler,
  showPanel,
  single
}: MultiSelectProps): React.FunctionComponentElement<MultiSelectProps> => {
  const reference = React.useRef();
  const [searchText, setSearchText] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const [showSelected, setShowSelected] = React.useState(false);

  const hasLabel = !!label;
  const hideSelectedDropdown = showPanel || single;

  const handleSelect = (option: MultiSelectOption): void => {
    document.getElementById(id).focus();

    if (single) {
      setShowSearch(false);
    }

    if (selectHandler) {
      selectHandler(option);
    }
  };

  const handleDeselect = (option: MultiSelectOption): void => {
    if (single) {
      setSearchText("");
      setShowSearch(false);

      document.getElementById(id).focus();
    }

    if (selectHandler) {
      deselectHandler(option);
    }
  };

  const handleChange = (ev: React.ChangeEvent): void => {
    ev.preventDefault();

    const { value } = ev.target as any;

    const hasValue = !!value;

    setSearchText(value);
    setShowSearch(hasValue);

    if (!hideSelectedDropdown) {
      setShowSelected(false);
    }

    if (hasValue) {
      searchHandler(value);
    }
  };

  const handleKeyPress = (ev: React.KeyboardEvent): void => {
    const { key } = ev;

    if (key === "Escape") {
      setSearchText("");

      if (!hideSelectedDropdown) {
        setShowSelected(false);
      }
    } else if (key === "Enter") {
      ev.preventDefault();
    }
  };

  React.useEffect(() => {
    setShowSearch(!isSearching);
  }, [isSearching]);

  useOnClickOutside(reference, () => setShowSearch(false));

  return (
    <div ref={reference} className="form-multi-select">
      <div className={classNames("search", { "has-panel": showPanel })}>
        <MultiSelectInput
          showPanel={showPanel}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          id={id}
          isSearching={isSearching}
          label={label}
          placeholder={placeholder}
          searchText={searchText}
          selected={selectedOptions}
          setSearchText={setSearchText}
          setShowSelected={setShowSelected}
          showSelected={showSelected}
          single={single}
        />
        <MultiSelectSearchOptions
          handleSelect={handleSelect}
          hasLabel={!!label}
          options={options}
          selectedOptions={selectedOptions}
          show={showSearch}
        />
        {hideSelectedDropdown ? null : (
          <MultiSelectSelectedOptions
            handleDeselect={handleDeselect}
            hasLabel={!!label}
            options={selectedOptions}
            show={showSelected}
          />
        )}
      </div>
      {showPanel ? (
        <div className={classNames("panel", { "has-label": hasLabel })}>
          <MultiSelectSelectedOptions
            handleDeselect={handleDeselect}
            hasLabel={hasLabel}
            options={selectedOptions}
            show
            inline
          />
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
