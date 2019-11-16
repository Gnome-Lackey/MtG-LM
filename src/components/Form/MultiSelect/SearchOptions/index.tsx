import * as React from "react";
import classNames from "classnames";

import { MultiSelectOption } from "components/Form/MultiSelect/models/MultiSelectOption";

import "./styles.scss";

interface MultiSelectSearchOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  options: MultiSelectOption[];
  selectedOptions: MultiSelectOption[];
  show: boolean;
}

const buildStyles = (show: boolean, count: number): { height: string } => ({
  height: show ? `${count * 35}px` : "0"
});

const MultiSelectSearchOptions = ({
  handleSelect,
  hasLabel,
  options,
  selectedOptions,
  show
}: MultiSelectSearchOptionsProps): React.FunctionComponentElement<
  MultiSelectSearchOptionsProps
> => (
  <ul
    className={classNames("search-options", { "has-label": hasLabel })}
    style={buildStyles(show, options.length)}
  >
    {options.map((option) => {
      const isSelected = selectedOptions.some(
        (selectedOption) => selectedOption.key === option.key
      );

      return (
        <li key={option.key} className={classNames("option", { selected: isSelected })}>
          <button type="button" className="btn-multi-select" onClick={() => handleSelect(option)}>
            <span className="label">{option.label}</span>
            {isSelected ? <i className="fas fa-check-circle selected-icon" /> : null}
          </button>
        </li>
      );
    })}
  </ul>
);

export default MultiSelectSearchOptions;
