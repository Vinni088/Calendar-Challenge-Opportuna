import "./SelectedDayDisplay.css";
import { useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import * as utils from "../../utils/dateInfo";

function SelectedDayDisplay() {
  let calendarContext = useContext(CalendarContext);
  let dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  return (
    <>
      <button className="CurrentSelectedDay">
        {dateInfo.dayFull}, {dateInfo.monthFull} {dateInfo.day}
      </button>
    </>
  );
}

export default SelectedDayDisplay;
