import * as React from "react";
import classNames from "classnames";

import { TypeAheadOption } from "components/Form/TypeAhead/models/TypeAheadOption";

import "./styles.scss";

interface TypeAheadSearchOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  isEmptyResult: boolean;
  options: TypeAheadOption[];
  show: boolean;
}

const buildStyles = (show: boolean, isEmptyResult: boolean): { maxHeight: string } => {
  let maxHeight = "0";

  if (show && isEmptyResult) {
    maxHeight = "35px";
  } else if (show) {
    maxHeight = "105px";
  }

  return { maxHeight };
};

const TypeAheadSearchOptions = ({
  handleSelect,
  hasLabel,
  isEmptyResult,
  options,
  show
}: TypeAheadSearchOptionsProps): React.FunctionComponentElement<TypeAheadSearchOptionsProps> => (
  <ul
    className={classNames("search-options", { "has-label": hasLabel }, { show })}
    style={buildStyles(show, isEmptyResult)}
  >
    {options.length ? (
      options.map((option, index) => (
        <li key={option.key} className="option">
          <button
            type="button"
            className={classNames("btn-type-ahead-option", { last: index === options.length - 1 })}
            onClick={() => handleSelect(option)}
          >
            {option.icon ? <i className={`option-icon ${option.icon}`} /> : null}
            <p className="label">
              {option.label}
              {option.subLabel ? <span className="small">({option.subLabel})</span> : null}
            </p>
          </button>
        </li>
      ))
    ) : (
      <li className="non-option">
        <p className="msg">No matching results.</p>
      </li>
    )}
  </ul>
);

export default TypeAheadSearchOptions;
