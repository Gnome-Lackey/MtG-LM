import * as React from "react";

import DatePickerInput from "components/Form/DatePicker/Input";
import DatePickerDropdown from "components/Form/DatePicker/CalendarDropdown";

import useOnClickOutside from "components/Hooks/useOnClickOutside";

import "./styles.scss";

interface DatePickerProps {
  id: string;
  label?: string;
  placeholder?: string;
  selectHandler: Function;
  value: string;
}

const DatePicker = ({
  id,
  label,
  placeholder,
  selectHandler,
  value
}: DatePickerProps): React.FunctionComponentElement<DatePickerProps> => {
  const reference = React.useRef();

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleSelect = (text: string): void => {
    document.getElementById(id).focus();

    setShowDropdown(false);
    selectHandler(text);
  };

  const handleChange = (ev: React.ChangeEvent): void => {
    ev.preventDefault();

    const { value: text } = ev.target as any;

    const isValidDateText = /^([0-9]+[/]*)*$/.test(text);

    if (isValidDateText) {
      const hasValue = !!text;

      selectHandler(text);

      if (hasValue) {
        setShowDropdown(true);
      }
    }
  };

  const handleKeyPress = (ev: React.KeyboardEvent): void => {
    const { key } = ev;

    if (key === "Escape") {
      setShowDropdown(false);
    } else if (key === "Enter") {
      ev.preventDefault();

      setShowDropdown(!showDropdown);
    }
  };

  const handleClear = (): void => {
    selectHandler("");
  };

  const handleFocus = (): void => {
    setShowDropdown(true);
  };

  useOnClickOutside(reference, () => setShowDropdown(false));

  return (
    <div ref={reference} className="form-date-picker">
      <div className="date-picker-container">
        <DatePickerInput
          clearHandler={handleClear}
          dateText={value}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleKeyPress={handleKeyPress}
          id={id}
          label={label}
          placeholder={placeholder}
        />
        {showDropdown ? <DatePickerDropdown dateText={value} selectHandler={handleSelect} /> : null}
      </div>
    </div>
  );
};

export default DatePicker;
