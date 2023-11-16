/* eslint-disable react/prop-types */
import "./ViewBrandPostRow.css";
import usePostFetch from "../../../../../CustomHooks/usePostFetch.js";
import flags from "../../../../../Utils/variables/flags.js";
import DeleteIcon from "../../../../../Components/IconsComponents/DeleteIcon.jsx";
import EditIcon from "../../../../../Components/IconsComponents/EditIcon.jsx";
import viewEye from "../../../../../assets/Icons/viewEye.svg";
import verifiedChecked from "../../../../../assets/Icons/verifiedChecked.svg";
import placeholder from "../../../../../assets/placeholder.svg";
import viewStoreFlagIcon from "../../../../../assets/Icons/view-store-flag-icon.svg";
import { useState } from "react";
import { getExpireInAtDays } from "../../../../../Utils/variables/formattedDates.js";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const ViewBrandPostRow = ({
  post,
  setOpenPostViewModal,
  setOpenDeletePostModal,
  setSelectMultipleItem,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchPostById } = usePostFetch();
  // open a post information on modal

  const handleOpenPostViewModalWithApiData = async (postId) => {
    const { data, isLoading, error } = await fetchPostById(postId);
    if (isLoading) {
      setIsLoading(true);
    } else {
      setOpenPostViewModal({ data, error });
    }
  };

  // select multiple items to delete
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
    display: "flex",
    gap: "0",
    border: "none",
    outline: "none",
  };

  const countryFlagStyle = {
    width: "20px",
    // height: "100%"
    height: "20px",
  };

  const items = post?.countries?.map((country) => ({
    key: country.key,
    label: (
      <div className="" style={selectStyle}>
        <img
          style={{ countryFlagStyle }}
          src={flags.find((flag) => flag.countryName === country)?.flagUrl}
          alt="Country Flag"
        />
        <p>
          {flags.find((flag) => flag.countryName === country)?.shortFormToo}
        </p>
      </div>
    ),
  }));

  return (
    <div
      className="view-store-table-row"
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
              {post?.brand?.brandName}{" "}
              {post?.postType === "Deal" && (
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
        <div onClick={(e) => e.stopPropagation()} className="country-flags">
          <div className="country-flags-child-div">
            <img src={viewStoreFlagIcon} alt="view-store-flag-img" />
            <Select
              bordered={false}
              className="country-flags-dropdown"
              // style={{dropdownSelectStyle}}
              defaultValue={`${post?.countries?.length} Countries`}
              style={selectStyle}
              options={items}
            ></Select>
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
        {post?.postType === "Deal" && (
          <small className="tooltip display-only-on-mobile">Deal</small>
        )}
      </div>
      {/* modifier buttons section */}
      <div className="table-data span-img-container">
        <img src={viewEye} alt="view icon" />
        <span>{post?.revealed}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            post?.postType === "Deal"
              ? navigate(`/post/editdeal/${post?._id}`)
              : navigate(`/post/editpost/${post?._id}`);
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

export default ViewBrandPostRow;
