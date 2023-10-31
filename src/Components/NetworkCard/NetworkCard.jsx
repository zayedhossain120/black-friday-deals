/* eslint-disable react/prop-types */
// import React from 'react';

import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import useFetch from "../../CustomHooks/useFetch";

// eslint-disable-next-line react/prop-types
const NetworkCard = ({
  setOpenDeleteNetworkModal,
  setOpenEditNetworkModal,
}) => {
  const { data: network } = useFetch("network");
  console.log(network);
  return (
    <section className="category-card-main-section">
      <h2>All Network</h2>
      <div className="category-card">
        {network?.data?.map((item) => (
          <div key={item?._id} className="category-card-container">
            <div className="category-card-item">
              <div className="">
                <h3>{item?.networkName}</h3>
              </div>
              <div className=" category-card-btn modifier-buttons-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setOpenEditNetworkModal(item);
                  }}
                >
                  {" "}
                  <EditIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setOpenDeleteNetworkModal(item);
                  }}
                >
                  {" "}
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NetworkCard;
