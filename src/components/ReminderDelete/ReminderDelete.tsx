import { RemindersContext } from "../../contexts/RemindersContext";
import { useContext } from "react";
import swaal from "sweetalert2";
import "./ReminderDelete.css";

interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

function ReminderDelete(props: { reminder: ReminderState }) {
  let remindersContext = useContext(RemindersContext);

  async function deleteConfirmation() {
    await swaal
      .fire({
        title: "Are you sure?",
        text: "Do you really want to delete this reminder?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteReminder();

          await swaal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
  }

  async function deleteReminder() {
    const requestOptions: RequestInit = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://calendar-challenge-api.onrender.com/reminder/${props.reminder.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        let requestOptions2: RequestInit = {
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
        onClick={() => deleteConfirmation()}
        className="ReminderDeleteButton"
      >
        Delete
      </button>
    </>
  );
}

export default ReminderDelete;
