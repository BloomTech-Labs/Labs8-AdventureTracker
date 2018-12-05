export default function isStartDateEarlier(startDate, endDate) {
  //regex capture example: ['12', '14', '2017'] - first index is month then day then year
  const dateRegex = new RegExp(/\d+/, 'g');

  const start = startDate.match(dateRegex);
  const [startMonth, startDay, startYear] = start;

  const end = endDate.match(dateRegex);
  const [endMonth, endDay, endYear] = end;
  if (startYear > endYear) {
    return false;
  }
  if (startMonth > endMonth) {
    return false;
  }
  if (startDay > endDay) {
    return false;
  }
  return true;
}
