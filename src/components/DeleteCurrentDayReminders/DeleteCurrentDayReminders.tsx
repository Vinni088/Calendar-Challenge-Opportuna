import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";
import { useContext } from "react";
import "./DeleteCurrentDayReminders.css";
import utils from "../../utils/index";
import swaal from "sweetalert2";

function ReminderDeleteByDate() {
  const calendarContext = useContext(CalendarContext);
  const remindersContext = useContext(RemindersContext);
  const dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  async function handleButton() {
    await swaal
      .fire({
        title: "Are you sure?",
        text: "Do you really want to delete the reminders of this day?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteReminders();

          await swaal.fire({
            title: "Deleted!",
            text: "Your reminders have been deleted.",
            icon: "success",
          });
        }
      });
  }

  async function deleteReminders() {
    const requestOptions: RequestInit = {
      method: "DELETE",
      redirect: "follow",
    };

    const dateString = `${dateInfo.year}-${String(dateInfo.month).padStart(
      2,
      "0"
    )}-${String(dateInfo.day).padStart(2, "0")}`;

    fetch(
      `https://calendar-challenge-api.onrender.com/reminder/date/${dateString}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const requestOptions2: RequestInit = {
          method: "GET",
        };

        fetch(
          "https://calendar-challenge-api.onrender.com/reminder",
          requestOptions2
        )
          .then((response) => response.json())
          .then((result) => {
            remindersContext.setReminders(result);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <button onClick={() => handleButton()} className="DeleteCDRButton">
        Delete All Reminders
      </button>
    </>
  );
}

export default ReminderDeleteByDate;
