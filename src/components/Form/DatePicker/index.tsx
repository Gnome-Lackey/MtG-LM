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
}

const DatePicker = ({
  id,
  label,
  placeholder,
  selectHandler
}: DatePickerProps): React.FunctionComponentElement<DatePickerProps> => {
  const reference = React.useRef();

  const [dateText, setDateText] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleSelect = (value: string): void => {
    document.getElementById(id).focus();

    setDateText(value);

    setShowDropdown(false);
    selectHandler(value);
  };

  const handleChange = (ev: React.ChangeEvent): void => {
    ev.preventDefault();

    const { value } = ev.target as any;

    const isValidDate = /^([0-9]+[/]*)*$/.test(value);

    if (isValidDate) {
      const hasValue = !!value;

      setDateText(value);

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

  useOnClickOutside(reference, () => setShowDropdown(false));

  return (
    <div ref={reference} className="form-date-picker">
      <div className="date-picker-container">
        <DatePickerInput
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
          id={id}
          label={label}
          placeholder={placeholder}
          dateText={dateText}
          setDateText={setDateText}
        />
        {showDropdown ? (
          <DatePickerDropdown dateText={dateText} selectHandler={handleSelect} />
        ) : null}
      </div>
    </div>
  );
};

export default DatePicker;
