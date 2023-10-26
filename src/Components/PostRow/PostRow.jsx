/* eslint-disable react/prop-types */
import "./PostRow.css";
import usePostFetch from "../../CustomHooks/usePostFetch";
import flags from "../../Utils/variables/flags";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import viewEye from "../../assets/Icons/viewEye.svg";
import verifiedChecked from "../../assets/Icons/verifiedChecked.svg";
import placeholder from "../../assets/placeholder.svg";
import { useState } from "react";
import { getExpireInAtDays } from "../../Utils/variables/formattedDates";
import { useNavigate } from "react-router-dom";

const PostRow = ({
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
  // console.log("this is Post", post);

  return (
    <div
      className="table-row"
      onClick={() => handleOpenPostViewModalWithApiData(post?._id)}
    >
      {/* title Store name and photo section */}
      <div className="table-data">
        <div className="post-title-photo-container ">
          <input
            type="checkbox"
            name={post?._id}
            id={post?._id}
            onClick={(e) => handleMultipleSelectItem(e)}
          />
          <img
            src={post?.store?.photoURL || placeholder}
            alt={post?.postTitle?.slice(0, 5)}
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
      <div className="table-data modifier-buttons-container">
        <img src={viewEye} alt="view icon" />
        <span>{post?.revealed}</span>
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
    </div>
  );
};

export default PostRow;
