/* eslint-disable react/prop-types */
// import React from 'react';
import "./WhatsappModal.css";
import remove from "../../../assets/Icons/remove.svg";
import Whatsapp from "../../../assets/Icons/whatsapp.svg";
import stroke from "../../../assets/Icons/stroke.svg";
import getToken from "../../../Utils/getToken";
import apiUrl from "../../../Utils/variables/apiUrl";
import axios from "axios";
import { toast } from "react-toastify";
import useFetch from "../../../CustomHooks/useFetch";

const WhatsappModal = ({ isVisible, onClose }) => {
  const { data: contact } = useFetch("contact");

  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = e.target.contactNo.value;
    console.log(number);
    {
      const accessToken = getToken();
      const { data } = await axios.post(
        `${apiUrl}/contact/add`,
        {
          contact: {
            contactNo: number,
          },
        },
        {
          headers: {
            authorization: `bearer ${accessToken}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Number added successfully");
      } else {
        toast.error("Number not added");
      }
      onClose();
    }
  };

  return (
    <div className="whatsapp-modal-main-container" onClick={() => onClose()}>
      <div
        className="whatsapp-modal-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="whatsapp-modal-content-container">
          <div className="whatsapp-modal-header" onClick={() => onClose()}>
            <img src={remove} alt="" />
          </div>
          <div className="whatsapp-modal-icon">
            <img src={Whatsapp} alt="" />
          </div>
          <div className="whatsapp-modal-main">
            <div className="whatsapp-modal-main-input">
              <form onSubmit={handleSubmit}>
                <label htmlFor="contactNo">Add whatsapp number</label>
                <input
                  className="Whatsapp-modal-input"
                  type="number"
                  name="contactNo"
                  placeholder="+880"
                  maxLength={10}
                />
                <div className="whatsapp-modal-main-warning">
                  <img src={stroke} alt="" />
                  <p className="whatsapp-modal-main-warning-text">
                    This number will placed to user app navigation whatsapp. Our
                    user will contact by this number
                  </p>
                </div>
                <div className="whatsapp-modal-footer">
                  <button type="submit">Save</button>
                </div>
                <div className="whatsapp-current-contact">
                  <p>Current No: {contact?.data?.contact?.contactNo}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappModal;
