import "./CalendarContainer.css";
import { useContext } from "react";
import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";
import utils from "../../utils/index";

function Calendar() {
  let remindersContext = useContext(RemindersContext);
  let calendarContext = useContext(CalendarContext);

  let setCalendarDate = calendarContext.setSelectedDate;

  let reminders = remindersContext.reminders;
  let dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  const daysOfPrevMonth = Array.from(
    { length: dateInfo.firstMonthDay },
    (_, i) => dateInfo.qtyDaysPastMonth - i
  ).reverse();

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const daysOfNextMonth = Array.from(
    { length: 33 - dateInfo.qtyDaysThisMonth + dateInfo.firstMonthDay },
    (_, i) => i + 1
  );

  return (
    <>
      <div className="CalendarApp">
        {dateInfo.weekDays.map((weekDayObject, weekdayindex) => {
          return (
            <div className="WeekDays" key={weekdayindex}>
              {weekDayObject}
            </div>
          );
        })}

        {daysOfPrevMonth.map((prevMonthDay) => {
          const hasReminder = utils.filterRemindersByDay(
            reminders,
            prevMonthDay,
            dateInfo,
            -1
          );

          let thisDate = {
            date: utils.dateNavigator(
              prevMonthDay+1,
              dateInfo.month - 1,
              dateInfo.year
            ),
          };

          return (
            <button
              className="PrevMonth"
              key={prevMonthDay}
              onClick={() => setCalendarDate(thisDate)}
            >
              {prevMonthDay}

              <p>{hasReminder.length > 0 ? hasReminder[0].title : undefined}</p>
            </button>
          );
        })}

        {daysInMonth.map((currentDayDate) => {
          const hasReminder = utils.filterRemindersByDay(
            reminders,
            currentDayDate,
            dateInfo,
            0
          );

          let thisDate = {
            date: utils.dateNavigator(
              currentDayDate+1,
              dateInfo.month,
              dateInfo.year
            ),
          };

          return (
            <button
              className={"MonthlyDay"}
              key={currentDayDate}
              onClick={() => setCalendarDate(thisDate)}
            >
              {currentDayDate}

              <p>{hasReminder.length > 0 ? hasReminder[0].title : undefined}</p>
            </button>
          );
        })}

        {daysOfNextMonth.map((nextMonthDay) => {
          const hasReminder = utils.filterRemindersByDay(
            reminders,
            nextMonthDay,
            dateInfo,
            +1
          );

          let thisDate = {
            date: utils.dateNavigator(
              nextMonthDay+1,
              dateInfo.month + 1,
              dateInfo.year
            ),
          };

          return (
            <button
              className="NextMonth"
              key={nextMonthDay}
              onClick={() => setCalendarDate(thisDate)}
            >
              {nextMonthDay}

              <p>{hasReminder.length > 0 ? hasReminder[0].title : undefined}</p>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;
