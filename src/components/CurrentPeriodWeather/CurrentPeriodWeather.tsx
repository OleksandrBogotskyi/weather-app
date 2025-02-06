import React from "react";
import PeriodList from "./PeriodList/PeriodList";
import s from "./CurrentPeriodWeather.module.scss";

interface WeatherMain {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
}

interface WeatherDescription {
  icon: string;
  description: string;
}

interface Wind {
  speed: number;
}

interface PeriodListItem {
  dt: number;
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: Wind;
}

interface Period {
  name: string;
  lists: PeriodListItem[];
}

interface CurrentPeriodWeatherProps {
  period: Period;
}

const CurrentPeriodWeather: React.FC<CurrentPeriodWeatherProps> = ({
  period,
}) => {
  const { name, lists } = period;

  return (
    <div className={s.dayPeriod}>
      <span className={s.dayPeriod__header}>{name}</span>
      <div className={s.dayPeriod__columns}>
        {lists.length === 2 ? (
          lists.map((item) => <PeriodList key={item.dt} list={item} />)
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default CurrentPeriodWeather;
