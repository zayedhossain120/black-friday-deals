/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import "./GlobalSearchAdministratorsSection.css";

// import { Empty } from "antd";
import React, { useRef } from "react";

const GlobalSearchAdministratorsSection = ({
  checkedItems,
  data: administratorsData,
}) => {
  const navigate = useNavigate();

  const administratorsField = useRef();
  // handle horizontal scroll
  const handleScrollHorizontally = (e) => {
    if (e.deltaY * -0.01 < 0) {
      administratorsField.current.scrollLeft += 50;
    } else {
      administratorsField.current.scrollLeft -= 50;
    }
  };

  // console.log(administratorsData);
  return (
    <React.Fragment>
      {checkedItems.find((item) => item === "administrators") &&
        administratorsData?.data?.length && (
          <section className="global-search-administrators-section-container">
            <p>Administrators</p>
            <div
              className="global-search-administrators-container"
              ref={administratorsField}
              onWheel={handleScrollHorizontally}
              onClick={() => navigate("/administrators")}
            >
              {administratorsData?.data?.length &&
                administratorsData?.data?.map((administrator) => {
                  return (
                    <div key={administrator?._id}>
                      <div className="administrator-image-container">
                        <img src={administrator?.photoURL} alt="photo" />
                      </div>
                      <small>{administrator?.administratorName}</small>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
    </React.Fragment>
  );
};

export default GlobalSearchAdministratorsSection;
