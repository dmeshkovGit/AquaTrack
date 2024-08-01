export const getStartDay = date => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

export const parseTimeToUnix = (time, date) => {
  const [hours, minutes] = time.split(':').map(Number);
  let activeDate;

  if (date) {
    activeDate = new Date(date);
  } else {
    activeDate = new Date();
  }

  activeDate.setHours(hours);
  activeDate.setMinutes(minutes);
  activeDate.setSeconds(0);
  activeDate.setMilliseconds(0);
  return activeDate.getTime();
};
