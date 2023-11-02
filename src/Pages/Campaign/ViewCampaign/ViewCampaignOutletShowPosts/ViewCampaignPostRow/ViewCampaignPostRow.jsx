import React, { useState } from 'react';
import "./ViewCampaignPostRow.css";
import viewEye from "../../../../../assets/Icons/viewEye.svg";
import verifiedChecked from "../../../../../assets/Icons/verifiedChecked.svg";
import placeholder from "../../../../../assets/placeholder.svg";
import flag from '../../../../../assets/Icons/flag.svg';
import appearance from '../../../../../assets/Icons/appearance.svg';
import flags from '../../../../../Utils/variables/flags';
import { useNavigate } from 'react-router-dom';
import usePostFetch from '../../../../../CustomHooks/usePostFetch';
import { getExpireInAtDays } from '../../../../../Utils/variables/formattedDates';
import { Tooltip } from 'antd';
import EditIcon from '../../../../../Components/IconsComponents/EditIcon';
import DeleteIcon from '../../../../../Components/IconsComponents/DeleteIcon';



const ViewCampaignPostRow = ({
    campaign,
    setOpenPostViewModal,
    setOpenDeletePostModal,
    setSelectMultipleItem,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { fetchPostById } = usePostFetch();
    const handleOpenPostViewModalWithApiData = async (postId) => {
        const { data, isLoading, error } = await fetchPostById(postId);
        console.log(data);
        if (isLoading) {
          setIsLoading(true);
        } else {
          setOpenPostViewModal({ data, error });
        }
      };
      console.log(campaign);
      const handleMultipleSelectItem = (e) => {
        e.stopPropagation();
        const postId = campaign?._id;
        if (e.target.checked) {
          setSelectMultipleItem((prev) => [...prev, postId]);
        } else {
          setSelectMultipleItem((prev) => {
            // eslint-disable-next-line no-unused-vars
            const [postId, ...rest] = prev;
            return [...rest];
          });
        }
      };
      if (isLoading) {
        return <p className="text-center">Loading...</p>;
      }
    
    return (
        <div
      className="view-campaign-table-row"
      onClick={() => handleOpenPostViewModalWithApiData(campaign?._id)}
    >
      {/* title Store name and photo section */}
      <div className="table-data">
        <div className="post-title-photo-container">
          <input
            type="checkbox"
            name={campaign?._id}
            id={campaign?._id}
            onClick={(e) => handleMultipleSelectItem(e)}
          />
          <img
            src={campaign?.data?.campaignPhotoURL || placeholder}
            alt={campaign?.postTitle?.slice(0, 5)}
            height={50}
            width={50}
            loading="lazy"
          />
          <div className="title-name-container">
            <h4>
              {campaign?.data?.campaignName}
              {campaign?.isVerified && (
                <img src={verifiedChecked} alt="verified icon" />
              )}
            </h4>
            <p>
              {campaign?.data?.storeName}{" "}
              {campaign?.postType === "deal" && (
                <small className="tooltip">Deal</small>
              )}
            </p>
          </div>
        </div>
      </div>
      
      
      {/* Price & discount section */}
      <div className='table-data price-and-discount'>
                <div>
                <div className='basic-price-and-off'>
                  <h1><span>20</span>$</h1>
                  <p>70<span>$</span></p>
                </div>
                <div className='discount'>
                  <p><span>75%</span> off</p>
                </div>
                </div>
      </div>

      {/* available on store */}
      <div className='store-logo'>
                <p>Available on</p>
                <p>
              {campaign?.store?.storeName}{" "}
              {campaign?.postType === "deal" && (
                <small className="tooltip">Deal</small>
              )}
            </p>
      </div>

      <div className='modifiers-buttons-container'>
      <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/editpost/${post?._id}`);
          }}
        >
          <EditIcon />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeletePostModal(post);
          }}
        >
          <DeleteIcon />
        </button>
      </div>

      {/* validity section */}
      <div className="table-data">
      <Tooltip placement="bottom"  className=' available-countries' title={
      <div>
          {
            campaign?.data?.countries.map((country) => (
              <div style={{display: "flex", justifyContent: "space-between", gap: "5px"}}
              key={country}
              >
              <img src={flags.find((flag) => flag.countryName === country).flagUrl} alt="" />
              
               <p>{ campaign?.data?.country?.find((c) => c.countryName === country).shortForm}</p>
              
              </div>
            ))
          }
        </div>
      } >
      <img src={flag} alt="flag" />
            <p>{campaign?.data?.countries?.length} countries</p>
            <img src={appearance} alt='appearance' />
        </Tooltip>
        
      </div>
      {/* modifier buttons section */}
      <div className="table-data expire-time">
      {getExpireInAtDays(campaign?.expireDate) < 1 ? (
          "Expired"
        ) : (
          <span>
            End in  <strong>{getExpireInAtDays(campaign?.data?.endPeriod)}</strong>  days
          </span>
        )}
        {campaign?.postType === "deal" && (
          <small className="tooltip display-only-on-mobile">Deal</small>
        )}

      <div className='table-data modifiers-buttons-container'>
      <img src={viewEye} alt="view icon" />
        <span>{campaign?.data?.__v}</span>
      </div>
      </div>

       {/* flags section */}
       <div className="table-data">
        <div className="country-flags">
          {campaign?.data?.countries?.map((country) => (

            <img
              key={country}
              src={flags.find((flag) => flag.countryName === country).flagUrl}
              alt={country}
              title={country}
            />
          ))}
        </div>
            
      </div>

    </div>
    );
};

export default ViewCampaignPostRow;