/* eslint-disable react/prop-types */
import "./PostInnerNav.css";
import { NavLink } from "react-router-dom";
import postInnerMenus from "../../Utils/Menus/postInnerMenus";
import { Select } from "antd";
import useFetch from "../../CustomHooks/useFetch";
import { useContext, useLayoutEffect, useState } from "react";
import { PostFiterOnStoreContext } from "../../Contexts/PostContext/PostFilteredStoreProvider";

const PostInnerNav = () => {
  const storeContext = useContext(PostFiterOnStoreContext);
  const { data: storeData } = useFetch("store");
  const [allStores, setAllStores] = useState([]);

  useLayoutEffect(() => {
    const stores = storeData?.data;
    stores && setAllStores([{ storeName: "All Store" }, ...stores]);
  }, [storeData]);

  const handleChange = (value) => {
    storeContext?.setSelectedStore(value !== "All Store" ? value : "");
  };

  return (
    <nav className="post-inner-nav">
      {postInnerMenus.map((menu) => (
        <NavLink
          key={menu.label}
          to={menu.link}
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "active post-inner-menu"
              : " post-inner-menu"
          }
        >
          {menu.label}
        </NavLink>
      ))}
      {/* filter post based on store */}
      <Select
        defaultValue="Store"
        style={{
          width: 120,
          margin: "auto 20px auto auto",
        }}
        onChange={handleChange}
        options={allStores?.map((store) => ({
          value: store?.storeName,
          label: (
            <div className="store-filter-drowon-container">
              {store?.photoURL && (
                <div className="store-filter-drowon-img">
                  <img
                    src={store?.photoURL}
                    alt={store?.storeData}
                    height={15}
                    width={20}
                  />
                </div>
              )}
              {store?.storeName}
            </div>
          ),
        }))}
      />
    </nav>
  );
};

export default PostInnerNav;
