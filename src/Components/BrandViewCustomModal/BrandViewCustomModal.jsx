/* eslint-disable react/prop-types */
import "./BrandViewCustomModal.css";
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

const PostViewCustomModal = ({
  post,
  openPostViewModal,
  setOpenPostViewModal,
  setOpenDeletePostModal,
}) => {
  console.log(openPostViewModal, "check desc");

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
    <div
      onClick={handleCancel}
      className="brand-view-modal-main-container-with-mask"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`brand-view-modal-content-container`}
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
            <div className="brand-view-modal-container-reedit">
              <div className="image-container">
                <img
                  src={openPostViewModal?.data?.postPhotoURL || placeholder}
                  alt="campaign-photo"
                  height={100}
                  width={100}
                  className="post-view-store-photo"
                />
              </div>
              <div className="duo-container">
                <div className="price-title-country-etc-container">
                  <h1>{openPostViewModal?.data?.postTitle}</h1>
                  <div className="brand-modal-price">
                    <p>$20</p>
                    <del>$70</del>
                    <p className="">75% OFF</p>
                  </div>
                  <p>
                    {" "}
                    {getExpireInAtDays(openPostViewModal?.data?.expireDate) <
                    1 ? (
                      "Expired"
                    ) : (
                      <span>
                        End in{" "}
                        <strong>
                          {getExpireInAtDays(
                            openPostViewModal?.data?.expireDate
                          )}
                        </strong>{" "}
                        days
                      </span>
                    )}
                  </p>
                  <div className="brand-modal-country-flags">
                    {openPostViewModal?.data?.countries?.map((country) => (
                      <img
                        key={country}
                        src={
                          flags.find((flag) => country === flag.countryName)
                            .flagUrl
                        }
                        alt="country-flag"
                      />
                    ))}
                  </div>
                </div>
                <div className="availablestore-view-container">
                  <p>Available On</p>
                  <img
                    src={openPostViewModal?.data?.store?.storePhotoURL}
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  />
                  <div className="view-icon-count-container">
                    <img src={viewIcon} alt="view icon" />
                    <p>{openPostViewModal?.data?.revealed}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="description-container">
              <p>{openPostViewModal?.data?.postDescription}</p>
            </div>
            <div className="delete-edit-duo">
              <button
                onClick={() => {
                  setOpenDeletePostModal(openPostViewModal.data);
                  setOpenPostViewModal(false);
                }}
                className="delete-button"
              >
                <DeleteIcon />
                <span>Delete</span>
              </button>
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(post, "here or not");
                  openPostViewModal?.data?.postType === "Deal"
                    ? navigate(`/post/productDealUpdate/${post?._id}`)
                    : navigate(`/post/addnewpostupdate/${post?._id}`);
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
export default PostViewCustomModal;
