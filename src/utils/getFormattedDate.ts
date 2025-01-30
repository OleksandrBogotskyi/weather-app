import dayjs from "dayjs";

export const getFormattedDate = () => dayjs().format("DD MMMM YYYY, HH:mm:ss");
