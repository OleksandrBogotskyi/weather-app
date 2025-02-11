import React, { useState, useEffect } from "react";
import s from "./CurrentDate.module.scss";
import { getFormattedDate } from "../../../utils/getFormattedDate";
import { useTheme } from "../../../context/ThemeContext";

const CurrentDate: React.FC = () => {
  const [date, setDate] = useState<string>(getFormattedDate);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getFormattedDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className={`${s.date} ${s[theme]}`}>{date}</span>;
};

export default CurrentDate;
