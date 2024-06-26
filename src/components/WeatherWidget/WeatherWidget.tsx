import "./WeatherWidget.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CalendarContext } from "../../contexts/CalendarContext";
import utils from "../../utils/index";

interface WeatherResponse {
  list: WeatherData[];
}

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
  dt_txt: string;
}

interface ReminderState {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  city: string;
  color: string;
}

interface DateInfoResult {
  day: number;
  dayFull: string;
  month: number;
  monthFull: string;
  year: number;
  currentTime: number;
  weekDays: string[];
  weekDaysFull: string[];
  firstMonthDay: number;
  firstMonthDayFull: string;
  qtyDaysThisMonth: number;
  qtyDaysPastMonth: number;
  qtyDaysNextMonth: number;
}

const API_KEY = "2cddc023dd09005c1b277ed47e80342e";

function formatDate(dateInfo: DateInfoResult) {
  const dayString = String(dateInfo.day).padStart(2, "0");
  const monthString = String(dateInfo.month).padStart(2, "0");
  const yearString = String(dateInfo.year);

  const currentDate = `${yearString}-${monthString}-${dayString}`;

  return currentDate;
}

const WeatherWidget = (props: { reminder: ReminderState }) => {
  const calendarContext = useContext(CalendarContext);
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const dateInfo = utils.getInfoData(calendarContext.selectedDate.date);

  const reminder = props.reminder;
  const currentDate = formatDate(dateInfo);

  const intervalOfDays = [currentDate];

  //console.log("WeatherWidget is being rendered");

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${reminder.city}&appid=${API_KEY}&units=metric`
        );
        const data = (await response.json()) as WeatherResponse;

        if (reminder.date == currentDate) {
          const currentDateData = data.list.filter((item) =>
            item.dt_txt.includes(currentDate)
          );

          //Array in the case the forecast doesn't include the date
          const correctionArr = [data.list[0]];

          currentDateData.length === 0
            ? setWeather(correctionArr)
            : setWeather(currentDateData);
        } else {
          const nextDaysData = data.list.filter((item) =>
            item.dt_txt.includes(reminder.date + " 12:00:00")
          );
          setWeather(nextDaysData);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (currentDate <= reminder.date && intervalOfDays.length <= 6) {
      getWeather();
    }
  }, [calendarContext.selectedDate]);

  if (currentDate <= reminder.date) {
    if (intervalOfDays.length <= 6) {
      return (
        <>
          <div className="ReminderWeatherWidget">
            <div>
              <p>
                {weather[0]?.weather[0]?.main}
                <img
                  src={`./assets/${weather[0]?.weather[0]?.icon}@2x.png`}
                  width="50"
                  height="50"
                ></img>
              </p>
              <p>{weather[0]?.main.temp}ºC</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="ReminderWeatherWidget">No weather information</div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="ReminderWeatherWidget">No weather information</div>
      </>
    );
  }
};

export default WeatherWidget;
