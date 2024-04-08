import "./MonthSelect.css";
import { useContext } from "react";
import utils from "../../utils/index";
import { CalendarContext } from "../../contexts/CalendarContext";

function MonthSelect() {
  let calendarContext = useContext(CalendarContext);
  let setCalendarDate = calendarContext.setSelectedDate;
  let dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  return (
    <>
      <div className="SubMonthsContainer">
        <button
          onClick={() =>
            setCalendarDate({
              date: utils.dateNavigator(
                1,
                dateInfo.month === 1 ? 12 : dateInfo.month - 1,
                dateInfo.month === 1 ? dateInfo.year - 1 : dateInfo.year
              ),
            })
          }
        >
          Prev
        </button>
      </div>

      <div className="CalendarMonth"> {dateInfo.monthFull} </div>

      <div className="AddMonthsContainer">
        <button
          onClick={() =>
            setCalendarDate({
              date: utils.dateNavigator(
                1,
                dateInfo.month === 12 ? 1 : dateInfo.month + 1,
                dateInfo.month === 12 ? dateInfo.year + 1 : dateInfo.year
              ),
            })
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

export default MonthSelect;
