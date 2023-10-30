/* eslint-disable react/prop-types */
import './BrandViewCustomModal.css'
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

const BrandViewCustomModal = ({
  openBrandViewModal,
  setOpenBrandViewModal,
  setOpenDeleteBrandModal,
}) => {
  console.log(openBrandViewModal);
  const handleCancel = () => {
    setOpenBrandViewModal(false);
  };
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 2000 });

  // close modal when Escape button clicked
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        setOpenBrandViewModal(false);
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
        {openBrandViewModal?.error ? (
          <p>{openBrandViewModal?.error?.message}</p>
        ) : (
          <React.Fragment>
            <img
              src={openBrandViewModal?.data?.store?.photoURL || placeholder}
              alt="Store photo"
              height={100}
              width={100}
              className="post-view-store-photo"
            />
            <p>{openBrandViewModal?.data?.store?.storeName}</p>
            <h1>{openBrandViewModal?.data?.postTitle}</h1>
            <p>{openBrandViewModal?.data?.postDescription}</p>
            <div className="view-icon-count-container">
              <img src={viewIcon} alt="view icon" />
              <p>{openBrandViewModal?.data?.revealed}</p>
            </div>

            <div className="country-flags">
              {openBrandViewModal?.data?.country?.map((country) => (
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
                {openBrandViewModal?.data?.isVerified && (
                  <img src={verifiedCodeChecked} alt="verified code" />
                )}
                <span>{openBrandViewModal?.data?.couponCode}</span>
              </div>
              <button
                onClick={() =>
                  clipboard.copy(openBrandViewModal?.data?.couponCode)
                }
              >
                <img src={copyIcon} alt="copy icon" />
              </button>
            </fieldset>
            <p>
              {" "}
              {getExpireInAtDays(openBrandViewModal?.data?.expireDate) < 1 ? (
                "Expired"
              ) : (
                <span>
                  End in{" "}
                  <strong>
                    {getExpireInAtDays(openBrandViewModal?.data?.expireDate)}
                  </strong>{" "}
                  days
                </span>
              )}
            </p>
            <div>
              <button
                onClick={() => {
                    setOpenDeleteBrandModal(openBrandViewModal.data);
                  setOpenBrandViewModal(false);
                }}
                className="delete-button"
              >
                <DeleteIcon />
                <span>Delete</span>
              </button>
              <button
                className="edit-button"
                onClick={() =>
                  navigate(`/post/editpost/${openBrandViewModal?.data?._id}`)
                }
              >
                <EditIcon />
                Edit poran change
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default BrandViewCustomModal;
