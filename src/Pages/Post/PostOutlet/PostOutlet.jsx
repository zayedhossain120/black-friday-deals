/* eslint-disable react/prop-types */
import "./PostOutlet.css";
import { Button, Spin } from "antd";
import PostRow from "../../../Components/PostRow/PostRow";
import { useContext, useEffect, useState } from "react";
import PostDeleteModal from "../../../Components/PostDeleteModal/PostDeleteModal";
import { SelectedCountryContext } from "../../../Contexts/CountryContext/CountryProviderContext";
import { PostFiterOnStoreContext } from "../../../Contexts/PostContext/PostFilteredStoreProvider";
import EmptyData from "../../../Components/EmptyData/EmptyData";
import PostViewCustomModal from "../../../Components/PostViewCustomModal/PostViewCustomModal";
import useFetchInfinite from "../../../CustomHooks/useFetchInfinite";
import MainLoading from "../../../Components/MainLoading/MainLoading";

const PostOutlet = ({ query }) => {
  const countryContext = useContext(SelectedCountryContext);
  const storeContext = useContext(PostFiterOnStoreContext);
  const [openPostViewModal, setOpenPostViewModal] = useState(null);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(null);
  const [selectMultipleItem, setSelectMultipleItem] = useState([]);
  const {
    data: postPages,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinite(
    `post/all?${query}&country=${countryContext?.selectedCountry}&${
      storeContext?.selectedStore && `storeName=${storeContext?.selectedStore}`
    }&limit=10`,
    "post-page-posts",
    {
      query,
      country: countryContext?.selectedCountry,
      storeName: storeContext?.selectedStore,
    }
  );
  // first render deselect previous items on others components
  useEffect(() => {
    setSelectMultipleItem([]);
  }, [query]);

  if (!isFetchingNextPage && isFetching) {
    return <MainLoading />;
  }
  if (error || postPages?.status === "failed") {
    return <p>{error?.message || postPages?.message}</p>;
  }
  if (!postPages[0]?.data?.length) {
    return <EmptyData />;
  }

  return (
    <section className="post-type-container">
      <div className="post-table">
        {postPages?.map((page) =>
          page?.data?.map((post) => (
            <PostRow
              key={post?._id}
              post={post}
              setOpenPostViewModal={setOpenPostViewModal}
              setOpenDeletePostModal={setOpenDeletePostModal}
              setSelectMultipleItem={setSelectMultipleItem}
            />
          ))
        )}
        {selectMultipleItem.length ? (
          <button onClick={() => setOpenDeletePostModal(selectMultipleItem)}>
            Delete all selected items
          </button>
        ) : (
          ""
        )}
      </div>
      {hasNextPage && (
        <Button
          style={{
            width: "fit-content",
            display: "block",
            margin: "10px auto",
          }}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage ? (
            <>
              {" "}
              <Spin style={{ marginRight: "10px" }} />
              Loading...
            </>
          ) : (
            <span>Load More</span>
          )}
        </Button>
      )}
      {/* open post modal ============ */}

      {openPostViewModal && (
        <PostViewCustomModal
          setOpenDeletePostModal={setOpenDeletePostModal}
          setOpenPostViewModal={setOpenPostViewModal}
          openPostViewModal={openPostViewModal}
        />
      )}
      {/* open delete post modal============ */}
      {openDeletePostModal && (
        <PostDeleteModal
          openDeletePostModal={openDeletePostModal}
          setOpenDeletePostModal={setOpenDeletePostModal}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default PostOutlet;
