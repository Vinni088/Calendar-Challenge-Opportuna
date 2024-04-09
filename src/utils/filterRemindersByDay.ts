import { ReminderState } from "../contexts/RemindersContext";

interface DateInfoResult {
    day: number,
    dayFull: string,
    month: number,
    monthFull: string,
    year: number,
    currentTime: number,
    weekDays: string[],
    weekDaysFull: string[],
    firstMonthDay: number,
    firstMonthDayFull: string,
    qtyDaysThisMonth: number,
    qtyDaysPastMonth: number,
    qtyDaysNextMonth: number,
}

export function filterRemindersByDay(reminderState: ReminderState[], dayNumber: number, dateInfo: DateInfoResult, monthReference: number) {

    const hasReminder = reminderState.filter(
        (item) =>
            item.date ===
            `${dateInfo.year}-${String(dateInfo.month + monthReference).padStart(
                2,
                "0"
            )}-${String(dayNumber).padStart(2, "0")}`
    );

    return hasReminder
}

