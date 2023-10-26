/* eslint-disable react/prop-types */
import "./GlobalSearch.css";
import { Alert } from "antd";
import { useLayoutEffect, useState } from "react";
import GlobalSearchPostSection from "./GlobalSearchPostSection/GlobalSearchPostSection";
import GlobalSearchStoreSection from "./GlobalSearchStoreSection/GlobalSearchStoreSection";
import GlobalSearchTopSection from "./GlobalSearchTopSection/GlobalSearchTopSection";
import useGlobalSearch from "../../CustomHooks/useGlobalSearch";
import GlobalSearchAdministratorsSection from "./GlobalSearchAdministratorsSection/GlobalSearchAdministratorsSection";
import GlobalSearchMembersSection from "./GlobalSearchMembersSection/GlobalSearchMembersSection";
import PostNotExist from "./GlobalSearchPostSection/PostNotExist/PostNotExist";

const GlobalSearch = ({ setIsGlobalSearchOpen }) => {
  const [isThreeSectionActive, setIsThreeSectionActive] = useState(false);

  const {
    data,
    error,
    searchKey,
    setSearchKey,
    checkedItems,
    setCheckedItems,
    searchOnPostOrUser,
    setSearchOnPostOrUser,
  } = useGlobalSearch();

  // close modal when Escape button clicked
  const closeGlobalSearchModalOnEscapButton = (e) => {
    if (e.key === "Escape") {
      setIsGlobalSearchOpen(false);
    }
  };
  // three leyar or two
  useLayoutEffect(() => {
    if (searchOnPostOrUser === "Post") {
      if (
        data?.data &&
        checkedItems.find((item) => item === "stores") &&
        checkedItems.find((item) => item === "coupons" || item === "deals")
      ) {
        setIsThreeSectionActive(true);
      } else {
        setIsThreeSectionActive(false);
      }
    } else if (searchOnPostOrUser === "User") {
      if (
        checkedItems.find((item) => item === "members") &&
        checkedItems.find((item) => item === "administrators")
      ) {
        setIsThreeSectionActive(true);
      } else {
        setIsThreeSectionActive(false);
      }
    }
  }, [checkedItems, data?.data, searchOnPostOrUser]);
  // check render post and store or empty
  const isStoreAndPostNotExist =
    !data?.data?.stores?.data?.length && !data?.data?.posts?.data?.length;
  // check render administrator and member or empty
  const isAdministratorsAndUsersNotExist =
    !data?.administratorsData?.data?.length && !data?.usersData?.data?.length;
  return (
    <div
      className="global-search-main-container"
      onClick={() => setIsGlobalSearchOpen(false)}
    >
      <div
        onKeyDown={closeGlobalSearchModalOnEscapButton}
        className={`global-search-content-container ${
          isThreeSectionActive
            ? "global-search-display-three-section"
            : "global-search-display-two-section"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* search and filter top section */}
        <GlobalSearchTopSection
          setIsGlobalSearchOpen={setIsGlobalSearchOpen}
          setSearchKey={setSearchKey}
          searchOnPostOrUser={searchOnPostOrUser}
          setSearchOnPostOrUser={setSearchOnPostOrUser}
          setCheckedItems={setCheckedItems}
          checkedItems={checkedItems}
        />
        {/* if error occurs */}
        {error && (
          <Alert
            message={error?.message}
            showIcon
            description={error?.response?.data?.message}
            type="error"
            style={{ width: "80%", margin: "10px auto" }}
          />
        )}
        {/* if there is no search */}
        {searchKey && (
          <>
            {/* if nothing to show */}
            {isStoreAndPostNotExist && isAdministratorsAndUsersNotExist ? (
              <PostNotExist />
            ) : (
              <>
                {/* all post contents */}
                {searchOnPostOrUser === "Post" && data?.data && !error && (
                  <>
                    {/* stores ==========*/}
                    <GlobalSearchStoreSection
                      checkedItems={checkedItems}
                      data={data}
                      setIsGlobalSearchOpen={setIsGlobalSearchOpen}
                    />
                    {/* Posts ==========*/}
                    <GlobalSearchPostSection
                      checkedItems={checkedItems}
                      data={data}
                      setIsGlobalSearchOpen={setIsGlobalSearchOpen}
                    />
                  </>
                )}

                {/* all user contents */}
                {searchOnPostOrUser === "User" && data && !error && (
                  <>
                    {/* stores ==========*/}
                    <GlobalSearchAdministratorsSection
                      checkedItems={checkedItems}
                      data={data?.administratorsData}
                    />
                    {/* Posts ==========*/}
                    <GlobalSearchMembersSection
                      checkedItems={checkedItems}
                      data={data?.usersData}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
