/* eslint-disable react/prop-types */
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import activeUserIcon from "../../assets/Icons/verifiedChecked.svg";

const AdministratorsCard = ({
  item,
  setOpenDeleteUserModal,
  setOpenEditeUserCustomModal,
  me,
}) => {
  const authorizedAdmin = me?.role === "admin" && item?.role !== "super-admin";
  const superAdmin = me?.role === "super-admin";
  const isAuthorized = authorizedAdmin || superAdmin;

  return (
    <>
      <div className="user-card" key={item?._id}>
        <div className="user-card-icon modifier-buttons-container">
          {isAuthorized && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteUserModal(item);
                }}
              >
                <DeleteIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEditeUserCustomModal(item);
                }}
              >
                <EditIcon />
              </button>
            </>
          )}
        </div>
        <div
          style={{
            background: item?.photoURL ? `url(${item?.photoURL})` : "navy",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="user-card-profile"
        >
          <h1>
            {!item?.photoURL ? item?.name && item?.name[0]?.toUpperCase() : ""}
          </h1>
        </div>
        <div className="user-card-title">
          <h4>{item?.name ? item?.name : item?.email}</h4>
          <p>{item?.role}</p>
          {me?.email === item?.email && (
            <img
              className="user-card-verified-icon"
              src={activeUserIcon}
              alt="active-user-indicator"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdministratorsCard;
