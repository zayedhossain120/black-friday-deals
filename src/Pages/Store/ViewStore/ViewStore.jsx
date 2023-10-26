import "./ViewStore.css";
import { Outlet } from "react-router-dom";
import TopBar from "../../../Components/TopBar/TopBar";
import ViewStoreDetails from "./ViewStoreDetails/ViewStoreDetails";
import ViewStoreInnerNav from "./ViewStoreInnerNav/ViewStoreInnerNav";

const ViewStore = () => {
  return (
    <div className="view-store-main-container">
      <TopBar pageTitle={"Viewstore"} />

      <div className="view-store-container">
        <ViewStoreDetails />
        <section className="view-store-outlet-and-nav-container">
          <ViewStoreInnerNav />
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ViewStore;
