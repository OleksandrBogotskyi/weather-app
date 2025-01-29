import React from "react";
import { WeatherData } from "../../types/weather";
import s from "./CurrentWeather.module.scss";
import CurrentDate from "./CurrentDate/CurrentDate";
import { getWeatherIconUrl } from "../../utils/getWeatherIcon";

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const currentWeather = weatherData.list[0];
  const iconUrl = getWeatherIconUrl(currentWeather.weather[0].icon);
  const temperature = Math.round(currentWeather.main.temp);

  return (
    <div className="container">
      <div className={s.container}>
        <div className={s.current}>
          <CurrentDate />
          <img
            src={iconUrl}
            alt={currentWeather.weather[0].description}
            className={s.current__icon}
          />
          <p className={s.current__temperature}>
            {temperature > 0 ? `+ ${temperature}` : temperature} °C
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
