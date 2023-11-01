import { Modal } from 'antd';
import modalDelete from "../../assets/Icons/modalDelete.svg";
import React from 'react';
import "./CampaignDeleteModal.css";
import getToken from '../../Utils/getToken';
import axios from 'axios';
import apiUrl from '../../Utils/variables/apiUrl';
import { toast } from 'react-toastify';


const CampaignDeleteModal = ({
    openCampaignDeleteModal,
    setOpenCampaignDeleteModal,
    refetch

}) => {

    const handleCancel = () => {
        setOpenCampaignDeleteModal(false);
    }

    const handleDelete = async() => {
        const accessToken = getToken();

        try{
            const {data} = await axios.delete(
                `${apiUrl}/store/${openCampaignDeleteModal._id}`,
                {
                    headers: {
                        Authorization: `bearer ${accessToken}`,
                    },

                }
            );
            if(data?.status === "success") {
                toast.success("Campaign Deleted Successfully")
            }
            else{
                toast.error("Store Not Deleted");

            }
            setOpenCampaignDeleteModal(false);
        }
        
        catch(error) {
            console.error("Error! Deleting Store", error)
            toast.error("Why are you deleting This store? There are lot of offer here.")
        }

        refetch();
        setOpenCampaignDeleteModal(false)


    };
    return (
        <Modal centered open={openCampaignDeleteModal} onCancel={handleCancel}>
      <div className="campaign-delete-modal-container">
        <img src={modalDelete} alt="delete icon" />
        <p>
          Are you sure you want to delete{" "}
          <strong>{openCampaignDeleteModal?.storeName}</strong>
        </p>
        <div className="campaign-delete-modal-btn">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Yes</button>
        </div>
      </div>
    </Modal>
    );
};

export default CampaignDeleteModal;