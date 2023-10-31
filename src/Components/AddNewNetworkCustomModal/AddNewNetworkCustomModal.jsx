/* eslint-disable react/prop-types */
import "./AddNewNetworkCustomModal.css";
import { useState } from "react";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import removeIcon from "../../assets/Icons/remove.svg";
import { toast } from "react-toastify";

const AddNewNetworkCustomModal = ({
  addNewNetworkModal,
  setAddNewNetworkModal,
}) => {
  console.log(addNewNetworkModal);
  const [newNetworkName, setNewNetworkName] = useState();

  const handleCancel = () => {
    setAddNewNetworkModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      const { data } = await axios.post(
        `${apiUrl}/network/add`,
        {
          networkName: newNetworkName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
      // Check if the user was added successfully
      if (data?.success) {
        toast.success("Network successfully added");
      } else {
        toast.error("Failed to add network");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the network");
    }
    setAddNewNetworkModal(false);
  };

  return (
    <div onClick={handleCancel} className="modal-main-container-with-mask">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal-content-container`}
      >
        <img
          src={removeIcon}
          alt="Remove"
          className="edit-category-remove-icon"
          onClick={handleCancel}
        />
        <div className="edit-category-modal-container">
          <h2>Add new network</h2>
          <p>This network can be help to find specific deals</p>

          <form className="edit-category-form" onSubmit={handleSubmit}>
            <input
              id="network"
              type="text"
              placeholder="Type network"
              value={newNetworkName}
              onChange={(e) => setNewNetworkName(e.target.value)}
            />
            <button className="add-new-user-btn" type="submit">
              Add Network
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewNetworkCustomModal;
