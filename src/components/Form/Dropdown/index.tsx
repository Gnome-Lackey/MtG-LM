import * as React from "react";
import * as classNames from "classnames";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import DropdownOptions from "components/Form/Dropdown/DropdownOptions";

import { DropdownOption } from "components/Form/Dropdown/Model/DropdownOption";

import "./styles.scss";

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  selectHandler: Function;
}

const Dropdown = ({
  label,
  options,
  placeholder,
  selectHandler
}: DropdownProps): React.FunctionComponentElement<DropdownProps> => {
  const reference = React.useRef();

  const [selectedOption, setSelectedOption] = React.useState(placeholder || "");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [isEmptyResult, setIsEmptyResult] = React.useState(false);

  const handleSelect = (option: DropdownOption): void => {
    const text = option.subLabel ? `${option.label} (${option.subLabel})` : option.label;

    setSelectedOption(text);
    setShowDropdown(false);
    selectHandler(option);
  };

  const handleToggle = (): void => {
    setShowDropdown(!showDropdown);
  };

  React.useEffect(() => {
    setIsEmptyResult(!options.length);
  }, [options]);

  useOnClickOutside(reference, () => setShowDropdown(false));

  return (
    <div ref={reference} className="form-dropdown">
      <button className="btn-dropdown-toggle" type="button" onClick={handleToggle}>
        {selectedOption}
      </button>
      <div className={classNames("dropdown-options-wrapper", { show: showDropdown })}>
        <DropdownOptions
          handleSelect={handleSelect}
          hasLabel={!!label}
          isEmptyResult={isEmptyResult}
          options={options}
          show={showDropdown}
        />
      </div>
    </div>
  );
};

export default Dropdown;
