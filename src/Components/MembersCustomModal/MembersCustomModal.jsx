/* eslint-disable react/prop-types */
import viewIcon from "../../assets/Icons/viewEye.svg";
import verifiedCodeChecked from "../../assets/icons/verifiedChecked.svg";
import copyIcon from "../../assets/icons/copyIcon.svg";
import flags from "../../Utils/variables/flags";

import { useClipboard } from "@mantine/hooks";
import removeIcon from "../../assets/Icons/remove.svg";
import "./MembersCustomModal.css";
import React from "react";
import { getUKFormatDate } from "../../Utils/variables/formattedDates";
import { getRandomColor } from "../../Utils/variables/getRandomColor";

const MembersCustomModal = ({
  openMembersCustomModal,
  setOpenMembersCustomModal,
}) => {
  const handleCancel = () => {
    setOpenMembersCustomModal(false);
  };

  const clipboard = useClipboard({ timeout: 2000 });

  //country flag

  const getCountryFlagUrl = (countryName) => {
    const countryInfo = flags.find((flag) => flag.countryName === countryName);
    return countryInfo ? countryInfo.flagUrl : "";
  };

  // close modal when Escape button clicked
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpenMembersCustomModal(false);
    }
  });

  const handleUsersDataCopy = () => {
    {
      const copyText = `Name: ${openMembersCustomModal?.name}\nEamil: ${
        openMembersCustomModal?.email
      }${
        openMembersCustomModal?.phoneNumber &&
        `\nNumber: ${openMembersCustomModal?.phoneNumber}`
      }\nCountry: ${openMembersCustomModal?.country}`;
      clipboard.copy(copyText);
    }
  };

  return (
    <div
      onClick={handleCancel}
      className="members-modal-main-container-with-mask"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`members-modal-content-container`}
      >
        <img
          src={removeIcon}
          alt="Remove"
          className="user-edit-remove-icon"
          onClick={handleCancel}
        />

        <React.Fragment>
          <div className="members-modal-container">
            <div className="members-modal-container-profile">
              <div
                style={{
                  background: openMembersCustomModal?.photoURL
                    ? `url(${openMembersCustomModal?.photoURL})`
                    : "blue",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="member-card-profile"
              >
                <h1>
                  {!openMembersCustomModal?.name
                    ? openMembersCustomModal?.name[0].toUpperCase()
                    : ""}
                </h1>
              </div>
              <div>
                <h3>{openMembersCustomModal?.name}</h3>
                <p>{getUKFormatDate(openMembersCustomModal?.createdAt)}</p>
              </div>{" "}
              <div className="members-modal-copy-button">
                {" "}
                <button
                  className={clipboard.copied ? "members-code-copied" : ""}
                  onClick={handleUsersDataCopy}
                >
                  <img src={copyIcon} alt="copy icon" />
                  {clipboard.copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <div className="separator"></div>

            <div>
              <div className="members-custom-modal-form">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  readOnly
                  value={openMembersCustomModal?.email}
                />
                <label htmlFor="role">Phone Number</label>
                <input
                  id="role"
                  type="text"
                  readOnly
                  value={openMembersCustomModal?.phoneNumber || "Empty Number"}
                />
                <label htmlFor="role">Country</label>
                <div className="">
                  <p>
                    <img
                      src={getCountryFlagUrl(openMembersCustomModal?.country)}
                      style={{ width: "20px", marginRight: "8px" }}
                    />
                    {openMembersCustomModal?.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};
export default MembersCustomModal;
