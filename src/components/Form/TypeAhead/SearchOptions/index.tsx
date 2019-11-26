import * as React from "react";
import classNames from "classnames";

import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

import "./styles.scss";

interface TypeAheadSearchOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  options: TypeAheadOption[];
  selectedOption: TypeAheadOption;
  show: boolean;
}

const buildStyles = (show: boolean, count: number): { height: string } => ({
  height: show ? `${count * 35}px` : "0"
});

const TypeAheadSearchOptions = ({
  handleSelect,
  hasLabel,
  options,
  selectedOption,
  show
}: TypeAheadSearchOptionsProps): React.FunctionComponentElement<
  TypeAheadSearchOptionsProps
> => (
  <ul
    className={classNames("search-options", { "has-label": hasLabel })}
    style={buildStyles(show, options.length)}
  >
    {options.map((option) => {
      const isSelected = selectedOption.key === option.key;

      return (
        <li key={option.key} className={classNames("option", { selected: isSelected })}>
          <button type="button" className="btn-type-ahead" onClick={() => handleSelect(option)}>
            <span className="label">{option.label}</span>
            {isSelected ? <i className="fas fa-check-circle selected-icon" /> : null}
          </button>
        </li>
      );
    })}
  </ul>
);

export default TypeAheadSearchOptions;
