// import React from 'react';
import TopBar from "../../Components/TopBar/TopBar";
import "./Network.css";
import NetworkCard from "../../Components/NetworkCard/NetworkCard";
import NetworkDeleteModal from "../../Components/NetworkDeleteModal/NetworkDeleteModal";
import EditNetworkCustomModal from "../../Components/EditNetworkCustomModal/EditNetworkCustomModal";
import { useState } from "react";

const Network = () => {
  const [openDeleteNetworkModal, setOpenDeleteNetworkModal] = useState(false);
  const [openEditNetworkModal, setOpenEditNetworkModal] = useState(false);

  return (
    <div className="category-main">
      <TopBar pageTitle="All Categories" />
      <NetworkCard
        setOpenDeleteNetworkModal={setOpenDeleteNetworkModal}
        setOpenEditNetworkModal={setOpenEditNetworkModal}
      />

      {openDeleteNetworkModal && (
        <NetworkDeleteModal
          openDeleteNetworkModal={openDeleteNetworkModal}
          setOpenDeleteNetworkModal={setOpenDeleteNetworkModal}
        />
      )}
      {openEditNetworkModal && (
        <EditNetworkCustomModal
          openEditNetworkModal={openEditNetworkModal}
          setOpenEditNetworkModal={setOpenEditNetworkModal}
        />
      )}
    </div>
  );
};

export default Network;
