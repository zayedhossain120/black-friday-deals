import "./GlobalSearchMembersSection.css";
// import { Empty } from "antd";
import React from "react";
import GlobalMembersRow from "./GlobalMemberRow/GlobalMemberRow";
import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
const GlobalSearchMembersSection = ({ checkedItems, data: usersData }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {checkedItems.find((item) => item === "members") &&
        usersData?.data?.length && (
          <section
            className="global-search-members-section-container"
            onClick={() => navigate("/members")}
          >
            <p>Members</p>
            <div className="global-search-members-container">
              {usersData?.data?.length &&
                usersData?.data?.map((user) => {
                  return <GlobalMembersRow key={user?._id} user={user} />;
                })}
            </div>
          </section>
        )}
    </React.Fragment>
  );
};

export default GlobalSearchMembersSection;
