import React, { useEffect, useState } from 'react';
import FutureDayCard from '../../FutureDayCard/FutureDayCard';
import { WeatherData, WeatherListItem } from '../../../types/weather';
import dayjs from "dayjs";
import { getWeatherIconUrl } from '../../../utils/getWeatherIcon';

interface FutureDaysProps {
  weatherData: WeatherData | null;
}

const FutureDays: React.FC<FutureDaysProps> = ({ weatherData }) => {
  const [days, setDays] = useState<
    { date: string; icon: string; maxTemp: number; minTemp: number }[]
  >([]);

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
        />
      ))}
    </>
  );
};

export default FutureDays;
