/* eslint-disable react/prop-types */
// FilterBar.js
import "./FilterBar.css";
import { Select } from "antd";
import useFetch from "../../../CustomHooks/useFetch";
import { useLayoutEffect, useState } from "react";
import { postTypes } from "../../../Utils/variables/postTypes";
import { short } from "../FilterBar/ShortApi/ShortApi";
const { Option } = Select;

const FilterBar = ({
  setSelectedStore,
  setSelectedType,
  setSorting,
  setSelectedDateRange,
}) => {
  const { data: storeData } = useFetch("store");
  const [allStores, setAllStores] = useState([]);

  useLayoutEffect(() => {
    const stores = storeData?.data;
    stores && setAllStores([{ storeName: "All Store" }, ...stores]);
  }, [storeData]);

  const handleChange = (value) => {
    setSelectedStore(value !== "All Store" ? value : "");
  };
  const handleType = (value) => {
    setSelectedType(value !== "Type" ? value : "");
  };
  const handleSort = (value) => {
    switch (value) {
      case "highclick":
        setSorting({ sortBy: "revealed", sortOrder: "-1" });
        break;
      case "lowclick":
        setSorting({ sortBy: "revealed", sortOrder: "1" });
        break;
      case "oldestadded":
        setSorting({ sortBy: "createdAt", sortOrder: "1" });
        break;

      default:
        setSorting({ sortBy: "createdAt", sortOrder: "-1" });
        break;
    }
  };

  const handleDateRange = (value) => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    setSelectedDateRange(
      value === "Last Month"
        ? `createdAt[gte]=${lastMonth}`
        : value === "6 Months"
        ? `createdAt[gte]=${sixMonthsAgo}`
        : value === "Last Year"
        ? `createdAt[gte]=${lastYear}`
        : ""
    );
  };

  return (
    <main className="dashboard-filter-container">
      <div className="dashboard-filter-flex-container">
        <span className="dashboard-filter">Filter</span>
        <Select
          defaultValue="Store"
          className="filterbar-control"
          style={{
            width: 120,
            margin: "auto 20px auto auto",
          }}
          onChange={handleChange}
          options={allStores?.map((store) => ({
            value: store?.storeName,
            label: (
              <div className="store-filter-drowon-container">
                {store?.photoURL && (
                  <div className="store-filter-drowon-img">
                    <img
                      src={store?.photoURL}
                      alt={store?.storeData}
                      height={15}
                      width={20}
                    />
                  </div>
                )}
                {store?.storeName}
              </div>
            ),
          }))}
        />

        <Select
          defaultValue={"Sort"}
          style={{
            width: 120,
            margin: "auto 20px auto auto",
          }}
          onChange={handleSort}
          options={short?.map((type) => ({
            value: type?.value,
            label: type?.label,
          }))}
        />

        <Select
          defaultValue="Date"
          style={{
            width: 120,
            margin: "auto 20px auto auto",
          }}
          onChange={handleDateRange}
        >
          <Option value="Last Month">Last Month</Option>
          <Option value="6 Months">Last 6 Months</Option>
          <Option value="Last Year">Last Year</Option>
          <Option value="Lifetime">Life time</Option>
        </Select>
        <Select
          defaultValue={"Type"}
          style={{
            width: 120,
            margin: "auto 20px auto auto",
          }}
          onChange={handleType}
          options={postTypes?.map((type) => ({
            value: type?.value,
            label: type?.label,
          }))}
        />
      </div>
    </main>
  );
};

export default FilterBar;
