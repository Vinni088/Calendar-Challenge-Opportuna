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

          return (
            <button
              className="PrevMonth"
              key={prevMonthDay}
              onClick={() =>
                setCalendarDate({
                  date: utils.dateNavigator(
                    prevMonthDay,
                    dateInfo.month - 1,
                    dateInfo.year
                  ),
                })
              }
            >
              {prevMonthDay}

              <div
                className="DailyRemindersContainer"
              >
                {hasReminder.length > 0
                  ? hasReminder.map((reminder, index) => {
                      return (
                        <p
                          key={index}
                          className="DailyReminders"
                          style={{
                            backgroundColor: reminder.color,
                          }}
                        >
                          {reminder.title}
                        </p>
                      );
                    })
                  : undefined}
              </div>
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

          return (
            <button
              className={"MonthlyDay"}
              key={currentDayDate}
              onClick={() =>
                setCalendarDate({
                  date: utils.dateNavigator(
                    currentDayDate,
                    dateInfo.month,
                    dateInfo.year
                  ),
                })
              }
            >
              {currentDayDate}

              <div
                className="DailyRemindersContainer"
              >
                {hasReminder.length > 0
                  ? hasReminder.map((reminder, index) => {
                      return (
                        <p
                          key={index}
                          className="DailyReminders"
                          style={{
                            backgroundColor: reminder.color,
                          }}
                        >
                          {reminder.title}
                        </p>
                      );
                    })
                  : undefined}
              </div>
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

          return (
            <button
              className="NextMonth"
              key={nextMonthDay}
              onClick={() =>
                setCalendarDate({
                  date: utils.dateNavigator(
                    nextMonthDay,
                    dateInfo.month + 1,
                    dateInfo.year
                  ),
                })
              }
            >
              {nextMonthDay}

              <div
                className="DailyRemindersContainer"
              >
                {hasReminder.length > 0
                  ? hasReminder.map((reminder, index) => {
                      return (
                        <p
                          key={index}
                          className="DailyReminders"
                          style={{
                            backgroundColor: reminder.color,
                          }}
                        >
                          {reminder.title}
                        </p>
                      );
                    })
                  : undefined}
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Calendar;
