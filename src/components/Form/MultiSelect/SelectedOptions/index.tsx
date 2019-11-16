import * as React from "react";
import classNames from "classnames";

import { MultiSelectOption } from "components/Form/MultiSelect/models/MultiSelectOption";

import "./styles.scss";

interface MultiSelectSelectedOptionsProps {
  handleDeselect: Function;
  hasLabel: boolean;
  inline?: boolean;
  options: MultiSelectOption[];
  show: boolean;
}

const buildStyles = (show: boolean, count: number): { height: string } => ({
  height: show ? `${(count + 1) * 35}px` : "0"
});

const MultiSelectSelectedOptions = ({
  handleDeselect,
  hasLabel,
  inline,
  options,
  show
}: MultiSelectSelectedOptionsProps): React.FunctionComponentElement<
  MultiSelectSelectedOptionsProps
> => (
  <ul
    className={classNames("selected-options", { "has-label": hasLabel, inline })}
    style={buildStyles(show, options.length)}
  >
    {options.length ? (
      options.map((option) => (
        <li key={option.key} className="selected-option">
          <span className="label">{option.label}</span>
          <button type="button" className="btn-remove" onClick={() => handleDeselect(option)}>
            <i className="far fa-times-circle" />
          </button>
        </li>
      ))
    ) : (
      <li className="selected-option empty-option">
        <span className="label">There is nothing selected.</span>
      </li>
    )}
  </ul>
);

export default MultiSelectSelectedOptions;
