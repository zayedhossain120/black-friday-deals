import React from 'react';
import './EditCampaignButton.css';
import campaignEditIcon from '../../assets/Icons/campaignEditIcon.svg';

const EditCampaignButton = () => {
    return (
        <button className='edit-campaign-button'>
            <img src={campaignEditIcon} alt="" />
           Edit Campaign
        </button>
    );
};

export default EditCampaignButton;