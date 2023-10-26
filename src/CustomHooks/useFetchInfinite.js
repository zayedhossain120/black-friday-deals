import apiUrl from "../Utils/variables/apiUrl";
import getToken from "../Utils/getToken";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchInfinite = (query, fieldName, queryKeys = {}) => {
  const accessToken = getToken();

  const fetchData = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${apiUrl}/${query}&page=${pageParam}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  };

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: [fieldName, queryKeys],
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) => {
      if (
        pages.length * lastPage?.meta?.limit >=
        lastPage?.meta?.totalDocuments
      ) {
        return;
      } else {
        return pages.length + 1;
      }
    },
  });

  return {
    data: data?.pages,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  };
};

export default useFetchInfinite;
