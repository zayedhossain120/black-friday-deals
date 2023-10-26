import "./CarouselNavFilter.css";
import { Select } from "antd";

const CarouselNavFilter = () => {
  const { Option } = Select;
  return (
    <div className="carouselFilter">
      <p>Filter</p>
      <Select
        defaultValue="Date"
        style={{
          width: "120px",
          margin: "auto 20px auto auto",
        }}
        // onChange={handleDateRange}
      >
        <Option value="Last Month">Last Month</Option>
        <Option value="6 Months">Last 6 Months</Option>
        <Option value="Last Year">Last Year</Option>
        <Option value="Lifetime">Lifetime</Option>
      </Select>
    </div>
  );
};

export default CarouselNavFilter;
