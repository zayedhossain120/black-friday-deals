/* eslint-disable react/prop-types */
import "./ViewBrandOutletShowPosts.css";
import { Button, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { SelectedCountryContext } from "../../../../Contexts/CountryContext/CountryProviderContext";
import EmptyData from "../../../../Components/EmptyData/EmptyData";
import useFetchInfinite from "../../../../CustomHooks/useFetchInfinite";
import MainLoading from "../../../../Components/MainLoading/MainLoading";
// import PostViewCustomModal from "../../../../Components/PostViewCustomModal/PostViewCustomModal";
// import PostDeleteModal from "../../../../Components/PostDeleteModal/PostDeleteModal";
// import ViewStorePostRow from "./ViewBrandPostRow/ViewBrandPostRow";
import { useLoaderData } from "react-router-dom";
import BrandViewCustomModal from "../../../../Components/BrandViewCustomModal/BrandViewCustomModal";
import ViewBrandPostRow from "./ViewBrandPostRow/ViewBrandPostRow";
import BrandDeleteModal from "../../../../Components/BrandDeleteModal/BrandDeleteModal";

const ViewBrandOutlet = ({ query }) => {
  const brand = useLoaderData();
  // console.log("this store modal data Nizam:", store);
  const countryContext = useContext(SelectedCountryContext);
  const [openPostViewModal, setOpenPostViewModal] = useState(null);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(null);
  const [selectMultipleItem, setSelectMultipleItem] = useState([]);
  const {
    data: brandPages /** change */,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinite(
    `post/all?brandName=${brand?.data?.brandName}&${query}&country=${countryContext?.selectedCountry}&limit=10`,
    "brand-route",
    { query, countryContext }
  );
  // first render deselect previous items on others components
  useEffect(() => {
    setSelectMultipleItem([]);
  }, [query]);

  if (!isFetchingNextPage && isFetching) {
    return <MainLoading />;
  }
  if (error || brandPages?.status === "failed") {
    return <p>{error?.message || brandPages?.message}</p>;
  }
  if (!brandPages[0]?.data?.length) {
    return <EmptyData />;
  }

  return (
    <section className="store-outlet-container">
      <div className="store-table">
        {brandPages?.map((page) =>
          page?.data?.map((post) => (
            <ViewBrandPostRow
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
      {openPostViewModal && (
        <BrandViewCustomModal
          setOpenPostViewModal={
            setOpenPostViewModal
          } /** change in setOpenStoreViewModal */
          setOpenDeletePostModal={setOpenDeletePostModal}
          openPostViewModal={openPostViewModal}
        />
      )}
      {openDeletePostModal && (
        <BrandDeleteModal
          openDeletePostModal={openDeletePostModal}
          setOpenDeletePostModal={setOpenDeletePostModal}
          refetch={refetch}
        />
      )}{" "}
    </section>
  );
};

export default ViewBrandOutlet;
