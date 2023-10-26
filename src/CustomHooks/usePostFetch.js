import axios from "axios";
import { useState } from "react";
import apiUrl from "../Utils/variables/apiUrl";

const usePostFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostById = async (postId) => {
    try {
      setIsLoading(true);
      const data = await axios.get(`${apiUrl}/post/${postId}`);
      setIsLoading(false);
      return { data: data.data?.data, isLoading };
    } catch (error) {
      return { error };
    }
  };

  return { fetchPostById };
};

export default usePostFetch;
