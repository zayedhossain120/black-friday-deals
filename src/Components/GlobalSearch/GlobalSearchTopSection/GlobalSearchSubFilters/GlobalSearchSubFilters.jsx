/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from "react";
import {
  globalSearchSubFiltersForPosts,
  globalSearchSubFiltersForUsers,
} from "../../../../Utils/variables/globalSearchSubFilters";

const GlobalSearchSubFilters = ({
  searchOnPostOrUser,
  checkedItems,
  setCheckedItems,
}) => {
  useLayoutEffect(() => {
    if (searchOnPostOrUser === "Post") {
      setCheckedItems(globalSearchSubFiltersForPosts.map((item) => item.id));
    } else {
      setCheckedItems(globalSearchSubFiltersForUsers.map((item) => item.id));
    }
  }, [searchOnPostOrUser]);
  const handleChangeCheckedItem = (filterItem) => {
    if (checkedItems.find((item) => filterItem === item)) {
      setCheckedItems(checkedItems.filter((item) => item !== filterItem));
    } else {
      setCheckedItems([filterItem, ...checkedItems]);
    }
  };
  return (
    <React.Fragment>
      {(searchOnPostOrUser === "Post"
        ? globalSearchSubFiltersForPosts
        : globalSearchSubFiltersForUsers
      ).map((filter) => (
        <React.Fragment key={filter.id}>
          <label htmlFor={filter.id}>
            <input
              type="radio"
              id={filter.id}
              checked={Boolean(checkedItems.find((item) => item === filter.id))}
              onChange={() => handleChangeCheckedItem(filter.id)}
              onClick={() => handleChangeCheckedItem(filter.id)}
            />
            {filter.label}
          </label>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default GlobalSearchSubFilters;
