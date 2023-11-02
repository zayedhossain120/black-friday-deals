/* eslint-disable react/prop-types */
import { NavLink, useLoaderData } from "react-router-dom";
import brandRoutes from "../../../../Utils/Menus/brandRoutes";

const ViewBrandInnerNav = () => {
  const brand = useLoaderData();

  return (
    <nav className="post-inner-nav">
      {brandRoutes(brand?.data?._id).map((menu) => (
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

export default ViewBrandInnerNav;
