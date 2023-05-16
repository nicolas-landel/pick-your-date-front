export const stringDateToDate = (dateStr) => {
  if (dateStr.includes("/")) {
    const myDate = dateStr.split("/");
    if (myDate[0].length === 4) {
      return new Date(myDate[0].substring(0, 4), myDate[1] - 1, myDate[2]);
    }
    return new Date(myDate[2].substring(0, 4), myDate[1] - 1, myDate[0]);
  }
  if (dateStr.includes("-")) {
    const myDate = dateStr.split("-");
    if (myDate[0].length === 4) {
      return new Date(myDate[0], myDate[1] - 1, myDate[2].substring(0, 4));
    }
    return new Date(myDate[2].substring(0, 4), myDate[1] - 1, myDate[0]);
  }
  return new Date(dateStr);
};

export const stringDateToTimestamp = (dateStr) => {
  return stringDateToDate(dateStr).getTime();
};

export const addDaysToDate = (date, days) => {
  if (typeof date === "string") date = new Date(date);
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
