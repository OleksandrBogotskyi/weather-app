import React from "react";
import dayjs from "dayjs";
import "../../assets/styles/global.scss";
import s from "./FutureDayCard.module.scss";

interface FutureDayCardProps {
  date: string;
  icon: string;
  maxTemp: number;
  minTemp: number;
}

const FutureDayCard: React.FC<FutureDayCardProps> = ({
  date,
  icon,
  maxTemp,
  minTemp,
}) => {

  return (
    <div className="container">
      <div className={s.day}>
        <div className={s.day__date}>
          <span className={s.day__name}>{dayjs(date).format("ddd")}</span>
          <span className={s.day__number}>{dayjs(date).format("DD MMMM")}</span>
        </div>
        <div className={s.weather}>
          <img className={s.weather__icon} src={icon} alt="weather icon" />
          <div className={s.weather__temperature}>
            <span className={s.weather__max}>{Math.round(maxTemp)}°</span>
            <span className={s.weather__min}>{Math.round(minTemp)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureDayCard;
