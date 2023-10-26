/* eslint-disable react/prop-types */
import "./PostViewCustomModalGlobalUsingContext.css";
import viewIcon from "../../assets/Icons/viewEye.svg";
import placeholder from "../../assets/placeholder.webp";
import verifiedCodeChecked from "../../assets/Icons/verifiedChecked.svg";
import copyIcon from "../../assets/Icons/copyIcon.svg";
import flags from "../../Utils/variables/flags";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import { useClipboard } from "@mantine/hooks";
import removeIcon from "../../assets/Icons/remove.svg";
import React from "react";
import { getExpireInAtDays } from "../../Utils/variables/formattedDates";
import { useNavigate } from "react-router-dom";

const PostViewCustomModalGlobalUsingContext = ({
  openPostViewModal,
  setOpenPostViewModal,
  setOpenDeletePostModal,
}) => {
  const handleCancel = () => {
    setOpenPostViewModal(false);
  };
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 2000 });

  // close modal when Escape button clicked
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpenPostViewModal(false);
    }
  });
  return (
    <div onClick={handleCancel} className="modal-main-container-with-mask">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`modal-content-container`}
      >
        <img
          src={removeIcon}
          alt="Remove"
          className="user-edit-remove-icon"
          onClick={handleCancel}
        />
        {openPostViewModal?.error ? (
          <p>{openPostViewModal?.error?.message}</p>
        ) : (
          <React.Fragment>
            <img
              src={openPostViewModal?.store?.photoURL || placeholder}
              alt="Store photo"
              height={100}
              width={100}
            />
            <p>{openPostViewModal?.store?.storeName}</p>
            <h1>{openPostViewModal?.postTitle}</h1>
            <p>{openPostViewModal?.postDescription}</p>
            <div className="view-icon-count-container">
              <img src={viewIcon} alt="view icon" />
              <p>{openPostViewModal?.revealed}</p>
            </div>

            <div className="country-flags">
              {openPostViewModal?.country?.map((country) => (
                <img
                  key={country}
                  src={
                    flags.find((flag) => country === flag.countryName).flagUrl
                  }
                  alt="country-flag"
                />
              ))}
            </div>
            <fieldset>
              <legend className={clipboard.copied ? "code-copied" : ""}>
                {clipboard.copied ? "Code Copied" : "Click to Copy"}
              </legend>
              <div>
                {openPostViewModal?.isVerified && (
                  <img src={verifiedCodeChecked} alt="verified code" />
                )}
                <span>{openPostViewModal?.couponCode}</span>
              </div>
              <button
                onClick={() => clipboard.copy(openPostViewModal?.couponCode)}
              >
                <img src={copyIcon} alt="copy icon" />
              </button>
            </fieldset>
            <p>
              {" "}
              {getExpireInAtDays(openPostViewModal?.expireDate) < 1 ? (
                "Expired"
              ) : (
                <span>
                  End in{" "}
                  <strong>
                    {getExpireInAtDays(openPostViewModal?.expireDate)}
                  </strong>{" "}
                  days
                </span>
              )}
            </p>
            <div>
              <button
                onClick={() => {
                  setOpenDeletePostModal(openPostViewModal);
                  setOpenPostViewModal(false);
                }}
                className="delete-button"
              >
                <DeleteIcon />
                <span>Delete</span>
              </button>
              <button
                className="edit-button"
                onClick={() => {
                  navigate(`/post/editpost/${openPostViewModal?._id}`);
                  setOpenPostViewModal(false);
                }}
              >
                <EditIcon />
                Edit
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default PostViewCustomModalGlobalUsingContext;
