import React from "react";
import PeriodList from "./PeriodList/PeriodList";
import s from "./CurrentPeriodWeather.module.scss";
import { CurrentPeriodWeatherProps } from "../../types/weather";
import { useTheme } from "../../context/ThemeContext";

const CurrentPeriodWeather: React.FC<CurrentPeriodWeatherProps> = ({ period }) => {
  const { theme } = useTheme(); 
  const { name, lists } = period;

  return (
    <div className={`${s.dayPeriod} ${s[theme]}`}>
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
