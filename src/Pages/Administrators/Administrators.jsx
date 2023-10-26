import "./Administrators.css";
import useFetch from "../../CustomHooks/useFetch";
import TopBar from "../../Components/TopBar/TopBar";
import addNewUser from "../../assets/Icons/addNewUser.svg";
import React, { useState } from "react";
import UserDeleteModal from "../../Components/UserDeleteModal/UserDeleteModal";
import UserEditCustomModal from "../../Components/UserEditCustomModal/UserEditCustomModal";
import AddNewUserCustomModal from "../../Components/AddNewUserCustomModal/AddNewUserCustomModal";
import { Spin } from "antd";
import AdministratorsCard from "../../Components/AdministratorsCard/AdministratorsCard";
import useGetMe from "../../CustomHooks/useGetMe";

const Administrators = () => {
  const { data: allUser, isLoading } = useFetch("administrators?limit=1000");

  const { data: me } = useGetMe();
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openEditeUserCustomModal, setOpenEditeUserCustomModal] =
    useState(false);
  const [openAddNewUserCustomModal, setOpenAddNewUserCustomModal] =
    useState(false);

  if (isLoading) {
    return (
      <Spin
        style={{
          marginTop: "20%",
          marginLeft: "50%",
        }}
      />
    );
  }
  const cardSections = [
    {
      title: "Active",
      criteria: (item) => item?.role !== "inactive" && item?.name,
    },
    {
      title: "Pending...",
      criteria: (item) => !item?.name,
      cardClass: "user-card-pending",
    },
    {
      title: "Inactive",
      criteria: (item) => item?.role === "inactive",
      cardClass: "user-card-inactive",
    },
  ];
  return (
    <div>
      <TopBar pageTitle="Administrators" />
      <div className="user-main-section">
        <div className="user-card-row">
          {cardSections?.map((section, i) => (
            <React.Fragment key={i}>
              <p>{section?.title}</p>
              <div className={`individual-row ${section.cardClass}`} key={i}>
                {allUser?.data?.map(
                  (item) =>
                    section.criteria(item) && (
                      <AdministratorsCard
                        key={item?._id}
                        item={item}
                        setOpenDeleteUserModal={setOpenDeleteUserModal}
                        setOpenEditeUserCustomModal={
                          setOpenEditeUserCustomModal
                        }
                        me={me}
                      />
                    )
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="user-add-new-btn">
          {me?.role !== "manager" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenAddNewUserCustomModal(true);
              }}
            >
              <img src={addNewUser} alt="" /> Add New User{" "}
            </button>
          )}
        </div>
        <UserDeleteModal
          openDeleteUserModal={openDeleteUserModal}
          setOpenDeleteUserModal={setOpenDeleteUserModal}
        />

        {openEditeUserCustomModal && (
          <UserEditCustomModal
            openEditeUserCustomModal={openEditeUserCustomModal}
            setOpenEditeUserCustomModal={setOpenEditeUserCustomModal}
            me={me}
          />
        )}
        {openAddNewUserCustomModal && (
          <AddNewUserCustomModal
            openAddNewUserCustomModal={openAddNewUserCustomModal}
            setOpenAddNewUserCustomModal={setOpenAddNewUserCustomModal}
            me={me}
          />
        )}
      </div>
    </div>
  );
};

export default Administrators;
