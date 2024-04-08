export function dateNavigator(day: number, month: number, year: number) {
    console.log(
        day,
        month,
        year
    );
    
    let dayString = String(day).padStart(2, "0");

    let monthString = String(month).padStart(2, "0");

    let yearString = String(year);

    let newDate = new Date(`${yearString}-${monthString}-${dayString}T15:00:00Z`);

    //console.log(newDate);

    return newDate
}

