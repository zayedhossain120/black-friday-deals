import React, { useState } from 'react';
import "./ViewCampaignPostRow.css";
import viewEye from "../../../../../assets/Icons/viewEye.svg";
import verifiedChecked from "../../../../../assets/Icons/verifiedChecked.svg";
import placeholder from "../../../../../assets/placeholder.svg";
import FlagIconIndicateAllFlag from "../../../../../assets/Icons/FlagIconIndicateAllFlag.svg";
import flag from '../../../../../assets/Icons/flag.svg';
import appearance from '../../../../../assets/Icons/appearance.svg';
import flags from '../../../../../Utils/variables/flags';
import { useNavigate } from 'react-router-dom';
import usePostFetch from '../../../../../CustomHooks/usePostFetch';
import { getExpireInAtDays } from '../../../../../Utils/variables/formattedDates';
import { Select, Tooltip } from 'antd';
import EditIcon from '../../../../../Components/IconsComponents/EditIcon';
import DeleteIcon from '../../../../../Components/IconsComponents/DeleteIcon';



const ViewCampaignPostRow = ({
    post,
    setOpenPostViewModal,
    setOpenDeletePostModal,
    setSelectMultipleItem,
}) => {
    const [isLoading, setIsLoading] = useState(false);
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
      const selectStyle = {
        display: 'flex',
        gap: '5px'
      }
    
      const dynamicData = flags;
    
      const items = dynamicData?.map((item) => ({
        key: item.key,
        label: (
          <div className="" style={selectStyle}>
            <img src={item.flagUrl} title={item.countryName} width={20}>
          </img>
          <p>{item.shortForm}</p>
          </div>
        ),
      }));
     
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
                src={post?.postPhotoURL || placeholder}
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
          {/* Dynamic Price and available store */}
          <div className="dynamic-price-div">
            <div className="dynamic-price-div-childOne">
              <p>$20</p>
              <del>$70</del>
            </div>
            <p className="percentage">75% OFF</p>
          </div>
          <div className="available-online-store">
            <p className="">Available On</p>
            <img
              src={post?.store?.storePhotoURL || placeholder}
              alt={post?.postTitle?.slice(0, 5)}
              height={50}
              width={50}
              loading="lazy"
            />
            {getExpireInAtDays(post?.expireDate) < 1 ? (
              "Expired"
            ) : (
              <p className="expired-item-copy">
                End in <strong>{getExpireInAtDays(post?.expireDate)}</strong> days
              </p>
            )}
          </div>
          {/* flags section */}
          <div className="table-data">
            <div className="available-country-container-parent">
              <div className="available-country-container">
                <img src={FlagIconIndicateAllFlag} alt="view-store-flag-img" />
                <Select
                  aria-readonly
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="view-campaign-available-flags"
                  defaultValue={`${post.countries.length} Countries`}
                >
                    {post?.countries?.map((country) => (
                      <Option >
                        <div className="country-option" >
                        <img
                      key={country}
                      src={flags.find((flag) => flag.countryName === country).flagUrl}
                      alt={country}
                      title={country}
                      height={16}
                
                    />
                         {flags.find((flag) => flag.countryName === country).shortForm}
                        </div>
                    </Option>
                    ))}
                </Select>
              </div>
            </div>
          </div>
          {/* validity section */}
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
          </div>
          
          {/* modifier buttons section */}
          <div className="table-data edit-and-delete-buttons modifier-buttons-container">
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
          <div className="mobile-v-flag">
            {post?.countries?.map((country) => (
              <img
                key={country}
                src={flags.find((flag) => flag.countryName === country).flagUrl}
                alt={country}
                title={country}
              />
            ))}
          </div>
        </div>
      );
};

export default ViewCampaignPostRow;