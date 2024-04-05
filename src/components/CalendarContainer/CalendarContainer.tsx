import "./CalendarContainer.css";
import { useContext } from "react";
import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";
import * as utils from "../../utils/dateInfo";

function Calendar() {
  let remindersContext = useContext(RemindersContext);
  let calendarContext = useContext(CalendarContext);

  let reminders = remindersContext.reminders;
  let date = utils.getInfoData(calendarContext.selectedDate.date);

  const daysOfPrevMonth = Array.from(
    { length: date.firstMonthDay },
    (_, i) => date.qtyDaysPastMonth - i
  ).reverse();

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const daysOfNextMonth = Array.from(
    { length: 33 - date.qtyDaysThisMonth + date.firstMonthDay },
    (_, i) => i + 1
  );

  console.log(reminders);
  console.log(date);

  return (
    <>
      <div className="CalendarApp">
        {date.weekDays.map((weekDayObject, weekdayindex) => {
          return (
            <div className="WeekDays" key={weekdayindex}>
              {weekDayObject}
            </div>
          );
        })}

        {daysOfPrevMonth.map((prevMonthDay) => {
          return (
            <button className="PrevMonth" key={prevMonthDay}>
              {prevMonthDay}
            </button>
          );
        })}

        {daysInMonth.map((currentDayDate) => {
          return (
            <button className={"MonthlyDay"} key={currentDayDate}>
              {currentDayDate}
            </button>
          );
        })}

        {daysOfNextMonth.map((nextMonthDay) => {
          return (
            <button className="NextMonth" key={nextMonthDay}>
              {nextMonthDay}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;
