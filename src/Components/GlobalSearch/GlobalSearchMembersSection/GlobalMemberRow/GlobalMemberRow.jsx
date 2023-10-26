/* eslint-disable react/prop-types */
import "./GlobalMemberRow.css";
import placeholder from "../../../../assets/placeholder.svg";
import googleLogo from "../../../../assets/googleLogo.png";
import viewEye from "../../../../assets/Icons/viewEye.svg";
import flags from "../../../../Utils/variables/flags";
import { getUKFormatDate } from "../../../../Utils/variables/formattedDates";
import messageIcon from "../../../../assets/Icons/messageIcon.svg";

const GlobalMembersRow = ({ user }) => {
  return (
    <div className="global-search-member-row">
      <div className="global-search-member-title-and-photo-container">
        <img
          src={user?.photoURL || placeholder}
          alt={user?.memberTitle?.slice(0, 5)}
          loading="lazy"
          height={50}
          width={50}
        />
        <div className="name-joining-date-container">
          <h4>
            {user?.name}
            {user?.provider?.name === "Google" && (
              <img src={googleLogo} alt="verified icon" />
            )}
          </h4>
          <div>
            <small className="joining-time">{`Joined ${getUKFormatDate(
              user?.createdAt
            )}`}</small>
          </div>
        </div>
      </div>
      <div className="email-container">
        <img src={messageIcon} alt="mail icon" />
        <span>{user?.email}</span>
      </div>
      <div className="country-flags">
        <img
          src={
            flags.find((flag) => flag.countryName === user?.country)?.flagUrl
          }
          alt="country"
          title={user?.country}
        />
      </div>

      <div className="global-search-member-viewed-container">
        <img src={viewEye} alt="view icon" height={20} width={20} />
        <span>{user?.revealed}</span>
      </div>
    </div>
  );
};

export default GlobalMembersRow;
