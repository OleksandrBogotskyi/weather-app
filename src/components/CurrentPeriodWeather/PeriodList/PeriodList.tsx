import React from 'react';
import s from './PeriodList.module.scss';
import { getWeatherIconUrl } from '../../../utils/getWeatherIcon';

interface PeriodListProps {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    weather: { icon: string; description: string }[];
    wind: { speed: number };
  };
}

const PeriodList: React.FC<PeriodListProps> = ({ list }) => {
  const {
    dt,
    main: { temp, feels_like, pressure, humidity },
    weather,
    wind: { speed },
  } = list;

  const smallIconUrl = getWeatherIconUrl(weather[0].icon, false);
  const time = new Date(dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ul className={s.list}>
      <li className={s.list__item}>{time}</li>
      <li className={s.list__item}>
        <img src={smallIconUrl} alt={weather[0].description} />
      </li>
      <li className={s.list__item}>{Math.round(temp)}°</li>
      <li className={s.list__item}>{Math.round(feels_like)}°</li>
      <li className={s.list__item}>{pressure} hPa</li>
      <li className={s.list__item}>{humidity}%</li>
      <li className={s.list__item}>{Math.round(speed)} km/h</li>
    </ul>
  );
};

export default PeriodList;
