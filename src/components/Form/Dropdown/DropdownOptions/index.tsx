import * as React from "react";
import classNames from "classnames";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

import "./styles.scss";

interface DropdownOptionsProps {
  emptyMessage?: string;
  handleSelect: Function;
  hasLabel: boolean;
  isEmptyResult: boolean;
  heightLimit?: number;
  options: DropdownOption[];
  show: boolean;
}

const buildStyles = (
  show: boolean,
  isEmptyResult: boolean,
  heightLimit: number
): { maxHeight: string } => {
  let maxHeight = "0px";

  if (show && isEmptyResult) {
    maxHeight = `${heightLimit}px`;
  } else if (show) {
    maxHeight = `${3 * heightLimit}px`;
  }

  return { maxHeight };
};

const DropdownOptions = ({
  emptyMessage,
  handleSelect,
  hasLabel,
  isEmptyResult,
  heightLimit,
  options,
  show
}: DropdownOptionsProps): React.FunctionComponentElement<DropdownOptionsProps> => (
  <ul
    className={classNames("dropdown-options", { "has-label": hasLabel }, { show })}
    style={heightLimit ? buildStyles(show, isEmptyResult, heightLimit) : null}
  >
    {options.length ? (
      options.map((option, index) => (
        <li key={option.key} className="option">
          <button
            type="button"
            className={classNames("btn-dropdown-option", { last: index === options.length - 1 })}
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
        <p className="msg">{emptyMessage || "There are no options at this time."}</p>
      </li>
    )}
  </ul>
);

export default DropdownOptions;
