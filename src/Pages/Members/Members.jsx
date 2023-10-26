import "./Members.css";
import useFetch from "../../CustomHooks/useFetch";
import TopBar from "../../Components/TopBar/TopBar";
import { useState } from "react";
import downloadIcon from "../../assets/Icons/downloadIcon.svg";
import MembersCustomModal from "../../Components/MembersCustomModal/MembersCustomModal";
import { Spin } from "antd";
import createExcelSheet from "../../Utils/createExcelSheet";
import MemberCard from "../../Components/MemberCard/MemberCard";

const Members = () => {
  const { data: allMembers, isLoading } = useFetch("user?limit=1000");
  const [openMembersCustomModal, setOpenMembersCustomModal] = useState(false);

  if (isLoading) {
    return (
      <Spin
        style={{
          marginLeft: "50%",
          marginTop: "20%",
        }}
      />
    );
  }

  return (
    <div>
      <TopBar pageTitle="Members" />
      <div className="members-main-section">
        <div className="members-download">
          <h3>Joined Members ({allMembers?.data?.length} Members)</h3>
          <div onClick={() => createExcelSheet(allMembers)}>
            <img src={downloadIcon} alt="Download all members" />
          </div>
        </div>
        <div className="member-card-row">
          {allMembers?.data?.map((item) => (
            <MemberCard
              key={item?._id}
              item={item}
              setOpenMembersCustomModal={setOpenMembersCustomModal}
            />
          ))}

          {openMembersCustomModal && (
            <MembersCustomModal
              openMembersCustomModal={openMembersCustomModal}
              setOpenMembersCustomModal={setOpenMembersCustomModal}
            ></MembersCustomModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;
