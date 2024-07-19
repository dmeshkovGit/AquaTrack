export const isNumber = (event, setErr) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode < 48 || charCode > 57) &&
    charCode !== 8 &&
    charCode !== 13 &&
    (charCode < 37 || charCode > 40)
  ) {
    setErr(true);
    event.preventDefault();
  } else {
    setErr(false);
  }
};

export const timeInputController = (event, setTimeErr) => {
  const value = event.target.value;
  if (
    !/^[0-2]$|^[0-2][0-3]$|^[0-2][0-3]:$|^[0-2][0-3]:[0-5]$|^[0-2][0-3]:[0-5]\d$/.test(
      value,
    )
  ) {
    setTimeErr(true);
    event.preventDefault();
  } else {
    setTimeErr(false);
  }
};

export const getFormattedTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const parseTimeToUnix = time => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.getTime();
};
export const unixParser = time => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
