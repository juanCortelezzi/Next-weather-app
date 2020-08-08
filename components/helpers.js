export const dateBuilder = (unixTime, timezone) => {
  const d = new Date((unixTime + timezone) * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const card_day = days[d.getUTCDay()];
  const card_date = d.getUTCDate();
  const card_month = months[d.getUTCMonth()];

  return `${card_day} ${card_month} ${card_date}`;
};

export const timeBuilder = (unixTime, timezone = 0) => {
  const d = new Date((unixTime + timezone) * 1000);
  let hours = d.getUTCHours();
  let minutes = d.getUTCMinutes();

  if (hours < 10 && minutes < 10) {
    hours = `0${hours}`;
    minutes = `0${minutes}`;
  } else if (hours < 10) {
    hours = `0${hours}`;
  } else if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
};
