/* eslint-disable react/prop-types */
import "./MemberCard.css";
import getCountryFlagUrl from "../../Utils/getCountryFlagUrl";
import { getUKFormatDate } from "../../Utils/variables/formattedDates";

const MemberCard = ({ item, setOpenMembersCustomModal }) => {
  return (
    <div
      className="member-card"
      key={item?._id}
      onClick={() => setOpenMembersCustomModal(item)}
    >
      <div
        style={{
          background: item?.photoURL ? `url(${item?.photoURL})` : "blue",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="member-card-profile"
      >
        <h1>{!item?.photoURL ? item?.name[0].toUpperCase() : ""}</h1>
      </div>
      <div className="member-card-title">
        {" "}
        <h4>{item?.name}</h4>
        <p>Joined: {getUKFormatDate(item?.createdAt)}</p>
        <hr />
      </div>
      <div className="member-card-country">
        <p>
          <img
            src={getCountryFlagUrl(item?.country)}
            style={{ width: "20px", marginRight: "8px" }}
          />
          {item?.country}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
