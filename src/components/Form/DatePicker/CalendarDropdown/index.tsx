import * as React from "react";
import * as moment from "moment";
import * as uuid from "uuid";
import * as classNames from "classnames";

import {
  MONTH_YEAR_FORMAT,
  NUMERICAL_DAY_OF_WEEK_FORMAT,
  CALENDAR_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
  ISO_DAY_OF_WEEK_FORMAT,
  MONTH_NAME_FORMAT,
  MONTH_FORMAT,
  YEAR_FORMAT
} from "constants/dates";

import "./styles.scss";

interface DatePickerDropdownProps {
  dateText: string;
  selectHandler: Function;
}

const buildDays = (
  currentMonth: string,
  currentYear: string,
  dateText: string,
  selectHandler: Function
): React.ReactElement<any>[] => {
  const days = [];
  const currentMonthYear = moment(`${currentMonth} ${currentYear}`, MONTH_YEAR_FORMAT);
  const daysInMonth = moment(currentMonthYear).daysInMonth();

  const firstDayOfMonthValue = parseInt(
    moment(currentMonthYear)
      .startOf("month")
      .format(NUMERICAL_DAY_OF_WEEK_FORMAT),
    10
  );
  const previousMonthDayCount = moment(currentMonthYear)
    .subtract({ months: 1 })
    .daysInMonth();

  for (let i = 0; i < firstDayOfMonthValue; i += 1) {
    days.push(
      <li key={uuid.v4()} className="date-picker-dropdown-calendar-day">
        <button className={classNames("btn-day", "disabled")} type="button">
          {previousMonthDayCount - i}
        </button>
      </li>
    );
  }

  for (let i = 1; i <= daysInMonth; i += 1) {
    const currentDate = moment(`${currentMonth} ${i} ${currentYear}`, CALENDAR_DATE_FORMAT);
    const formattedInputDate = moment(dateText, DISPLAY_DATE_FORMAT);
    const formattedCurrentDate = moment(currentDate).format(DISPLAY_DATE_FORMAT);
    const isMatchedDate = moment(currentDate).isSame(formattedInputDate);

    days.push(
      <li key={uuid.v4()} className="date-picker-dropdown-calendar-day">
        <button
          className={classNames("btn-day", { match: isMatchedDate })}
          type="button"
          onClick={() => {
            selectHandler(formattedCurrentDate);
          }}
        >
          {i}
        </button>
      </li>
    );
  }

  const lastDayOfMonthValue = parseInt(
    moment(currentMonthYear)
      .endOf("month")
      .format(ISO_DAY_OF_WEEK_FORMAT),
    10
  );

  for (let i = 1; i < 7 - lastDayOfMonthValue; i += 1) {
    days.push(
      <li key={uuid.v4()} className="date-picker-dropdown-calendar-day">
        <button className={classNames("btn-day", "disabled")} type="button">
          {i}
        </button>
      </li>
    );
  }

  return days;
};

const DatePickerDropdown = ({
  dateText,
  selectHandler
}: DatePickerDropdownProps): React.FunctionComponentElement<DatePickerDropdownProps> => {
  const [currentMonthName, setCurrentMonthName] = React.useState(moment().format(MONTH_NAME_FORMAT));
  const [currentMonth, setCurrentMonth] = React.useState(moment().format(MONTH_FORMAT));
  const [currentYear, setCurrentYear] = React.useState(moment().format(YEAR_FORMAT));

  const updateDates = (month: moment.Moment): void => {
    setCurrentMonth(month.format(MONTH_FORMAT));
    setCurrentMonthName(month.format(MONTH_NAME_FORMAT));

    const year = month.format(YEAR_FORMAT);

    if (year !== currentYear) {
      setCurrentYear(year);
    }
  };

  const handleNextMonth = (): void => {
    const monthYear = `${currentMonth} ${currentYear}`;
    const nextMonth = moment(monthYear, MONTH_YEAR_FORMAT).add({ months: 1 });

    updateDates(nextMonth);
  };

  const handlePrevMonth = (): void => {
    const monthYear = `${currentMonth} ${currentYear}`;
    const prevMonth = moment(monthYear, MONTH_YEAR_FORMAT).subtract({ months: 1 });

    updateDates(prevMonth);
  };

  React.useEffect(() => {
    if (dateText) {
      const formattedInputDate = moment(dateText, DISPLAY_DATE_FORMAT);
      const isValid = moment(formattedInputDate).isValid();

      if (isValid && !moment(formattedInputDate).isSame(moment(currentYear))) {
        setCurrentYear(moment(formattedInputDate).format(YEAR_FORMAT));
      }
      if (isValid && !moment(formattedInputDate).isSame(moment(currentMonth))) {
        setCurrentMonth(moment(formattedInputDate).format(MONTH_FORMAT));
        setCurrentMonthName(moment(formattedInputDate).format(MONTH_NAME_FORMAT));
      }
    }
  }, [dateText]);

  const days = buildDays(currentMonth, currentYear, dateText, selectHandler);

  return (
    <div className="date-picker-dropdown">
      <div className="date-picker-dropdown-header">
        <button type="button" className="btn-arrow btn-prev-month" onClick={handlePrevMonth}>
          <i className="fas fa-caret-left" />
        </button>
        <p className="date-picker-dropdown-title">
          {currentMonthName} <span className="small">({currentYear})</span>
        </p>
        <button type="button" className="btn-arrow btn-next-month" onClick={handleNextMonth}>
          <i className="fas fa-caret-right" />
        </button>
      </div>
      <ul className="date-picker-dropdown-calendar">{days}</ul>
    </div>
  );
};

export default DatePickerDropdown;
