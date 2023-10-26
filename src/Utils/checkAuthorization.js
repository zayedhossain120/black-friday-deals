import { getAdministrator } from "./getAdministrator";

export const checkAuthorization = async (accessToken) => {
  return getAdministrator(accessToken)
    .then((data) => data)
    .catch((err) => err);
};
