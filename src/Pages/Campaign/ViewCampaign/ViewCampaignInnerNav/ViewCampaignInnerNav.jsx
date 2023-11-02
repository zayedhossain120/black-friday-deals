import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import viewCampaignRoutes from '../../../../Utils/Menus/viewCampaignRoutes';

const ViewCampaignInnerNav = () => {
    const campaign = useLoaderData();
    return (
        <nav className="post-inner-nav">
      {viewCampaignRoutes(campaign?.data?._id).map((menu) => (
        <NavLink
          key={menu.label}
          to={menu.link}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending post-inner-menu"
              : isActive
              ? "active post-inner-menu"
              : "post-inner-menu"
          }
        >
          {menu.label}
        </NavLink>
      ))}
    </nav>
    );
};

export default ViewCampaignInnerNav;