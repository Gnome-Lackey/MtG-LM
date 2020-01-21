import * as React from "react";
import classNames from "classnames";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

import "./styles.scss";

interface DropdownOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  isEmptyResult: boolean;
  options: DropdownOption[];
  show: boolean;
}

const buildStyles = (show: boolean, isEmptyResult: boolean, count: number): { height: string } => {
  let height = "0";

  if (show && isEmptyResult) {
    height = "32px";
  } else if (show) {
    height = `${count * 32}px`;
  }

  return { height };
};

const DropdownOptions = ({
  handleSelect,
  hasLabel,
  isEmptyResult,
  options,
  show
}: DropdownOptionsProps): React.FunctionComponentElement<DropdownOptionsProps> => (
  <ul
    className={classNames("dropdown-options", { "has-label": hasLabel }, { show })}
    style={buildStyles(show, isEmptyResult, options.length)}
  >
    {options.length ? (
      options.map((option, index) => (
        <li key={option.key} className="option">
          <button
            type="button"
            className={classNames("btn-dropdown-option", { last: index === options.length - 1 })}
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

export default DropdownOptions;
