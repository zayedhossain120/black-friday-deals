import { useEffect, useState } from "react";
import apiUrl from "../Utils/variables/apiUrl";
import axios from "axios";
import getToken from "../Utils/getToken";

const useGlobalSearch = () => {
  const [searchOnPostOrUser, setSearchOnPostOrUser] = useState("Post");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);

  const accessToken = getToken();

  // handle global search fetch
  useEffect(() => {
    const isCouponSelected = checkedItems.find((item) => item === "coupons");
    const isDealSelected = checkedItems.find((item) => item === "deals");
    const isAdministratorsSelected = checkedItems.find(
      (item) => item === "administrators"
    );
    const isMembersSelected = checkedItems.find((item) => item === "members");

    // fetch post data based on coupon and deals======
    if (searchKey && searchOnPostOrUser === "Post") {
      const filter =
        isCouponSelected && isDealSelected
          ? ""
          : (isCouponSelected || isDealSelected)?.slice(0, -1);
      axios
        .get(
          `${apiUrl}/post/search/all?limit=100&searchTerm=${searchKey}${
            filter ? `&postType=${filter}` : ""
          }`,
          {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((data) => {
          setData(data?.data);
          setError(null);
        })
        .catch((e) => setError(e));
    } else if (searchKey && searchOnPostOrUser === "User") {
      // get user's data===================
      Promise.all([
        isMembersSelected &&
          fetch(`${apiUrl}/user?searchTerm=${searchKey}&limit=100`, {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          }),
        isAdministratorsSelected &&
          fetch(`${apiUrl}/administrators?searchTerm=${searchKey}&limit=100`, {
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          }),
      ])
        .then(([resUsers, resAdministrators]) =>
          Promise.all([resUsers?.json(), resAdministrators?.json()])
        )
        .then(([usersData, administratorsData]) => {
          setData({ usersData, administratorsData });
        });
    } else {
      setData([]);
    }
  }, [searchKey, checkedItems, searchOnPostOrUser, accessToken]);
  return {
    data,
    error,
    searchKey,
    setSearchKey,
    checkedItems,
    setCheckedItems,
    searchOnPostOrUser,
    setSearchOnPostOrUser,
  };
};

export default useGlobalSearch;
