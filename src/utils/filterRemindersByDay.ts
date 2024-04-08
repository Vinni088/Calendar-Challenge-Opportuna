import { ReminderState } from "../contexts/RemindersContext";

export function filterRemindersByDay(reminderState: ReminderState[], dayNumber: number, dateInfo: any) {

    const hasReminder = reminderState.filter(
        (item) =>
            item.date ===
            `${dateInfo.year}-${String(dateInfo.month).padStart(
                2,
                "0"
            )}-${String(dayNumber).padStart(2, "0")}`
    );

    return hasReminder
}

