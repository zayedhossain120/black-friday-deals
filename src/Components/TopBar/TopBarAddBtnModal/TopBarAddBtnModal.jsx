/* eslint-disable react/prop-types */
import "./TopBarAddBtnModal.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, PictureOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateNewStoreOrBrandModal from "../../CreateNewStoreOrBrandModal/CreateNewStoreOrBrandModal";
import CreateNewCouponDeal from "../../CreateNewCouponDeal/CreateNewCouponDeal";

const TopBarAddBtnModal = ({ setOpenDropdown }) => {
  const navigate = useNavigate();
  const [openCreateNewStoreOrBrandModal, setOpenCreateNewStoreOrBrandModal] =
    useState(false);
  const [openCreateNewCouponDeal, setOpenCreateNewCouponDeal] = useState(false);
  return (
    <div
      onClick={() => setOpenDropdown(false)}
      className="add-new-store-post-dropdown-mask"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="add-new-store-post-dropdown"
      >
        <Button
          onClick={() => setOpenCreateNewStoreOrBrandModal(true)}
          style={{
            fontSize: "clamp(16px,3vw,18px)",
            width: "100%",
            height: "fit-content",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <ShoppingCartOutlined /> Create Store & Brand
        </Button>

        <Button
          onClick={() => setOpenCreateNewCouponDeal(true)}
          style={{
            fontSize: "clamp(16px,3vw,18px)",
            width: "100%",
            height: "fit-content",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <PictureOutlined /> Create Deal & Voucher
        </Button>

        {openCreateNewStoreOrBrandModal && (
          <CreateNewStoreOrBrandModal
            openCreateNewStoreOrBrandModal={openCreateNewStoreOrBrandModal}
            setOpenCreateNewStoreOrBrandModal={
              setOpenCreateNewStoreOrBrandModal
            }
          />
        )}

        {openCreateNewCouponDeal && (
          <CreateNewCouponDeal
            openCreateNewCouponDeal={openCreateNewCouponDeal}
            setOpenCreateNewCouponDeal={setOpenCreateNewCouponDeal}
          />
        )}
      </div>
    </div>
  );
};

export default TopBarAddBtnModal;
