import React from "react";
import PeriodList from "./PeriodList/PeriodList";
import s from "./CurrentPeriodWeather.module.scss";
import { CurrentPeriodWeatherProps } from "../../types/weather";

interface Props extends CurrentPeriodWeatherProps {
  theme: "light" | "dark";
}

const CurrentPeriodWeather: React.FC<Props> = ({ period, theme }) => {
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
