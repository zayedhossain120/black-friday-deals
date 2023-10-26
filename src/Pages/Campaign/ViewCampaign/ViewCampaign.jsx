import React from 'react';
import "./ViewCampaign.css";
import { Outlet } from 'react-router-dom';
import ViewStoreInnerNav from '../../Store/ViewStore/ViewStoreInnerNav/ViewStoreInnerNav';
import ViewStoreDetails from '../../Store/ViewStore/ViewStoreDetails/ViewStoreDetails';
import TopBar from '../../../Components/TopBar/TopBar';


const ViewCampaign = () => {
    return (
        <div className="view-campaign-main-container">
        <TopBar pageTitle={"View Campaign"} />
  
        <div className="view-campaign-container">
          <ViewStoreDetails />
          <section className="view-campaign-outlet-and-nav-container">
            <ViewStoreInnerNav />
            <Outlet />
          </section>
        </div>
      </div>
    );
};

export default ViewCampaign;