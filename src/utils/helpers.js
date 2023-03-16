export const truncate = (text, stop, endChar) => {
  if (!text) {
    return "";
  }
  return text.slice(0, stop) + (stop < text.length ? endChar || "..." : "");
};
