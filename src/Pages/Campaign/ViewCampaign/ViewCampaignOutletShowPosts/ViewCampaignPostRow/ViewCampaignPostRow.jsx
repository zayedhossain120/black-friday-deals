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



const ViewCampaignPostRow = ({
    post,
    setOpenPostViewModal,
    setOpenDeletePostModal,
    setSelectMultipleItem,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const { fetchPostById } = usePostFetch();

    const handleOpenPostViewModalWithApiData = async (postId) => {
        const { data, isLoading, error } = await fetchPostById(postId);
        if (isLoading) {
          setIsLoading(true);
        } else {
          setOpenPostViewModal({ data, error });
        }
      };

      const handleMultipleSelectItem = (e) => {
        e.stopPropagation();
        const postId = post?._id;
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
      onClick={() => handleOpenPostViewModalWithApiData(post?._id)}
    >
      {/* title Store name and photo section */}
      <div className="table-data">
        <div className="post-title-photo-container">
          <input
            type="checkbox"
            name={post?._id}
            id={post?._id}
            onClick={(e) => handleMultipleSelectItem(e)}
          />
          <img
            src={post?.store?.photoURL || placeholder}
            alt={post?.postTitle?.slice(0, 5)}
            height={50}
            width={50}
            loading="lazy"
          />
          <div className="title-name-container">
            <h4>
              {post?.postTitle}
              {post?.isVerified && (
                <img src={verifiedChecked} alt="verified icon" />
              )}
            </h4>
            <p>
              {post?.store?.storeName}{" "}
              {post?.postType === "deal" && (
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
              {post?.store?.storeName}{" "}
              {post?.postType === "deal" && (
                <small className="tooltip">Deal</small>
              )}
            </p>
      </div>

      {/* validity section */}
      <div className="table-data">
      <Tooltip placement="bottom" className=' available-countries' title={
      <div>
          {
            post?.country?.map((country) => (
              <div style={{display: "flex", justifyContent: "space-between", gap: "5px"}}
              key={country}
              >
              <img src={flags.find((flag) => flag.countryName === country).flagUrl} alt="" />
              
               <p>{ post?.country?.map(c => `${c}`)}</p>
              
              </div>
            ))
          }
        </div>} >
      <img src={flag} alt="flag" />
            <p>{post?.country?.length} countries</p>
            <img src={appearance} alt='appearance' />
        </Tooltip>
        
      </div>
      {/* modifier buttons section */}
      <div className="table-data expire-time">
      {getExpireInAtDays(post?.expireDate) < 1 ? (
          "Expired"
        ) : (
          <span>
            End in <strong>{getExpireInAtDays(post?.expireDate)}</strong> days
          </span>
        )}
        {post?.postType === "deal" && (
          <small className="tooltip display-only-on-mobile">Deal</small>
        )}


      <div className='table-data modifier-buttons-container'>
      <img src={viewEye} alt="view icon" />
        <span>{post?.revealed}</span>
      </div>
      </div>

       {/* flags section */}
       <div className="table-data">
        <div className="country-flags">
          {post?.country?.map((country) => (

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