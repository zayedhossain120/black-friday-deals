import "./GlobalSearchPostSection.css";
// import { Empty } from "antd";
import GlobalPostRow from "./GlobalPostRow/GlobalPostRow";
import React, { useContext } from "react";
import { PostModalsContext } from "../../../Contexts/PostModalContext/PostModalContext";

/* eslint-disable react/prop-types */
const GlobalSearchPostSection = ({
  checkedItems,
  data,
  setIsGlobalSearchOpen,
}) => {
  const {
    openDeletePostModal,
    setOpenDeletePostModal,
    openPostViewModal,
    setOpenPostViewModal,
  } = useContext(PostModalsContext);
  return (
    <React.Fragment>
      {checkedItems.find((item) => item === "coupons" || item === "deals") &&
        data?.data?.posts?.data?.length && (
          <section className={"global-search-posts-section-container"}>
            <p>Coupons & Deals</p>
            <div className="global-search-posts-container">
              {data?.data?.posts?.data?.length &&
                data?.data?.posts?.data?.map((post) => {
                  if (
                    checkedItems.find((item) => item === `${post?.postType}s`)
                  ) {
                    return (
                      <GlobalPostRow
                        key={post._id}
                        post={post}
                        setIsGlobalSearchOpen={setIsGlobalSearchOpen}
                        setOpenDeletePostModal={setOpenDeletePostModal}
                        setOpenPostViewModal={setOpenPostViewModal}
                      />
                    );
                  }
                })}
            </div>
          </section>
        )}
    </React.Fragment>
  );
};

export default GlobalSearchPostSection;
