/* eslint-disable react/prop-types */

import "./UserDeleteModal.css";
import { Modal } from "antd";
import getToken from "../../Utils/getToken";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import { toast } from "react-toastify";

const UserDeleteModal = ({ openDeleteUserModal, setOpenDeleteUserModal }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      if (!openDeleteUserModal?.name) {
        const { data } = await axios.delete(
          `${apiUrl}/administrators/${openDeleteUserModal?._id}`,
          {
            headers: {
              authorization: `bearer ${accessToken}`,
            },
          }
        );
        console.log("deleted ", data);
      } else {
        const { data } = await axios.put(
          `${apiUrl}/administrators/${openDeleteUserModal?._id}`,
          {
            role: "inactive",
          },
          {
            headers: {
              authorization: `bearer ${accessToken}`,
            },
          }
        );
        console.log("here comes the big dog", data);
        if (data?.status === "success") {
          toast.warning("Role is Inactivated");
        } else {
          toast.error("Failed to inactivate role");
        }

        console.log("Inactivated user ", data);
      }

      setOpenDeleteUserModal(false);
    } catch (error) {
      console.error("Error inactivating role:", error);
      toast.error("An error occurred while inactivating role");
    }
  };

  const handleCancel = () => {
    setOpenDeleteUserModal(false);
  };
  return (
    <Modal centered open={openDeleteUserModal} onCancel={handleCancel}>
      <div className="user-delete-modal-container">
        <div>
          <div
            style={{
              background: openDeleteUserModal?.photoURL
                ? `url(${openDeleteUserModal?.photoURL})`
                : "blue",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="user-card-profile"
          >
            <h1>
              {!openDeleteUserModal?.name
                ? Array.isArray(openDeleteUserModal?.name) &&
                  openDeleteUserModal?.name[0]?.toUpperCase()
                : ""}
            </h1>
          </div>
        </div>
        <h4>{openDeleteUserModal?.role}</h4>
        <p>
          Are you sure you want to delete{" "}
          <strong>{openDeleteUserModal?.name}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <button onClick={handleCancel}>Cancel</button>
            <button>Yes</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default UserDeleteModal;
