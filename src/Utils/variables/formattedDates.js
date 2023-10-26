export const getUKFormatDate = (date) => {
  return new Date(date)?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const getExpireInAtDays = (expireDate) => {
  return Math.round((new Date(expireDate) - new Date()) / 86400000);
};
