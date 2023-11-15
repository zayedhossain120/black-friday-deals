import axios from "axios";
import apiUrl from "./variables/apiUrl";
import getToken from "./getToken";

export const updateData = (url, payload) => {
  axios
    .patch(
      `${apiUrl}/${url}`,
      {
        ...payload,
      },
      {
        headers: {
          authorization: `bearer ${getToken()}`,
        },
      }
    )
    .then(({ data }) => console.log(data))
    .catch((error) => console.log(error));
};
