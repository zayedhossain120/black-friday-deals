/* eslint-disable react/prop-types */

import "./StoreDeleteModal.css";
import modalDelete from "../../assets/Icons/modalDelete.svg";
import { Modal } from "antd";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import { toast } from "react-toastify";

const StoreDeleteModal = ({
  openDeleteUserModal,
  setOpenStoreDeleteModal,
  refetch,
}) => {
  const handleCancel = () => {
    setOpenStoreDeleteModal(false);
  };

  const handleDelete = async () => {
    const accessToken = getToken();

    try {
      const { data } = await axios.delete(
        `${apiUrl}/store/${openDeleteUserModal._id}`,
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Store Deleted");
      } else {
        toast.error("Store Not Deleted");
      }

      setOpenStoreDeleteModal(false);
    } catch (error) {
      console.error("Error deleting store:", error);
      toast.error("Bhai atar bitor data ace delete hobena");
    }
    refetch();
    setOpenStoreDeleteModal(false);
  };

  return (
    <Modal centered open={openDeleteUserModal} onCancel={handleCancel}>
      <div className="store-delete-modal-container">
        <img src={modalDelete} alt="delete icon" />
        <p>
          Are you sure you want to delete{" "}
          <strong>{openDeleteUserModal?.storeName}</strong>
        </p>
        <div className="store-delete-modal-btn">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      </div>
    </Modal>
  );
};
export default StoreDeleteModal;
