/* eslint-disable react/prop-types */
import "./GlobalSearchStoreSection.css";
import { useNavigate } from "react-router";

// import { Empty } from "antd";
import React, { useRef } from "react";

const GlobalSearchStoreSection = ({
  checkedItems,
  data,
  setIsGlobalSearchOpen,
}) => {
  const navigate = useNavigate();
  const storeField = useRef();

  // handle horizontal scroll
  const handleScrollHorizontally = (e) => {
    if (e.deltaY * -0.01 < 0) {
      storeField.current.scrollLeft += 50;
    } else {
      storeField.current.scrollLeft -= 50;
    }
  };
  return (
    <React.Fragment>
      {checkedItems.find((item) => item === "stores") &&
        data?.data?.stores?.data?.length && (
          <section className="global-search-stores-section-container">
            <p>Stores</p>
            <div
              className="global-search-stores-container"
              ref={storeField}
              onWheel={handleScrollHorizontally}
            >
              {data?.data?.stores?.data?.length &&
                data?.data?.stores?.data?.map((store) => {
                  return (
                    <div
                      className="global-search-store"
                      key={store?._id}
                      onClick={() => {
                        navigate(`/store/${store?._id}`);
                        setIsGlobalSearchOpen(false);
                      }}
                    >
                      <div className="store-image-container">
                        <img src={store?.photoURL} alt="photo" />
                      </div>
                      <small>{store?.storeName}</small>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
    </React.Fragment>
  );
};

export default GlobalSearchStoreSection;
