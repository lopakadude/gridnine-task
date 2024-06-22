export const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  if (hours === 0) {
    return `${minutes}м`;
  }
  if (minutes === 0) {
    return `${hours}ч `;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};
