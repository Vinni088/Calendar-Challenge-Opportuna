import "./RemindersContainer.css";
import ReminderDelete from "../ReminderDelete/ReminderDelete";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import ReminderEdit from "../ReminderEdit/ReminderEdit";
import { useContext } from "react";
import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";
import utils from "../../utils/index";

interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

function Reminders() {
  let remindersContext = useContext(RemindersContext);
  let calendarContext = useContext(CalendarContext);

  const reminders = remindersContext.reminders;
  const dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  let todayReminders: ReminderState[] = utils.filterRemindersByDay(
    reminders,
    dateInfo.day,
    dateInfo,
    0
  );

  return (
    <>
      <ul>
        {todayReminders.map((reminder, index) => {
          return (
            <li className="Reminder" key={index}>
              <div className="ReminderTime" style={{ backgroundColor: "" }}>
                {reminder.time}
              </div>
              <div
                className="ReminderTitle"
                style={{
                  backgroundColor: reminder.color,
                  color: "white",
                }}
              >
                {reminder.title}
              </div>
              <div
                className="ReminderDescription"
                style={{
                  backgroundColor: "whitesmoke",
                  color: "black",
                }}
              >
                {reminder.description}
              </div>
              <ReminderEdit />
              <WeatherWidget reminder={reminder} />
              <ReminderDelete />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Reminders;
