/* eslint-disable react/prop-types */
import "./GlobalSearchTopSection.css";

import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { Select } from "antd";
import GlobalSearchSubFilters from "./GlobalSearchSubFilters/GlobalSearchSubFilters";
import { globalSearchMainFilters } from "../../../Utils/variables/globalSearchMainFilters";
const GlobalSearchTopSection = ({
  setIsGlobalSearchOpen,
  searchOnPostOrUser,
  setSearchOnPostOrUser,
  checkedItems,
  setCheckedItems,
  setSearchKey,
}) => {
  return (
    <div className="global-search-top-section">
      <button onClick={() => setIsGlobalSearchOpen(false)}>
        <LeftOutlined
          style={{
            opacity: 0.5,
            border: "1px solid gainsboro",
            padding: "5px",
            borderRadius: "50%",
          }}
        />
      </button>
      <div className="global-input-container">
        <label htmlFor="global-search-input">
          <SearchOutlined style={{ opacity: ".3", fontSize: "18px" }} />
          <input
            type="text"
            autoFocus
            placeholder="Search"
            id="global-search-input"
            onKeyUp={(e) => setSearchKey(e.target.value)}
          />
        </label>
        <Select
          defaultValue="Post"
          style={{
            width: "90px",
            display: "flex",
            alignItems: "center",
          }}
          onChange={(value) => setSearchOnPostOrUser(value)}
          options={globalSearchMainFilters}
        />
      </div>
      {/* filter menus */}
      <div className="global-search-filters-container">
        <GlobalSearchSubFilters
          searchOnPostOrUser={searchOnPostOrUser}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
};

export default GlobalSearchTopSection;
