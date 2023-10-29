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
  const [showWhatsapp, setShowWhatsapp] = useState(false);
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


{/* <NavLink>
        <Menu
          // onClick={({ key }) => {
          //   if (key === "signout") {
          //     console.log("sign out");
          //   } else {
          //     navigate(key);
          //   }
            // if(key === true){
            //   navigate(key)
            // }
          // }}
          mode="inline"
          defaultOpenKeys={["/"]}
          items={[
            {
              label: "Dashboard",
              icon: DashboardIcon,
              link: "/",
              key: "/",
            },
            {
              label: "Retailer",
              icon: <StoreIcon></StoreIcon>,
              link: "/store",
              key: "/store",
              children: [
                {
                  label: "Online Store",
                  icon: <StepForwardFilled></StepForwardFilled>,
                  link: "/onlinestore",
                  key: "/onlinestore",
                },
                {
                  label: "Brand",
                  icon: <BranchesOutlined />,
                  link: "/brands",
                  key: "/brands",
                },
                {
                  label: "Category",
                  icon: DashboardIcon,
                  link: "/category",
                  key: "/category",
                },
              ],
            },
            {
              label: "Post",
              icon: DashboardIcon,
              link: "/post/",
            },
            {
              label: "Carousel",
              icon: DashboardIcon,
              link: "/carousel",
              key: "/carousel",
            },
            {
              label: "Members",
              icon: DashboardIcon,
              link: "/members",
              key: "/members",
            },
            {
              label: "Administrators",
              icon: DashboardIcon,
              link: "/administrators",
              key: "/administrators",
            },
          ]}
        ></Menu>
      </NavLink> */}

            {/* Whatsapp button */}
            <span onClick={() => setShowWhatsapp(true)} className="menu">
              <WhatsappIcon />
              Whatsapp
            </span>
            <WhatsappModal
              isVisible={showWhatsapp}
              onClose={() => setShowWhatsapp(false)}
            />
          </div>

          <NavLink to="/promotion" className="menu">
            <img src={promotionIcon} alt="" />
            Promotion
          </NavLink>
          <NavLink to="/onlinestore" className="menu">
            <img src={promotionIcon} alt="" />
            Online Store
          </NavLink>
          <NavLink to="/brands" className="menu">
            <img src={promotionIcon} alt="" />
            Brands
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
