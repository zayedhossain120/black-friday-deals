import { useEffect, useState } from "react";
import apiUrl from "../Utils/variables/apiUrl";
import getToken from "../Utils/getToken";

const useFetch = (type) => {
  const [searchKey, setSearchKey] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const accessToken = getToken();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/${type}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setError(false);
        setData(data);
      })
      .catch((e) => {
        setIsLoading(false);
        setData([]);
        setError(e);
      });
  }, [type, accessToken]);

  return {
    data,
    setData,
    isLoading,
    error,
    searchKey,
    setSearchKey,
  };
};

export default useFetch;
