/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getRandomColor } from "../../Utils/variables/getRandomColor";
import removeIcon from "../../assets/Icons/remove.svg";
import "./UserEditCustomModal.css";
import { Select } from "antd";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import { toast } from "react-toastify";

const { Option } = Select;

const UserEditCustomModal = ({
  openEditeUserCustomModal,
  setOpenEditeUserCustomModal,
  me,
}) => {
  const [role, setRole] = useState(openEditeUserCustomModal?.role || ""); // Initialize role with the user's current role

  useEffect(() => {
    setRole(openEditeUserCustomModal?.role);
  }, [openEditeUserCustomModal?.role]);

  const handleCancel = () => {
    setOpenEditeUserCustomModal(false);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpenEditeUserCustomModal(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !role ||
      !openEditeUserCustomModal?._id ||
      role === openEditeUserCustomModal?.role
    ) {
      // console.log("nothing to change");
      return;
    } else {
      const accessToken = getToken();
      try {
        const { data } = await axios.put(
          `${apiUrl}/administrators/${openEditeUserCustomModal?._id}`,
          {
            role,
          },
          {
            headers: {
              authorization: `bearer ${accessToken}`,
            },
          }
        );

        if (data?.status === "success") {
          toast.success("Role is updated");
        } else {
          toast.error("Failed to update role");
        }
        setOpenEditeUserCustomModal(false);

        console.log(data);
      } catch (error) {
        console.error("Error updating role:", error);
        toast.error("An error occurred while updating role");
      }
    }
    setOpenEditeUserCustomModal(false);
  };

  return (
    <div onClick={handleCancel} className="modal-main-container-with-mask">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`user-editmodal-content-container`}
      >
        <img
          src={removeIcon}
          alt="Remove"
          className="user-edit-remove-icon"
          onClick={handleCancel}
        />
        <div className="user-edit-modal-container">
          <div>
            <div
              style={{
                background: openEditeUserCustomModal?.photoURL
                  ? `url(${openEditeUserCustomModal?.photoURL})`
                  : "blue",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="user-edit-card-profile"
            >
              <h1>
                {!openEditeUserCustomModal?.name
                  ? openEditeUserCustomModal?.name[0].toUpperCase()
                  : ""}
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="user-edit-form">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={openEditeUserCustomModal?.name}
              readOnly
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              readOnly
              defaultValue={openEditeUserCustomModal?.email}
            />
            <label htmlFor="role">Role</label>
            <Select value={role} onChange={(value) => setRole(value)}>
              {me?.role === "super-admin" && (
                <Option value="super-admin">Super Admin</Option>
              )}
              <Option value="admin">Admin</Option>
              <Option value="manager">Manager</Option>
            </Select>

            <button className="modifier-buttons-container">Update Edit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditCustomModal;
