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

  console.log(openDeleteCategoryModal, "get the delete modal");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const store = openDeletePostModal?.store?.storeName;
    // const accessToken = getToken();

    // try {
    //   let url;
    //   let dataToDelete;

    //   if (Array.isArray(openDeletePostModal)) {
    //     url = `${apiUrl}/post/many`;
    //     dataToDelete = {
    //       posts: openDeletePostModal,
    //     };
    //   } else {
    //     url = `${apiUrl}/post/${openDeletePostModal._id}`;
    //     dataToDelete = { storeName: store };
    //   }

    //   const { data } = await axios.delete(url, {
    //     data: dataToDelete,
    //     headers: {
    //       authorization: `bearer ${accessToken}`,
    //     },
    //   });

    //   if (data?.status === "success") {
    //     if (Array.isArray(openDeletePostModal)) {
    //       toast.warning("Post(s) are deleted");
    //     } else {
    //       toast.warning("Post is deleted");
    //     }
    //   } else {
    //     toast.error("Failed to delete post(s)");
    //   }
    // } catch (error) {
    //   console.error("Error deleting post:", error);
    //   toast.error("An error occurred while deleting the post(s)");
    // } finally {
    //   refetch();
    //   setOpenDeletePostModal(false);
    // }
  };

  return (
    <Modal centered open={openDeleteCategoryModal} onCancel={handleCancel}>
      <div className="post-delete-modal-container">
        <img src={DeleteIcon} alt="Delete icon" />
        {Array.isArray(openDeleteCategoryModal) ? (
          <p>
            Are You sure, want to delete{" "}
            <strong>{openDeleteCategoryModal?.length}</strong> Category?
          </p>
        ) : (
          <p>
            Are You sure, want to delete{" "}
            <strong>{openDeleteCategoryModal?.categoryName}</strong> Category?
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <button onClick={handleCancel}>Cancel</button>
          <button>Yes</button>
        </form>
      </div>
    </Modal>
  );
};
export default CategoryDeleteModal;
