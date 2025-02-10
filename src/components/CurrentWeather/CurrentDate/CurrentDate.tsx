import React, { useState, useEffect } from "react";
import s from "./CurrentDate.module.scss";
import { getFormattedDate } from "../../../utils/getFormattedDate";

interface CurrentDateProps {
  theme: "light" | "dark";
}

const CurrentDate: React.FC<CurrentDateProps> = ({ theme }) => {
  const [date, setDate] = useState<string>(getFormattedDate);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getFormattedDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className={`${s.date} ${s[theme]}`}>{date}</span>;
};

export default CurrentDate;
