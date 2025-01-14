export const formatDate = (
  dateString,
  monthFormat,
  includeTime,
) => {
  const dateOptions = {
    month: monthFormat,
    year: 'numeric',
    day: '2-digit',
    hour: includeTime ? '2-digit' : undefined,
    minute: includeTime ? '2-digit' : undefined,
    hour12: false,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('ru-RU', dateOptions);
  const formattedTime = includeTime
    ? date.toLocaleTimeString('ru-RU', dateOptions)
    : '';

  return includeTime ? formattedTime : formattedDate;
};
