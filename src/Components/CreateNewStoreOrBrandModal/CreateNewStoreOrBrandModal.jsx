/* eslint-disable react/prop-types */
import "./CreateNewStoreOrBrandModal.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, TrademarkOutlined } from "@ant-design/icons";

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
    className="antd-modal-of-brand-store"
      centered
      open={openCreateNewStoreOrBrandModal}
      onCancel={handleCancel}
    >
      <div className="create-store-brand-modal-container">
        <div className="create-modal-title">
          <h2>Create new Stores or Brand    </h2>
          <p>Select Online Store or Brand what you want to create</p>
        </div>

        <div className="modifier-buttons-container create-store-brand-button">
          <button
            className="store-modal-button"
            onClick={() => navigate("/store/create")}
          >
            <HomeOutlined />
            Store
          </button>
          <button
            className="brand-modal-button"
            onClick={() => navigate("/brands/create")}
          >
            <TrademarkOutlined />
            Brand
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateNewStoreOrBrandModal;
