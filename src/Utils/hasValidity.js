export const hasValidity = (date = new Date()) => {
  return `expireDate[gte]=${date}`;
};
