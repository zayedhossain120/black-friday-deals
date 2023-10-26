// Dashboard.js
import "./Dashboard.css";
import TopBar from "../../Components/TopBar/TopBar";
import { useState } from "react";
import FilterBar from "./FilterBar/FilterBar";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";

const Dashboard = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [sorting, setSorting] = useState({
    sortBy: "createdAt",
    sortOrder: -1,
  });

  return (
    <main>
      <TopBar pageTitle="Dashboard" />
      <div className="dashboard-main-container-filter">
        <FilterBar
          setSelectedType={setSelectedType}
          setSelectedStore={setSelectedStore}
          setSelectedDateRange={setSelectedDateRange}
          setSorting={setSorting}
        />
      </div>
      <DashboardCard
        selectedStore={selectedStore}
        selectedType={selectedType}
        selectedDateRange={selectedDateRange}
        sorting={sorting}
      />
    </main>
  );
};

export default Dashboard;
