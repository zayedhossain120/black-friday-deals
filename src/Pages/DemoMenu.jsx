
import {
DashboardOutlined,
ShoppingCartOutlined,
ShoppingFilled,
TrademarkCircleTwoTone,
FolderOutlined,
GlobalOutlined,
MailOutlined,
SlidersOutlined,
NotificationOutlined,
TeamOutlined,
WhatsAppOutlined,
UserSwitchOutlined,
LoginOutlined
} from '@ant-design/icons';
import { Menu} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';





const DemoMenu = () => {
    const navigate = useNavigate()

    const styleDemo = {
        width: 230,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontSize: '16px',
        fontWeight: 500,
      };
    return (
        <div>
   <NavLink>
        <Menu
        style={styleDemo}
          onClick={({ key }) => {
            if (key === "signout") {
              console.log("sign out");
            } else {
              navigate(key);
            }
            if(key === true){
              navigate(key)
            }
          }}
          mode="inline"
          defaultOpenKeys={["/"]}
          items={[
            {
              label: "Dashboard",
              icon: <DashboardOutlined />,
              link: "/",
              key: "/",
            },
            {
              label: "Retailer",
              icon: <ShoppingCartOutlined />,
              link: "/store",
              key: "/store",
              children: [
                {
                  label: "Online Store",
                icon: <ShoppingFilled />,
                  link: "/onlinestore",
                  key: "/onlinestore",
                },
                {
                  label: "Brand",
                  icon: <TrademarkCircleTwoTone />,
                  link: "/brands",
                  key: "/brands",
                },
                {
                  label: "Category",
                  icon: <FolderOutlined />,
                  link: "/category",
                  key: "/category",
                },
                {
                  label: "Network",
                  icon: <GlobalOutlined />,
                  link: "/category",
                  key: "/category",
                },
              ],
            },
            {
              label: "Post",
              icon: <MailOutlined />,
              link: "/post/",
            },
            {
              label: "Carousel",
              icon: <SlidersOutlined />,
              link: "/carousel",
              key: "/carousel",
            },
            {
              label: "Campaign",
              icon: <NotificationOutlined></NotificationOutlined>,
              link: "/campaign",
              key: "/campaign",
            },
            {
              label: "Members",
              icon: <TeamOutlined />,
              link: "/members",
              key: "/members",
            },
            {
              label: "WhatsApp",
              icon: <WhatsAppOutlined />,
              link: "/whatsapp",
              key: "/whatsapp",
            },
            {
              label: "Administrators",
              icon: <UserSwitchOutlined />,
              link: "/administrators",
              key: "/administrators",
            },
            {
              label: "Logout",
              icon: <LoginOutlined />,
              link: "/logout",
              key: "/logout",
            },
          ]}
        ></Menu>
      </NavLink>
        </div>
    );
};

export default DemoMenu;