import * as React from "react";
import * as classNames from "classnames";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import DropdownOptions from "components/Form/Dropdown/DropdownOptions";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

import "./styles.scss";

interface DropdownProps {
  className?: string;
  heightLimit?: number;
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  selectHandler: Function;
  value?: DropdownOption;
}

const Dropdown = ({
  className,
  heightLimit,
  label,
  options,
  placeholder,
  selectHandler,
  value
}: DropdownProps): React.FunctionComponentElement<DropdownProps> => {
  const reference = React.useRef();

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  const handleSelect = (option: DropdownOption): void => {
    setSelectedOption(option);
    setShowDropdown(false);
    selectHandler(option);
  };

  const handleToggle = (): void => {
    setShowDropdown(!showDropdown);
  };

  React.useEffect(() => {
    setIsEmptyResult(!options.length);
  }, [options]);

  React.useEffect(() => {
    if (value && value !== selectedOption) {
      setSelectedOption(value);
    }
  }, [value]);

  useOnClickOutside(reference, () => setShowDropdown(false));

  const icon =
    selectedOption && selectedOption.icon ? (
      <i className={`option-icon ${selectedOption.icon}`} />
    ) : null;

  const text = selectedOption ? selectedOption.label : placeholder;
  const subtext = selectedOption && selectedOption.subLabel ? `(${selectedOption.subLabel})` : "";

  return (
    <div ref={reference} className={classNames("form-dropdown", className)}>
      <button className="btn-dropdown-toggle" type="button" onClick={handleToggle}>
        {icon}
        <p className="label">
          {text}
          <span className="small">{subtext}</span>
        </p>
        <i className={`fas fa-caret-${showDropdown ? "up" : "down"}`} />
      </button>
      <div className={classNames("dropdown-options-wrapper", { show: showDropdown })}>
        <DropdownOptions
          handleSelect={handleSelect}
          hasLabel={!!label}
          heightLimit={heightLimit}
          isEmptyResult={isEmptyResult}
          options={options}
          show={showDropdown}
        />
      </div>
    </div>
  );
};

export default Dropdown;
