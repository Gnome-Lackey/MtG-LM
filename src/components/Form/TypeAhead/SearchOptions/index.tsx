import * as React from "react";
import classNames from "classnames";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

import "./styles.scss";

interface TypeAheadSearchOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  isEmptyResult: boolean;
  options: TypeAheadOption[];
  show: boolean;
}

const buildStyles = (show: boolean, isEmptyResult: boolean, count: number): { height: string } => {
  let height = "0";

  if (show && isEmptyResult) {
    height = "35px";
  } else if (show) {
    height = `${count * 35}px`;
  }

  return { height };
};

const TypeAheadSearchOptions = ({
  handleSelect,
  hasLabel,
  isEmptyResult,
  options,
  show
}: TypeAheadSearchOptionsProps): React.FunctionComponentElement<TypeAheadSearchOptionsProps> => (
  <ul
    className={classNames("search-options", { "has-label": hasLabel })}
    style={buildStyles(show, isEmptyResult, options.length)}
  >
    {options.length ? (
      options.map((option, index) => (
        <li key={option.key} className="option">
          <button
            type="button"
            className={classNames("btn-type-ahead", { last: index === options.length - 1 })}
            onClick={() => handleSelect(option)}
          >
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
