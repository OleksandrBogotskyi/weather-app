import { WeatherData } from "../types/weather";

export const convertToLocalTime = (dt: number, timezoneOffset: number): number => {
    return new Date((dt + timezoneOffset) * 1000).getUTCHours();
  };
  
  export const getDailyPeriods = (weatherData: WeatherData) => {
    const timezoneOffset = weatherData.city.timezone;
  
    const periods = [
      { name: "Night", hours: [0, 1, 2, 3, 4, 5] },
      { name: "Morning", hours: [6, 7, 8, 9, 10, 11] },
      { name: "Day", hours: [12, 13, 14, 15, 16, 17] },
      { name: "Evening", hours: [18, 19, 20, 21, 22, 23] },
    ];
  
    return periods.map((period) => ({
      name: period.name,
      lists: weatherData.list.filter((w) => period.hours.includes(convertToLocalTime(w.dt, timezoneOffset))),
    }));
  };
  