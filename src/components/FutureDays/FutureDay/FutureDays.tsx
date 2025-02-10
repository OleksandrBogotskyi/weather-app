import React, { useEffect, useState } from 'react';
import FutureDayCard from '../../FutureDayCard/FutureDayCard';
import { FutureDayItem, WeatherData, WeatherListItem } from '../../../types/weather';
import dayjs from "dayjs";
import { getWeatherIconUrl } from '../../../utils/getWeatherIcon';
import { Nullable } from '../../../types/narrowTypes';

interface FutureDaysProps {
  weatherData: Nullable<WeatherData>;
  theme: "light" | "dark";
}

const FutureDays: React.FC<FutureDaysProps> = ({ weatherData, theme }) => {
  const [days, setDays] = useState<FutureDayItem[]>([]);

  useEffect(() => {
    if (!weatherData?.list) return;

    const dailyData: Record<string, WeatherListItem[]> = {};

    weatherData.list.forEach((item) => {
      const date = dayjs.unix(item.dt).format("YYYY-MM-DD");
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    const nextDays = Object.entries(dailyData)
      .slice(1, 6)
      .map(([date, items]) => {
        const maxTemp = Math.max(...items.map((item) => item.main.temp_max));
        const minTemp = Math.min(...items.map((item) => item.main.temp_min));
        const icon = getWeatherIconUrl(items[Math.floor(items.length / 2)].weather[0].icon);
        return { date, icon, maxTemp, minTemp };
      });

    setDays(nextDays);
  }, [weatherData]);

  return (
    <>
      {days.map((day) => (
        <FutureDayCard
          key={day.date}
          date={day.date}
          icon={day.icon}
          maxTemp={day.maxTemp}
          minTemp={day.minTemp}
          theme={theme}
        />
      ))}
    </>
  );
};

export default FutureDays;
