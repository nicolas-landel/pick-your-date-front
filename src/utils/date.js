export const stringDateToTimestamp = (date) => {
  if (date.includes("/")) {
    const myDate = date.split("/");
    if (myDate[0].length === 4) {
      return new Date(
        myDate[0].substring(0, 4),
        myDate[1] - 1,
        myDate[2]
      ).getTime();
    }
    return new Date(
      myDate[2].substring(0, 4),
      myDate[1] - 1,
      myDate[0]
    ).getTime();
  }
  if (date.includes("-")) {
    const myDate = date.split("-");
    if (myDate[0].length === 4) {
      return new Date(
        myDate[0],
        myDate[1] - 1,
        myDate[2].substring(0, 4)
      ).getTime();
    }
    return new Date(
      myDate[2].substring(0, 4),
      myDate[1] - 1,
      myDate[0]
    ).getTime();
  }
  return new Date(date).getTime();
};

export const addDaysToDate = (date, days) => {
  if (typeof date === "string") date = new Date(date);
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
