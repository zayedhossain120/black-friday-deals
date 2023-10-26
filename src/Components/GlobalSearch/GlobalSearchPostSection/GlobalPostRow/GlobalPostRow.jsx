/* eslint-disable react/prop-types */
import "./GlobalPostRow.css";
import placeholder from "../../../../assets/placeholder.svg";
import verifiedChecked from "../../../../assets/Icons/verifiedChecked.svg";
import viewEye from "../../../../assets/Icons/viewEye.svg";
import flags from "../../../../Utils/variables/flags";
import EditIcon from "../../../IconsComponents/EditIcon";
import DeleteIcon from "../../../IconsComponents/DeleteIcon";
import { getExpireInAtDays } from "../../../../Utils/variables/formattedDates";
import { useNavigate } from "react-router";
const GlobalPostRow = ({
  post,
  setOpenPostViewModal,
  setIsGlobalSearchOpen,
  setOpenDeletePostModal,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="global-search-post-row"
      onClick={() => {
        setOpenPostViewModal(post);
        setIsGlobalSearchOpen(false);
      }}
    >
      <div className="global-search-post-title-and-photo-container">
        <img
          src={post?.store?.photoURL || placeholder}
          alt={post?.postTitle?.slice(0, 5)}
          loading="lazy"
          height={50}
          width={50}
        />
        <div className="title-expire-container">
          <h4>
            {post?.postTitle}
            {post?.isVerified && (
              <img src={verifiedChecked} alt="verified icon" />
            )}
          </h4>
          <div className="expire-time small-gray">
            {getExpireInAtDays(post?.expireDate) < 1 ? (
              "Expired"
            ) : (
              <span>
                End in <strong>{getExpireInAtDays(post?.expireDate)}</strong>{" "}
                days
              </span>
            )}
            {post?.postType === "deal" && (
              <small className="tooltip display-only-on-mobile">Deal</small>
            )}
          </div>
        </div>
      </div>
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

      <div className="global-search-post-viewed-container modifier-buttons-container">
        <img src={viewEye} alt="view icon" />
        <span>{post?.revealed}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/editpost/${post?._id}`);
            setIsGlobalSearchOpen(false);
          }}
        >
          <EditIcon />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeletePostModal(post);
            setIsGlobalSearchOpen(false);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default GlobalPostRow;
