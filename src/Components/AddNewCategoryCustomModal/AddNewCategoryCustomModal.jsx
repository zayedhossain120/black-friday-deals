/* eslint-disable react/prop-types */
import "./AddNewCategoryCustomModal.css";
import { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import removeIcon from "../../assets/Icons/remove.svg";
import googleIcon from "../../assets/Icons/googleIcon.png";
import { toast } from "react-toastify";

const { Option } = Select;

const AddNewCategoryCustomModal = ({}) => {
  const handleCancel = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    // try {
    //   const { data } = await axios.post(
    //     `${apiUrl}/administrators/add`,
    //     {
    //       role,
    //       email,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );

    //   // Check if the user was added successfully
    //   if (data?.status === "success") {
    //     toast.success("User successfully added");
    //   } else {
    //     toast.error("Failed to add user");
    //   }

    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("An error occurred while adding the user");
    // }

    // setOpenAddNewUserCustomModal(false);
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
          className="user-add-remove-icon"
          onClick={handleCancel}
        />
        <div className="user-add-modal-container">
          <div className="add-user-add-card-profile">
            <h2>Create new Category</h2>
          </div>
          <p>This category can be help to find specific deals</p>

          <form className="user-add-form" onSubmit={handleSubmit}>
            <input
              id="category"
              type="text"
              placeholder="Type Category"
              // value={category}
              // onChange={(e) => setEmail(e.target.value)}
            />
            <button className="add-new-user-btn" type="submit">
              Add New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategoryCustomModal;
