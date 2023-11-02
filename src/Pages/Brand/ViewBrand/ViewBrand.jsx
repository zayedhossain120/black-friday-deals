import "./ViewBrand.css";
import { Outlet } from "react-router-dom";
import TopBar from "../../../Components/TopBar/TopBar";
import ViewBrandDetails from "./ViewBrandDetails/ViewBrandDetails";
import ViewBrandInnerNav from "./ViewBrandInnerNav/ViewBrandInnerNav";

const ViewBrand = () => {
  return (
    <div className="view-store-main-container">
      <TopBar pageTitle={"View Brand"} />

      <div className="view-store-container">
        <ViewBrandDetails />
        <section className="view-store-outlet-and-nav-container">
          <ViewBrandInnerNav />
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ViewBrand;
