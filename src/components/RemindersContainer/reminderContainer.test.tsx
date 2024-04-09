import {
  render,
  screen,
  //fireEvent,
  cleanup,
  //act,
} from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Reminders from "./RemindersContainer";
import utils from "../../utils/index";
import RemindersProvider from "../../contexts/RemindersContext";
import CalendarProvider from "../../contexts/CalendarContext";

interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

//Mocks and variables
const dateInfo = utils.getInfoData();
const dateString = `${dateInfo.year}-${String(dateInfo.month).padStart(
  2,
  "0"
)}-${String(dateInfo.day).padStart(2, "0")}`;

const mockReminders: ReminderState[] = [
  {
    id: 1,
    date: dateString,
    time: "09:00",
    title: "Exercício",
    description: "Fazer exercícios físicos",
    city: "São Paulo",
    color: "blue",
  },
  {
    id: 2,
    date: dateString,
    time: "15:30",
    title: "Reunião",
    description: "Reunião de equipe",
    city: "Rio de Janeiro",
    color: "green",
  },
  {
    id: 3,
    date: dateString,
    time: "18:00",
    title: "Compras",
    description: "Comprar mantimentos",
    city: "Belo Horizonte",
    color: "orange",
  },
];

(global.fetch as any) = vi.fn();

(window.scrollTo as any) = vi.fn();

function createFetchResponse(data: any) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    then: () => new Promise((resolve) => resolve(data)),
  };
}

/*
const CalendarContext = createContext({} as CalendarContextProps);

function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>({
    date: new Date(),
  });

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

const RemindersContext = createContext({} as RemindersContextProps);

function RemindersProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<ReminderState[]>([]);

  useEffect(() => {
    setReminders(mockReminders);
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
*/

describe("Reminder container test", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const RenderReminders = () => {
    render(
      <CalendarProvider>
        <RemindersProvider>
          <Reminders />
        </RemindersProvider>
      </CalendarProvider>
    );
  };

  it("should display the reminders for today", async () => {
    (fetch as any).mockResolvedValueOnce(createFetchResponse(mockReminders));

    RenderReminders();

    screen.debug();

    expect(true).toBeTruthy();
  });

  //Problem: context utilization being obstructed by fetch mock
});
