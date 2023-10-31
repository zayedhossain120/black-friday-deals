/* eslint-disable react/prop-types */
import "./CategoryDeleteModal.css";
import { Modal } from "antd";
import DeleteIcon from "../../assets/Icons/modalDelete.svg";
import getToken from "../../Utils/getToken";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import { toast } from "react-toastify";

const CategoryDeleteModal = ({
  openDeleteCategoryModal,
  setOpenDeleteCategoryModal,
}) => {
  const handleCancel = () => {
    setOpenDeleteCategoryModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      const { data } = await axios.delete(
        `${apiUrl}/category/${openDeleteCategoryModal?._id}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
      // Check if the user was added successfully
      if (data?.success) {
        toast.warning("Category successfully Deleted");
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the category");
    }

    setOpenDeleteCategoryModal(false);
  };

  return (
    <Modal centered open={openDeleteCategoryModal} onCancel={handleCancel}>
      <div className="post-delete-modal-container">
        <img src={DeleteIcon} alt="Delete icon" />
        <p>
          Are You sure, want to delete{" "}
          <strong>{openDeleteCategoryModal?.categoryName}</strong> Category?
        </p>
        <form onSubmit={handleSubmit}>
          <button onClick={handleCancel}>Cancel</button>
          <button>Yes</button>
        </form>
      </div>
    </Modal>
  );
};
export default CategoryDeleteModal;
