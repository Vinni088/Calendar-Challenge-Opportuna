export function dateNavigator(day: number, month: number, year: number) {
    let dayString = String(day).padStart(2, "0");

    let monthString = String(month).padStart(2, "0");

    let yearString = String(year);

    let newDate = new Date(`${yearString}-${monthString}-${dayString}`);

    return newDate
}

