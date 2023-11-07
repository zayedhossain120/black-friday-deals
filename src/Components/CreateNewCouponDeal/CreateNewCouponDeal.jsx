/* eslint-disable react/prop-types */
import "./CreateNewCouponDeal.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, TrademarkOutlined } from "@ant-design/icons";

const CreateNewCouponDeal = ({
  openCreateNewCouponDeal,
  setOpenCreateNewCouponDeal,
}) => {
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpenCreateNewCouponDeal(false);
  };

  return (
    <Modal
      className="antd-modal-of-brand-store"
      centered
      open={openCreateNewCouponDeal}
      onCancel={handleCancel}
    >
      <div className="create-store-brand-modal-container">
        <div className="create-modal-title">
          <h2>Create new Coupon or Deal</h2>
          <p>Select Coupon or Deal what you want to create</p>
        </div>

        <div className="create-store-brand-button">
          <button
            className="store-modal-button"
            onClick={() => navigate("/post/create")}
          >
            <HomeOutlined />
            Coupon
          </button>
          <button
            className="brand-modal-button"
            onClick={() => navigate("/brands/create/productdeal")}
          >
            <TrademarkOutlined />
            Deal
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default CreateNewCouponDeal;
