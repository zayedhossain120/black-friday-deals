import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLoading from '../MainLoading/MainLoading';
import EditIcon from '../IconsComponents/EditIcon';
import DeleteIcon from '../IconsComponents/DeleteIcon';
import flags from '../../Utils/variables/flags';
import { Button, Spin } from 'antd';
import CampaignDeleteModal from '../CampaignDeleteModal/CampaignDeleteModal';

const CampaignsCardsContainer = ({
  campaignData,
  error,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  refetch,
}) => {
    const navigate = useNavigate();
    const [openCampaignDeleteModal, setOpenCampaignDeleteModal] = useState(false);
     

    if(!isFetchingNextPage && isFetching){
        return <MainLoading />;
    }

    if(error || campaignData.status === "failed") {
        return <p>{error.message || campaignData?.message} Check your Router Modem or Mobile Data</p>;
    }

console.log(campaignData);
    return (
<div className="campaigns-sub-main-container">
<div className="campaign-cards-container">
  {campaignData?.map((page) =>
    page?.data
      ?.sort((a, b) => (a?.totalPosts > b?.totalPosts ? -1 : 1))
      ?.map((campaign) => (
        <div
          key={campaign?._id}
          className="individual-campaign-container"
          onClick={() => navigate(`${campaign?._id}/`)}
        >
          <div className="store-image-container">
            <img src={campaign.campaignPhotoURL} alt="" />
          </div>

          <div className="modifier-buttons-container">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/store/edit/${campaign?._id}`);
              }}
            >
              <EditIcon />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenCampaignDeleteModal(campaign);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className="campaign-info">
            <h1>{campaign?.campaignName}</h1>
            <div className="country-flags-container">
              {campaign?.countries?.map((country) => (
                <img
                  key={country}
                  src={
                    flags.find((flag) => flag.countryName === country)
                      .flagUrl
                  }
                  alt={country}
                />
              ))}
            </div>
            <p>offer available {campaign?.totalPosts}</p>
          </div>
        </div>
      ))
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
{openCampaignDeleteModal && (
  <CampaignDeleteModal
    openCampaignDeleteModal={openCampaignDeleteModal}
    setOpenCampaignDeleteModal={setOpenCampaignDeleteModal}
    refetch={refetch}
  />
)}
</div>
    );
};

export default CampaignsCardsContainer;