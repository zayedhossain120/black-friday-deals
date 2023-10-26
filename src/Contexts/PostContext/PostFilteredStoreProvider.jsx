/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PostFiterOnStoreContext = createContext();
const PostFilteredStoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState("");
  return (
    <PostFiterOnStoreContext.Provider
      value={{ selectedStore, setSelectedStore }}
    >
      {children}
    </PostFiterOnStoreContext.Provider>
  );
};

export default PostFilteredStoreProvider;
