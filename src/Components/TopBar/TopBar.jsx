/* eslint-disable react/prop-types */
import "./TopBar.css";
import { Input, Select } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import flags from "../../Utils/variables/flags";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SelectedCountryContext } from "../../Contexts/CountryContext/CountryProviderContext";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import TopBarAddBtnModal from "./TopBarAddBtnModal/TopBarAddBtnModal";

// global country selection

const TopBar = ({
  navigateTo,
  pageTitle,
  openAddNewNetworkModal,
  openAddNewCategorykModal,
}) => {
  const countryContext = useContext(SelectedCountryContext);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const allCountries = [
    { countryName: "", shortForm: "All countries", flagUrl: "" },
    ...flags,
  ];
  const handleChange = (value) => {
    countryContext?.setSelectedCountry(value);
  };
  const handleAddNewButtonClick = () => {
    if (navigateTo) {
      return navigate(navigateTo);
    } else if (openAddNewNetworkModal) {
      openAddNewNetworkModal(true);
    } else if (openAddNewCategorykModal) {
      openAddNewCategorykModal(true);
    } else {
      return setOpenDropdown(!openDropdown);
    }
  };
  // open global search when q button clicked
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key === "q") {
      setIsGlobalSearchOpen(true);
    }
  });
  return (
    <div className="top-bar-container">
      <h4>{pageTitle}</h4>
      <Input
        onFocus={() => setIsGlobalSearchOpen(true)}
        placeholder="Search"
        prefix={<SearchOutlined style={{ opacity: ".3" }} />}
      />
      <div className="post-add-country-filter-container">
        <Select
          defaultValue={countryContext.selectedCountry}
          style={{
            width: "120px",
          }}
          onChange={handleChange}
          options={allCountries?.map((flag) => ({
            value: flag?.countryName,
            label: (
              <div>
                {flag?.flagUrl && (
                  <img
                    src={flag?.flagUrl}
                    alt={flag?.countryName}
                    height={12}
                    width={20}
                  />
                )}{" "}
                {flag?.shortForm}
              </div>
            ),
          }))}
        />
        {/* add new store or post button */}
        <div className="add-new-post-button" onClick={handleAddNewButtonClick}>
          <PlusOutlined style={{ color: "white", fontSize: "20px" }} />
        </div>
      </div>
      {/* buttons dropdown modal */}
      {openDropdown && <TopBarAddBtnModal setOpenDropdown={setOpenDropdown} />}
      {/* Global search Modal */}
      {isGlobalSearchOpen && (
        <GlobalSearch setIsGlobalSearchOpen={setIsGlobalSearchOpen} />
      )}
    </div>
  );
};

export default TopBar;
