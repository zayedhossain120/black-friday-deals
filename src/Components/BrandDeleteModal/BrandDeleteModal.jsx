/* eslint-disable react/prop-types */

import "./BrandDeleteModal.css";
import modalDelete from "../../assets/Icons/modalDelete.svg";
import { Modal } from "antd";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import { toast } from "react-toastify";

const BrandDeleteModal = ({
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
        `${apiUrl}/brand/${openDeleteUserModal._id}`,
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );
      console.log(data, 'delete data');
      if (data?.success) {
        toast.success("Brand Deleted");
      } else {
        toast.error("Brand Not Deleted");
      }

      setOpenStoreDeleteModal(false);
    } catch (error) {
      console.error("Error deleting brand:", error);
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
          <strong>{openDeleteUserModal?.brandName}</strong>
        </p>
        <div className="store-delete-modal-btn">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      </div>
    </Modal>
  );
};
export default BrandDeleteModal;
