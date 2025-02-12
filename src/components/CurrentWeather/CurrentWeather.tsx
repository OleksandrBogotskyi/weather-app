import React from "react";
import { WeatherData } from "../../types/weather";
import s from "./CurrentWeather.module.scss";
import CurrentDate from "./CurrentDate/CurrentDate";
import { getWeatherIconUrl } from "../../utils/getWeatherIcon";
import CurrentPeriodWeather from "../CurrentPeriodWeather/CurrentPeriodWeather";
import { getDailyPeriods } from "../../utils/getDailyPeriods";
import '../../assets/styles/global.scss';

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const params = ["Temp, °C", "Feels like", "Pressure, hPa", "Humidity, %", "Wind, km/h"];

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const currentWeather = weatherData.list[0];
  const iconUrl = getWeatherIconUrl(currentWeather.weather[0].icon);
  const temperature = Math.round(currentWeather.main.temp);
  const dailyPeriods = getDailyPeriods(weatherData);

  return (
    <div className="container">
      <div className={s.container}>
        <div className={s.current}>
          <CurrentDate />
          <img src={iconUrl} alt={currentWeather.weather[0].description} className={s.current__icon} />
          <p className={s.current__temperature}>
            {temperature > 0 ? `+${temperature}` : temperature}°C
          </p>
        </div>
        <ul className={s.params}>
          {params.map((item) => (
            <li className={s.params__item} key={item}>{item}</li>
          ))}
        </ul>
        <div className={s.dayPeriods}>
          {dailyPeriods.map((p) => (
            <CurrentPeriodWeather key={p.name} period={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
