// import React from 'react';
import TopBar from "../../Components/TopBar/TopBar";
import "./Network.css";
import NetworkCard from "../../Components/NetworkCard/NetworkCard";
import NetworkDeleteModal from "../../Components/NetworkDeleteModal/NetworkDeleteModal";
import EditNetworkCustomModal from "../../Components/EditNetworkCustomModal/EditNetworkCustomModal";
import { useState } from "react";
import AddNewNetworkCustomModal from "../../Components/AddNewNetworkCustomModal/AddNewNetworkCustomModal";

const Network = () => {
  const [openDeleteNetworkModal, setOpenDeleteNetworkModal] = useState(false);
  const [openEditNetworkModal, setOpenEditNetworkModal] = useState(false);
  const [addNewNetworkModal, setAddNewNetworkModal] = useState();

  return (
    <div className="category-main">
      <TopBar pageTitle="All Network" />

      <button onClick={(e) => setAddNewNetworkModal(true)}>
        Add new network
      </button>
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
          addNewNetworkModal={addNewNetworkModal}
          setAddNewNetworkModal={setAddNewNetworkModal}
        />
      )}
      {addNewNetworkModal && (
        <AddNewNetworkCustomModal
          addNewNetworkModal={addNewNetworkModal}
          setAddNewNetworkModal={setAddNewNetworkModal}
        />
      )}
    </div>
  );
};

export default Network;
