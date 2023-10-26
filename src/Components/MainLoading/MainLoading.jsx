import { Spin } from "antd";
import "./MainLoading.css";

const MainLoading = () => {
  return (
    <div className="main-loading-main-container">
      <Spin style={{ fontSize: "150%" }} />
    </div>
  );
};

export default MainLoading;
