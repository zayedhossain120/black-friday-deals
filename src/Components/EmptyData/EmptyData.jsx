import "./EmptyData.css";
import { Empty } from "antd";

const EmptyData = () => {
  return (
    <div className="no-data-found-container">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
};

export default EmptyData;
