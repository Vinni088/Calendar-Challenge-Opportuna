import "./SelectedDayDisplay.css";
import { useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import * as utils from "../../utils/dateInfo";

function SelectedDayDisplay() {
  let calendarContext = useContext(CalendarContext);
  let date = utils.getInfoData(calendarContext.selectedDate.date);

  return (
    <>
      <button className="CurrentSelectedDay">
        {date.day} de {date.monthFull} de {date.year}
      </button>
    </>
  );
}

export default SelectedDayDisplay;
