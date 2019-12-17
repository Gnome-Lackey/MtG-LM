import * as React from "react";

import DatePickerAction from "components/Form/DatePicker/Input/Action";

import "./styles.scss";

interface DatePickerInputProps {
  clearHandler: Function;
  dateText: string;
  handleChange: React.ChangeEventHandler;
  handleFocus: React.FocusEventHandler;
  handleKeyPress: React.KeyboardEventHandler;
  id: string;
  label?: string;
  placeholder?: string;
}

const DatePickerInput = ({
  clearHandler,
  dateText,
  handleChange,
  handleFocus,
  handleKeyPress,
  id,
  label,
  placeholder
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
        onFocus={handleFocus}
      />
      <DatePickerAction hasText={!!dateText} setSearchValue={clearHandler} />
    </div>
  </label>
);

export default DatePickerInput;
