export const secondsToHourMinuteSecondString = durationSeconds => {
  const seconds = durationSeconds % 60;
  const durationMinutes = (durationSeconds - seconds) / 60;
  const minutes = durationMinutes % 60;
  const hours = (durationMinutes - minutes) / 60;
  return `${hours}:${minutes}:${seconds}`;
};
