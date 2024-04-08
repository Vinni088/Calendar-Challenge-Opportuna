import { RemindersContext } from "../../contexts/RemindersContext";
import { CalendarContext } from "../../contexts/CalendarContext";
import utils from "../../utils/index";
import { useState, useContext } from "react";
import swaal from "sweetalert2";
import "./ReminderAdd.css";

export interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

function ReminderAdd() {
  let calendarContext = useContext(CalendarContext);
  let remindersContext = useContext(RemindersContext);
  let dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  const [reminderAddPopUp, setReminderAddPopUp] = useState(false);
  const [description, setDescription] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");

  let dateString = `${dateInfo.year}-${String(dateInfo.month).padStart(
    2,
    "0"
  )}-${String(dateInfo.day).padStart(2, "0")}`;

  let reminderObject = {
    title,
    description,
    city,
    time,
    date: dateString,
    color: colorValue,
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log(reminderObject);

    const isEveryFieldFilled = Object.values(reminderObject).every(
      (value) => value !== ""
    );

    if (!isEveryFieldFilled) {
      return await swaal.fire({
        icon: "error",
        title: "There are missing field(s). Check you reminder again",
      });
    }

    await sendReminder();
    await swaal.fire("Reminder added successfully");

    clearInputs();

    closeAddReminderModal();
  }

  async function sendReminder() {
    let responseJson: ReminderState;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const reqBody = JSON.stringify(reminderObject);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    fetch(
      "https://calendar-challenge-api.onrender.com/reminder",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        responseJson = result;
        remindersContext.setReminders([
          ...remindersContext.reminders,
          responseJson,
        ]);
      })
      .catch((error) => console.error(error));
  }

  function clearInputs() {
    setTitle("");
    setTime("");
    setCity("");
    setColorValue("");
    setDescription("");
  }

  function closeAddReminderModal() {
    clearInputs()

    setReminderAddPopUp(!reminderAddPopUp)
  }

  return (
    <>
      <button
        className="AddReminderContainer"
        onClick={() => closeAddReminderModal()}
      >
        Add a reminder
      </button>
      {reminderAddPopUp && (
        <div className="OutsideContainer">
          <div className="AddReminderPopUp">
            <form id="ReminderAddForm">
              <input
                id="titleInput"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={15}
                required
                placeholder="Reminder Title"
              />
              <textarea
                id="descriptionInput"
                name="description"
                maxLength={30}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Reminder Description"
              />
              <input
                id="TimeInput"
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <input
                id="cityInput"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={15}
                required
                placeholder="City"
              />
              <div id="ColorPicker">
                {["blue", "red", "green", "yellow", "purple", "orange"].map(
                  (color) => (
                    <label
                      key={color}
                      style={{
                        display: "inline-block",
                        width: "30px",
                        height: "30px",
                        margin: "5px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor: color,
                      }}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={colorValue}
                        onChange={() => setColorValue(color)}
                        required
                        style={{ display: "none" }}
                      />
                    </label>
                  )
                )}
              </div>
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                Confirm
              </button>
              <button type="button" onClick={() => closeAddReminderModal()}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReminderAdd;
