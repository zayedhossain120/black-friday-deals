/* eslint-disable react/prop-types */
import "./NetworkDeleteModal.css";
import { Modal } from "antd";
import DeleteIcon from "../../assets/Icons/modalDelete.svg";
import getToken from "../../Utils/getToken";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import { toast } from "react-toastify";

const NetworkDeleteModal = ({
  openDeleteNetworkModal,
  setOpenDeleteNetworkModal,
}) => {
  const handleCancel = () => {
    setOpenDeleteNetworkModal(false);
  };

  console.log(openDeleteNetworkModal, "get the delete modal");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      const { data } = await axios.delete(
        `${apiUrl}/network/${openDeleteNetworkModal?._id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
      // Check if the user was added successfully
      if (data?.success) {
        toast.warning("Netword successfully Deleted");
      } else {
        toast.error("Failed to update network");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the network");
    }

    setOpenDeleteNetworkModal(false);
  };

  return (
    <Modal centered open={openDeleteNetworkModal} onCancel={handleCancel}>
      <div className="post-delete-modal-container">
        <img src={DeleteIcon} alt="Delete icon" />
        <p>
          Are You sure, want to delete{" "}
          <strong>{openDeleteNetworkModal?.networkName}</strong> Network?
        </p>
        <form onSubmit={handleSubmit}>
          <button onClick={handleCancel}>Cancel</button>
          <button>Yes</button>
        </form>
      </div>
    </Modal>
  );
};
export default NetworkDeleteModal;
