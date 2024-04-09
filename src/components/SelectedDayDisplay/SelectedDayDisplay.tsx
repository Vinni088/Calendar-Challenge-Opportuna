import "./SelectedDayDisplay.css";
import { useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import * as utils from "../../utils/dateInfo";

function SelectedDayDisplay() {
  const calendarContext = useContext(CalendarContext);
  const dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  return (
    <>
      <button className="CurrentSelectedDay">
        {dateInfo.dayFull}, {dateInfo.monthFull} {dateInfo.day}
      </button>
    </>
  );
}

export default SelectedDayDisplay;
