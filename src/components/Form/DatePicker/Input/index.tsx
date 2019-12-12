import * as React from "react";

import DatePickerAction from "components/Form/DatePicker/Input/Action";

import "./styles.scss";

interface DatePickerInputProps {
  handleChange: React.ChangeEventHandler;
  handleKeyPress: React.KeyboardEventHandler;
  id: string;
  label?: string;
  placeholder?: string;
  dateText: string;
  setDateText: Function;
}

const DatePickerInput = ({
  handleChange,
  handleKeyPress,
  id,
  label,
  placeholder,
  dateText,
  setDateText
}: DatePickerInputProps): React.FunctionComponentElement<DatePickerInputProps> => (
  <label className="type-ahead-label" htmlFor={id}>
    {label || null}
    <div className="input-container">
      <input
        autoComplete="off"
        id={id}
        value={dateText}
        className="input"
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <DatePickerAction
        hasText={!!dateText}
        setSearchValue={setDateText}
      />
    </div>
  </label>
);

export default DatePickerInput;
