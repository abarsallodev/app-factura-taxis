export const FormatDate = (current: Date) => {
  const day =
    current.getDate() < 10 ? `0${current.getDate()}` : `${current.getDate()}`;
  const month =
    current.getMonth() + 1 < 10
      ? `0${current.getMonth() + 1}`
      : `${current.getMonth() + 1}`;
  const year = current.getFullYear();

  return `${year.toString()}-${month.toString()}-${day.toString()}`;
};
