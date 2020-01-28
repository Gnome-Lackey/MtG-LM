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

  const [selectedOptionText, setSelectedOptionText] = React.useState(placeholder || "");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  const handleSelect = (option: DropdownOption): void => {
    const text = option.subLabel ? `${option.label} (${option.subLabel})` : option.label;

    setSelectedOptionText(text);
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
    const shouldUpdateText = value && (!selectedOptionText || selectedOptionText === placeholder);

    if (shouldUpdateText) {
      const text = value.subLabel ? `${value.label} (${value.subLabel})` : value.label;

      setSelectedOptionText(text);
    }
  }, [value]);

  useOnClickOutside(reference, () => setShowDropdown(false));

  return (
    <div ref={reference} className={classNames("form-dropdown", className)}>
      <button className="btn-dropdown-toggle" type="button" onClick={handleToggle}>
        {selectedOptionText}
        {showDropdown ? <i className="fas fa-caret-up" /> : <i className="fas fa-caret-down" />}
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
