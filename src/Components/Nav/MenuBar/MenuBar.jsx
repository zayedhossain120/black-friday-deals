import "./MenuBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../../../firebase.init";
import { useState } from "react";
import WhatsappModal from "../../../Pages/Whatsapp/WhatsppModal/WhatsappModal";
import logoIcon from "../../../assets/Icons/logoIcon.svg";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FolderOutlined,
  GlobalOutlined,
  ShoppingCartOutlined,
  ShoppingFilled,
  TrademarkOutlined,
  WhatsAppOutlined,
  LoginOutlined,
  MailOutlined,
  SlidersOutlined,
  NotificationOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from "@ant-design/icons";

const MenuBar = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    localStorage.setItem("accessToken", "");
    navigate("/login");
  };

  const styleDemo = {
    // width: 200,
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: 400,
    color: "#a6abc8",
    gap: '12px'
  };
  return (
    <div className="menu-bar-container">
      <div className="menu-bar">
        <div className="logo">
          <img src={logoIcon} alt="" />
        </div>
        <div className="all-menu-container">
          <div className="main-menu-container">
            <p>Menu</p>
            <Menu
              className="custom-menu-item"
              style={styleDemo}
              onClick={({ key }) => {
                if (key) {
                  navigate(key);
                }
              }}
              mode="inline"
              items={[
                {
                  label: "Dashboard",
                  icon: (
                    <DashboardOutlined
                      style={{
                        color: "grey",
                        fontWeight: "bold",
                        fill: "none",
                      }}
                    />
                  ),
                  link: "/",
                  key: "/",
                },
                {
                  label: "Retailer",
                  icon: (
                    <ShoppingCartOutlined
                      style={{
                        color: "grey",
                        fontWeight: "bold",
                        fill: "none",
                      }}
                    />
                  ),
                  link: "/store",
                  key: "/store",
                  children: [
                    {
                      label: "Online Store",
                      icon: <ShoppingFilled />,
                      link: "/store",
                      key: "/store",
                    },
                    {
                      label: "Brand",
                      icon: <TrademarkOutlined />,
                      link: "/brands",
                      key: "/brands",
                    },
                    {
                      label: "Category",
                      icon: <FolderOutlined />,
                      link: "/retailer/category",
                      key: "/retailer/category",
                    },
                    {
                      label: "Network",
                      icon: <GlobalOutlined />,
                      link: "/retailer/network",
                      key: "/retailer/network",
                    },
                  ],
                },
                {
                  label: "Post",
                  icon: <MailOutlined />,
                  link: "/post",
                  key: "/post"
                },
                
                {
                  label: "Carousel",
                  icon: <SlidersOutlined />,
                  link: "/carousel",
                  key: "/carousel"
                },
                
                {
                  label: "Campaign",
                  icon: <NotificationOutlined />,
                  link: "/campaign",
                  key: "/campaign"
                },
                
                {
                  label: "Members",
                  icon: <UsergroupAddOutlined />,
                  link: "/members",
                  key: "/members"
                },
                {
                  label: "Administrators",
                  icon: <UserOutlined />,
                  link: "/administrators",
                  key: "/administrators"
                },
              
                
              ]}
            ></Menu>
            {/* {menus.map((menu) => (
              <NavLink
                key={menu.label}
                to={menu.link}
                className={({ isActive, isPending }) =>
                  isPending
                    ? " pending menu"
                    : isActive
                    ? " active menu"
                    : " menu "
                }
              >
                <menu.icon />

                {menu.label}
              </NavLink>
            ))} */}
            {/* Whatsapp button */}
            <NavLink>
              <span onClick={() => setShowWhatsapp(true)} className="menu">
                <WhatsAppOutlined />
                Whatsapp
              </span>
            </NavLink>
            <WhatsappModal
              isVisible={showWhatsapp}
              onClose={() => setShowWhatsapp(false)}
            />
          </div>
          <span onClick={handleLogout} className="menu">
            <LoginOutlined />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
