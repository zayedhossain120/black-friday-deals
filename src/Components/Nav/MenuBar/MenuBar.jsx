import "./MenuBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { menus } from "../../../Utils/Menus/menus";
import { signOut } from "firebase/auth";
import auth from "../../../../firebase.init";
import { useState } from "react";
import WhatsappModal from "../../../Pages/Whatsapp/WhatsppModal/WhatsappModal";
import promotionIcon from "../../../assets/Icons/promotion.png";
import LogoutIcon from "../../IconsComponents/dashboardIcon/logoutIcon";
import logoIcon from "../../../assets/Icons/logoIcon.svg";
import WhatsappIcon from "../../../../src/Components/IconsComponents/dashboardIcon/WhatsappIcon";

const MenuBar = () => {
  const [showWatsapp, setShowWhatsapp] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    localStorage.setItem("accessToken", "");
    navigate("/login");
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
            {menus.map((menu) => (
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
            ))}
            {/* Whatsapp button */}
            <span onClick={() => setShowWhatsapp(true)} className="menu">
              <WhatsappIcon />
              Whatsapp
            </span>
            <WhatsappModal
              isVisible={showWatsapp}
              onClose={() => setShowWhatsapp(false)}
            />
          </div>
          <NavLink to="/promotion" className="menu">
            <img src={promotionIcon} alt="" />
            Promotion
          </NavLink>
          <span onClick={handleLogout} className="menu">
            <LogoutIcon />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
