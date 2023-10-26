import Cookies from "js-cookie";
import apiUrl from "./variables/apiUrl";

export const getAccessTokenFromRefreshToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const response = await fetch(`${apiUrl}/user/refresh`, {
      method: "POST",
      headers: {
        cookies: `${refreshToken}`,
      },
    });

    if (response.ok) {
      const { data } = await response.json();
      localStorage.setItem("accessToken", data?.accessToken);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
