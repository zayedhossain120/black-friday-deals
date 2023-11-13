import "./ViewCampaign.css";
import { Outlet } from "react-router-dom";
import TopBar from "../../../Components/TopBar/TopBar";
import ViewCampaignDetails from "./ViewCampaignDetails/ViewCampaignDetails";
import ViewCampaignInnerNav from "./ViewCampaignInnerNav/ViewCampaignInnerNav";

const ViewCampaign = () => {
  return (
    <div className="view-campaign-main-container">
      <TopBar pageTitle={"Campaign"} />

      <div className="view-campaign-container">
        <ViewCampaignDetails />
        <section className="view-campaign-outlet-and-nav-container">
          <ViewCampaignInnerNav />
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ViewCampaign;
