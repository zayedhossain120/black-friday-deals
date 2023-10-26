/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import PostDeleteModal from "../../Components/PostDeleteModal/PostDeleteModal";
import PostViewCustomModalGlobalUsingContext from "../../Components/PostViewCustomModalGlobalUsingContext/PostViewCustomModalGlobalUsingContext";

export const PostModalsContext = createContext();

const PostModalsProvider = ({ children }) => {
  const [openPostViewModal, setOpenPostViewModal] = useState(false);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  return (
    <PostModalsContext.Provider
      value={{
        openDeletePostModal,
        setOpenDeletePostModal,
        openPostViewModal,
        setOpenPostViewModal,
      }}
    >
      {children}

      {/* controll modals========== */}
      {openPostViewModal && (
        <PostViewCustomModalGlobalUsingContext
          setOpenPostViewModal={setOpenPostViewModal}
          openPostViewModal={openPostViewModal}
          setOpenDeletePostModal={setOpenDeletePostModal}
        />
      )}
      {openDeletePostModal && (
        <PostDeleteModal
          setOpenDeletePostModal={setOpenDeletePostModal}
          openDeletePostModal={openDeletePostModal}
        />
      )}
    </PostModalsContext.Provider>
  );
};

export default PostModalsProvider;
