import { createContext, useState } from "react";
import { useEffect } from "react";

export interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

interface RemindersContextProps {
  reminders: ReminderState[];
  setReminders: (value: ReminderState[]) => void;
}

export const RemindersContext = createContext({} as RemindersContextProps);

export default function RemindersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reminders, setReminders] = useState<ReminderState[]>([]);

  useEffect(() => {
    let requestOptions: RequestInit = {
      method: "GET",
    };

    fetch(
      "https://calendar-challenge-api.onrender.com/reminder",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setReminders(result);
      })
      .catch((error) => console.error(error));
  }, []);

  reminders.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });

  return (
    <RemindersContext.Provider value={{ reminders, setReminders }}>
      {children}
    </RemindersContext.Provider>
  );
}
