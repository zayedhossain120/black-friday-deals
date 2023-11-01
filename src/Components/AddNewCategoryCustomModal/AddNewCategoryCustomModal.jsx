/* eslint-disable react/prop-types */
import "./AddNewCategoryCustomModal.css";
import { useState } from "react";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import removeIcon from "../../assets/Icons/remove.svg";
import { toast } from "react-toastify";

const AddNewCategoryCustomModal = ({
  openAddNewCategoryModal,
  setOpenAddNewCategoryModal,
}) => {
  const [newCategoryName, setNewCategoryName] = useState();
  console.log(newCategoryName);

  const handleCancel = () => {
    setOpenAddNewCategoryModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      const { data } = await axios.post(
        `${apiUrl}/category/add`,
        {
          categoryName: newCategoryName,
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
        toast.success("Category successfully added");
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the category");
    }

    setOpenAddNewCategoryModal(false);
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
          <h2>Update the Category</h2>
          <p>This category can be help to find specific deals</p>

          <form className="edit-category-form" onSubmit={handleSubmit}>
            <input
              id="category"
              type="text"
              placeholder="Type Category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button className="add-new-user-btn" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategoryCustomModal;
