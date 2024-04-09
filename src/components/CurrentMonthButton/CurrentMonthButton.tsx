import "./CurrentMonthButton.css";
import { useContext } from "react";
import utils from "../../utils/index";
import { CalendarContext } from "../../contexts/CalendarContext";

// Go to current month


function CurrentMonthButton() {
  const calendarContext = useContext(CalendarContext);
  const setCalendarDate = calendarContext.setSelectedDate;
  const dateInfo = utils.getInfoData();

  return (
    <>
      <button className="CurrentMonthButton"
      onClick={() =>
        setCalendarDate({
          date: utils.dateNavigator(
            dateInfo.day,
            dateInfo.month,
            dateInfo.year
          ),
        })
      }>Current</button>
    </>
  );
}

export default CurrentMonthButton;
