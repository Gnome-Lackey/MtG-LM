import * as React from "react";
import classNames from "classnames";

import { TypeAheadOption } from "components/Form/TypeAhead/Model/TypeAheadOption";

import "./styles.scss";

interface TypeAheadSearchOptionsProps {
  handleSelect: Function;
  hasLabel: boolean;
  options: TypeAheadOption[];
  show: boolean;
}

const buildStyles = (show: boolean, count: number): { height: string } => ({
  height: show ? `${count * 35}px` : "0"
});

const TypeAheadSearchOptions = ({
  handleSelect,
  hasLabel,
  options,
  show
}: TypeAheadSearchOptionsProps): React.FunctionComponentElement<TypeAheadSearchOptionsProps> => (
  <ul
    className={classNames("search-options", { "has-label": hasLabel })}
    style={buildStyles(show, options.length)}
  >
    {options.map((option) => (
      <li key={option.key} className="option">
        <button type="button" className="btn-type-ahead" onClick={() => handleSelect(option)}>
          <p className="label">
            {option.label}
            {option.subLabel ? <span className="small">({option.subLabel})</span> : null}
          </p>
        </button>
      </li>
    ))}
  </ul>
);

export default TypeAheadSearchOptions;
