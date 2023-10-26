import axios from "axios";
import getToken from "./getToken";
import apiUrl from "./variables/apiUrl";

export const getAdministrator = async (accessToken) => {
  const authorizationAccessToken = accessToken || getToken();
  try {
    const { data } = await axios.get(`${apiUrl}/administrators/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authorizationAccessToken}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
