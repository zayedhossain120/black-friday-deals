import DashboardIcon from "../../../src/Components/IconsComponents/dashboardIcon/DashboardIcon.jsx";
import StoreIcon from "../../../src/Components/IconsComponents/dashboardIcon/StoreIcon";
import PostIcon from "../../../src/Components/IconsComponents/dashboardIcon/PostIcon";
import CarouselIcon from "../../../src/Components/IconsComponents/dashboardIcon/CarouselIcon";
import MembersIcon from "../../../src/Components/IconsComponents/dashboardIcon/MemberIcon";
import AdministratorIcon from "../../Components/IconsComponents/dashboardIcon/AdministratorIcon.jsx";

export const menus = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    link: "/",
  },
  {
    label: "Retailer",
    icon: StoreIcon,
    link: "/store",
  },
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
    icon: MembersIcon,
    link: "/members",
  },
  {
    label: "Administrators",
    icon: AdministratorIcon,
    link: "/administrators",
  },
];
