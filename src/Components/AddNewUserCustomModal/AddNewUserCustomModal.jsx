/* eslint-disable react/prop-types */
import "./AddNewUserCustomModal.css";
import { useState } from "react";
import { Select } from "antd";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import removeIcon from "../../assets/Icons/remove.svg";
import googleIcon from "../../assets/Icons/googleIcon.png";
import { toast } from "react-toastify";

const { Option } = Select;

const AddNewUserCustomModal = ({
  openAddNewUserCustomModal,
  setOpenAddNewUserCustomModal,
  me,
}) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleCancel = () => {
    setOpenAddNewUserCustomModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      const { data } = await axios.post(
        `${apiUrl}/administrators/add`,
        {
          role,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Check if the user was added successfully
      if (data?.success) {
        toast.success("User successfully added");
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the user");
    }

    setOpenAddNewUserCustomModal(false);
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
            <img src={googleIcon} alt="" />
          </div>
          <p>Enter new Manager Gmail to give him/her access</p>

          <form className="user-add-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Gmail</label>
            <input
              id="email"
              type="text"
              placeholder="Type email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="role">Role</label>
            <Select value={role} onChange={(value) => setRole(value)}>
              {me?.role === "super-admin" && (
                <Option value="super-admin">Super Admin</Option>
              )}
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
            </Select>

            <button className="add-new-user-btn" type="submit">
              Add New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewUserCustomModal;
