import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import viewStoreRoutes from '../../../../Utils/Menus/viewStoreRoutes';

const ViewCampaignInnerNav = () => {
    const store = useLoaderData();
    return (
        <nav className="post-inner-nav">
      {viewStoreRoutes(store?.data?._id).map((menu) => (
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