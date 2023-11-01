/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, PictureOutlined } from "@ant-design/icons";

const TopBarAddBtnModal = ({ setOpenDropdown }) => {
  const navigate = useNavigate();
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
          onClick={() => navigate("/store/create")}
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
          onClick={() => navigate("/post/create")}
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
      </div>
    </div>
  );
};

export default TopBarAddBtnModal;
