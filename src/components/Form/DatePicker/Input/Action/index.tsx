import * as React from "react";

import "./styles.scss";

interface DatePickerActionProps {
  hasText: boolean;
  setSearchValue: Function;
}

const DatePickerAction = ({
  hasText,
  setSearchValue
}: DatePickerActionProps): React.FunctionComponentElement<DatePickerActionProps> => {
  return (
    <div className="date-picker-action">
      {hasText ? (
        <button type="button" className="btn-clear" onClick={() => setSearchValue("")}>
          <i className="far fa-times-circle" />
        </button>
      ) : null}
    </div>
  );
};

export default DatePickerAction;
