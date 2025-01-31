import React from 'react';
import PeriodList from './PeriodList/PeriodList';
import s from './CurrentPeriodWeather.module.scss';

interface Period {
  name: string;
  lists: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    weather: { icon: string; description: string }[];
    wind: { speed: number };
  }[];
}

const CurrentPeriodWeather: React.FC<{ period: Period }> = ({ period }) => {
  const { name, lists } = period;

  return (
    <div className={s.dayPeriod}>
      <span className={s.dayPeriod__header}>{name}</span>
      <div className={s.dayPeriod__columns}>
        {lists.length === 2 ? (
          <>
            <PeriodList key={lists[0].dt} list={lists[0]} />
            <PeriodList key={lists[1].dt} list={lists[1]} />
          </>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </div>
  );
};

export default CurrentPeriodWeather;
