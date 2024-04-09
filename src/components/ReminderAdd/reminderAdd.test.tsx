import {render,  screen, fireEvent, cleanup, act} from "@testing-library/react";
import RemindersProvider, { ReminderState } from "../../contexts/RemindersContext";
import CalendarProvider from "../../contexts/CalendarContext";
import { describe, expect, vi } from "vitest";
import ReminderAdd from "./ReminderAdd";

global.fetch = vi.fn();

window.scrollTo = vi.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Reminder add test", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const RenderReminderAdd = () => {
    render(
      <CalendarProvider>
        <RemindersProvider>
          <ReminderAdd />
        </RemindersProvider>
      </CalendarProvider>
    );
  };

  const mockReminders: ReminderState[] = [
    {
      id: 1,
      date: "2024-04-04",
      time: "09:00",
      title: "Exercício",
      description: "Fazer exercícios físicos",
      city: "São Paulo",
      color: "blue",
    },
    {
      id: 2,
      date: "2024-04-05",
      time: "15:30",
      title: "Reunião",
      description: "Reunião de equipe",
      city: "Rio de Janeiro",
      color: "green",
    },
    {
      id: 3,
      date: "2024-04-06",
      time: "18:00",
      title: "Compras",
      description: "Comprar mantimentos",
      city: "Belo Horizonte",
      color: "orange",
    },
    {
      id: 4,
      date: "2024-04-07",
      time: "10:00",
      title: "Dentista",
      description: "Consulta com o dentista",
      city: "Porto Alegre",
      color: "red",
    },
    {
      id: 5,
      date: "2024-04-08",
      time: "14:00",
      title: "Aniversário",
      description: "Festa de aniversário",
      city: "Curitiba",
      color: "pink",
    },
    {
      id: 6,
      date: "2024-04-09",
      time: "21:00",
      title: "Malhar",
      description: "Treinar costas e biceps",
      city: "Brasília",
      color: "blue",
    },
  ];

  const mockData: ReminderState = {
    id: 167,
    title: "Malhar",
    description: "Treinar costas e bíceps",
    city: "brasília",
    color: "yellow",
    date: "2024-04-09",
    time: "21:00",
  };

  it("should display the add reminder button", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(mockReminders));

    RenderReminderAdd();

    expect(screen.getByText(/add a reminder/i)).toBeInTheDocument();
  });

  it("should display the form", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(mockReminders));

    RenderReminderAdd();

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(screen.getByPlaceholderText(/Reminder Title/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Reminder Description/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/City/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  it("should close the form", async () => {
    fetch.mockResolvedValueOnce(createFetchResponse(mockReminders));

    RenderReminderAdd();

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    const titleInput = screen.getByPlaceholderText(/Reminder Title/i);
    const descriptionInput =
      screen.getByPlaceholderText(/Reminder Description/i);
    const cityInput = screen.getByPlaceholderText(/City/i);
    const timeInput = screen.getAllByAltText(/TimeInput/i);
    const colorInput = screen.getAllByAltText(/yellow/i);

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Malhar" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Treinar costas e bíceps" },
      });
      fireEvent.change(cityInput, { target: { value: "brasília" } });
      fireEvent.change(timeInput[0], { target: { value: "21:00" } });
      fireEvent.click(colorInput[0]);
    });

    fetch.mockResolvedValueOnce(createFetchResponse(mockData));

    const confirmButton = screen.getByText(/confirm/i);

    await act(async () => {
      fireEvent.click(confirmButton);
    });

    const confirmSwaal = screen.getByText(/OK/i);

    await act(async () => {
      fireEvent.click(confirmSwaal);
    });

    expect(screen.queryByText(/confirm/i)).toBeNull();
    expect(screen.queryByText(/cancel/i)).toBeNull();
  });
});
