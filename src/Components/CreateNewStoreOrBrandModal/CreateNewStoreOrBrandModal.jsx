/* eslint-disable react/prop-types */
import "./CreateNewStoreOrBrandModal.css";
import { Modal } from "antd";
import DeleteIcon from "../../assets/Icons/modalDelete.svg";
import getToken from "../../Utils/getToken";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateNewStoreOrBrandModal = ({
  openCreateNewStoreOrBrandModal,
  setOpenCreateNewStoreOrBrandModal,
}) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpenCreateNewStoreOrBrandModal(false);
  };

  return (
    <Modal
      centered
      open={openCreateNewStoreOrBrandModal}
      onCancel={handleCancel}
    >
      <div className="create-store-brand-modal-container">
        <h2>Create new Stores</h2>
        <p>Select Online Store or Brand what you want to create</p>

        <div className="modifier-buttons-container create-store-brand-button">
          <button className="store-modal-button" onClick={() => navigate("/store/create")}>Store</button>
          <button className="brand-modal-button" onClick={() => navigate("/store/create")}>Brand</button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateNewStoreOrBrandModal;
