export function dateNavigator(day: number, month: number, year: number) {
    console.log(
        day,
        month,
        year
    );
    
    const dayString = String(day).padStart(2, "0");

    const monthString = String(month).padStart(2, "0");

    const yearString = String(year);

    const newDate = new Date(`${yearString}-${monthString}-${dayString}T15:00:00Z`);

    //console.log(newDate);

    return newDate
}

