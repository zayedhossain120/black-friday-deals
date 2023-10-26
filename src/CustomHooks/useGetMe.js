import axios from "axios";
import apiUrl from "../Utils/variables/apiUrl";
import { useEffect, useState } from "react";
import getToken from "../Utils/getToken";

const useGetMe = () => {
  const [data, setData] = useState(null);
  const accessToken = getToken();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${apiUrl}/administrators/me`, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      setData(data?.data);
    };
    fetchData();
  }, [accessToken]);
  return { data };
};

export default useGetMe;
