import React from "react";
import "./ViewCampaignDetails.css";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import flags from "../../../../Utils/variables/flags";
import EditIconView from "../../../../Components/IconsComponents/EditIconView";

const ViewCampaignDetails = () => {
  const { id } = useParams();
  const campaign = useLoaderData();
  console.log(campaign);
  const navigate = useNavigate();
  return (
    <div className="view-campaign-detail-container">
      <section className="view-campaign-section-container">
        <div className="view-campaign-left-container">
          <img src={campaign?.data?.photoURL} alt="" />
          <div className="view-campaign-name-country-flags">
            <div className="h1Container">
              <h1>{campaign?.data?.storeName}</h1>
            </div>
            <div className="view-campaign-country-flags">
              {campaign?.data?.country?.map((country) => (
                <img
                  className="campaign-country-flags-image"
                  key={country}
                  src={
                    flags.find((flag) => flag.countryName === country).flagUrl
                  }
                  title={country}
                  alt={country}
                />
              ))}
            </div>
          </div>
        </div>
        <hr className="view-campaign-hr" />
        <div className="view-campaign-button">
          <p className="shipping-cost-text">
            {campaign?.data?.description
              ? campaign.data.description
              : "Time period"}
          </p>
          <div className="set-two-button">
            <button
              className="view-campaign-second-button"
              onClick={() => navigate(`/store/edit/${id}`)}
            >
              {" "}
              <span className="button-text">Edit</span>
              <EditIconView />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewCampaignDetails;
