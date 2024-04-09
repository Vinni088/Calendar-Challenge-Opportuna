import { RemindersContext } from "../../contexts/RemindersContext";
import React, { useState, useContext } from "react";
import swaal from "sweetalert2";
import "./ReminderEdit.css";

interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

function ReminderEdit(props: { reminder: ReminderState }) {
  const remindersContext = useContext(RemindersContext);

  const [reminderEditPopUp, setReminderEditPopUp] = useState(false);
  const [description, setDescription] = useState(props.reminder.description);
  const [colorValue, setColorValue] = useState(props.reminder.color);
  const [title, setTitle] = useState(props.reminder.title);
  const [city, setCity] = useState(props.reminder.city);
  const [time, setTime] = useState(props.reminder.time);
  const [date, setDate] = useState(props.reminder.date);

  const reminderObject = {
    title,
    description,
    city,
    time,
    date,
    color: colorValue,
  };

  async function handleSubmit(e: React.MouseEvent) {
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

    await updateReminder();
    await swaal.fire("Reminder eddited successfully");

    resetEditReminderModal();
  }

  function resetEditReminderModal() {
    setDescription(props.reminder.description);
    setColorValue(props.reminder.color);
    setTitle(props.reminder.title);
    setCity(props.reminder.city);
    setTime(props.reminder.time);
    setDate(props.reminder.date);

    setReminderEditPopUp(!reminderEditPopUp);
  }

  async function updateReminder() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const reqBody = JSON.stringify(reminderObject);

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: reqBody,
      redirect: "follow",
    };

    fetch(
      `https://calendar-challenge-api.onrender.com/reminder/${props.reminder.id}`,
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
      <button
        className="ReminderEditButton"
        onClick={() => resetEditReminderModal()}
      >
        Edit
      </button>
      {reminderEditPopUp && (
        <div className="OutsideContainer">
          <div className="EditReminderPopUp">
            <form>
              <input
                id="titleEditInput"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={15}
                required
                placeholder="Reminder Title"
              />
              <textarea
                id="descriptionEditInput"
                name="description"
                maxLength={30}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Reminder Description"
              />
              <input
                id="TimeEditInput"
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <input
                id="dateEditInput"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                id="cityEditInput"
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={15}
                required
                placeholder="City"
              />
              <div id="EditColorPicker">
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
              <button type="button" onClick={() => resetEditReminderModal()}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ReminderEdit;
