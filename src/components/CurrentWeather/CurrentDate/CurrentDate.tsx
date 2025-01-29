import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import s from "./CurrentDate.module.scss";

const CurrentDate: React.FC = () => {
  const [date, setDate] = useState<string>(dayjs().format("DD MMMM YYYY, HH:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs().format("DD MMMM YYYY, HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className={s.date}>{date}</span>;
};

export default CurrentDate;
