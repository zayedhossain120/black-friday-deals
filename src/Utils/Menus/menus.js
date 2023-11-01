import PostIcon from "../../Components/IconsComponents/dashboardIcon/PostIcon";
import CarouselIcon from "../../Components/IconsComponents/dashboardIcon/CarouselIcon";
// import MembersIcon from "../../Components/IconsComponents/dashboardIcon/MemberIcon";
import AdministratorIcon from "../../Components/IconsComponents/dashboardIcon/AdministratorIcon.jsx";
// import {
//   DashboardOutlined,
//   ShoppingCartOutlined,
//   ShoppingFilled,
//   TrademarkCircleTwoTone,
//   FolderOutlined,
//   GlobalOutlined,
//   MailOutlined,
//   SlidersOutlined,
//   NotificationOutlined,
//   TeamOutlined,
//   WhatsAppOutlined,
//   UserSwitchOutlined,

//   } from '@ant-design/icons';
export const menus = [
  {
    label: "Post",
    icon: PostIcon,
    link: "/post/",
  },
  {
    label: "Carousel",
    icon: CarouselIcon,
    link: "/carousel",
  },
  {
    label: "Members",
    icon: CarouselIcon,
    link: "/members",
  },
  {
    label: "Administrators",
    icon: AdministratorIcon,
    link: "/administrators",
  },
];
