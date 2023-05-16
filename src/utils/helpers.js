export const truncate = (text, stop, endChar) => {
  if (!text) {
    return "";
  }
  return text.slice(0, stop) + (stop < text.length ? endChar || "..." : "");
};

export const snakeToCamel = (s) =>
  s.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

export const formatResponse = (data) => {
  // Replace snake_case keys with camelCase
  if (Array.isArray(data)) {
    return data.map((item) => {
      const newItem = {};
      Object.keys(item).forEach((key) => {
        newItem[snakeToCamel(key)] = item[key];
      });
      return newItem;
    });
  }
  const newItem = {};
  Object.keys(data).forEach((key) => {
    newItem[snakeToCamel(key)] = data[key];
  });
  return newItem;
};
