/* eslint-disable react/prop-types */
import "./ViewCampaignDetails.css";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import flags from "../../../../Utils/variables/flags";
import EditIconView from "../../../../Components/IconsComponents/EditIconView";

const ViewCampaignDetails = () => {
  const { id } = useParams();
  const campaign = useLoaderData();
  const navigate = useNavigate();
  console.log(campaign);

  return (
    <div className="view-campaign-detail-container">
      <section className="view-campaign-section-container">
        <div className="view-campaign-left-container">
          <img src={campaign?.data?.campaignPhotoURL} alt="" />
          <div className="view-campaign-name-country-flags">
            <div className="h1Container">
              <h1>{campaign?.data?.campaignName}</h1>
            </div>
            <div className="view-campaign-country-flags">
              {campaign?.data?.countries?.map((country) => (
                <img
                  className="campaign-country-flags-image"
                  key={country}
                  src={
                    flags.find((flag) => flag.countryName === country).flagUrl
                  }
                  title={country}
                  alt={country}
                  width="30px"
                  height="22px"
                />
              ))}
            </div>
          </div>
        </div>
        {/* <hr className="view-campaign-hr" /> */}
        <div className="view-campaign-button">
          <p className="shipping-cost-text">
            Period: {campaign?.data?.startPeriod.slice(0, 10)}
            {" - "}
            {campaign?.data?.endPeriod.slice(0, 10)}
          </p>
          <div className="set-two-button">
            <button
              className="view-campaign-second-button"
              onClick={() => navigate(`/campaign/edit/${id}`)}
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
