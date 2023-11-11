/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./ViewCampaignOutletShowPosts.css";
import useFetchInfinite from "../../../../CustomHooks/useFetchInfinite";
import { useLoaderData } from "react-router-dom";
import MainLoading from "../../../../Components/MainLoading/MainLoading";
import EmptyData from "../../../../Components/EmptyData/EmptyData";
import { Button, Spin } from "antd";
import PostViewCustomModal from "../../../../Components/PostViewCustomModal/PostViewCustomModal";
import PostDeleteModal from "../../../../Components/PostDeleteModal/PostDeleteModal";
import postDeleteIcon from "../../../../assets/Icons/postDelete.svg";
import ViewCampaignPostRow from "../../ViewCampaign/ViewCampaignOutletShowPosts/ViewCampaignPostRow/ViewCampaignPostRow";
import { SelectedCountryContext } from "../../../../Contexts/CountryContext/CountryProviderContext";
import EditCampaignButton from "../../../../Components/EditCampaignButton/EditCampaignButton";

const ViewCampaignOutlet = ({ query }) => {
  const campaign = useLoaderData();
  const countryContext = useContext(SelectedCountryContext);
  const [openPostViewModal, setOpenPostViewModal] = useState(null);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(null);

  const [selectMultipleItem, setSelectMultipleItem] = useState([]);

  const {
    data: CampaignPages /** change */,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinite(
    `post/all?campaignName=${campaign?.data?.campaignName}&${query}&country=${countryContext?.selectedCountry}&limit=10`,
    "store-route",
    { query, countryContext }
  );
  useEffect(() => {
    setSelectMultipleItem([]);
  }, [query]);

  if (!isFetchingNextPage && isFetching) {
    return <MainLoading />;
  }
  if (error || CampaignPages?.status === "failed") {
    return <p>{error?.message || CampaignPages?.message}</p>;
  }
  if (!CampaignPages[0]?.data?.length) {
    return <EmptyData />;
  }
  return (
    <section className="campaign-outlet-container">
      <div className="campaign-table">
        {CampaignPages?.map((page) =>
          page?.data?.map((post) => (
            <ViewCampaignPostRow
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
            <img src={postDeleteIcon} alt="" />
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
        <PostViewCustomModal
          setOpenPostViewModal={setOpenPostViewModal}
          setOpenDeletePostModal={setOpenDeletePostModal}
          openPostViewModal={openPostViewModal}
        />
      )}
      {openDeletePostModal && (
        <PostDeleteModal
          openDeletePostModal={openDeletePostModal}
          setOpenDeletePostModal={setOpenDeletePostModal}
          refetch={refetch}
        />
      )}{" "}
      <EditCampaignButton />
    </section>
  );
};

export default ViewCampaignOutlet;
