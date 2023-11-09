/* eslint-disable react/prop-types */
// import React from 'react';

import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";
import useFetch from "../../CustomHooks/useFetch";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({
  setOpenDeleteCategoryModal,
  setOpenEditCategoryModal,
}) => {
  const { data: category } = useFetch("category/all");
  console.log("here come the category", category);

  return (
    <section className="category-card-main-section">
      <h2>All Category</h2>
      <div className="category-card">
        {category?.data?.map((item) => (
          <div key={item?._id} className="category-card-container">
            <div className="category-card-item">
              <div className="category-card-item-child">
                <h3>{item?.categoryName}</h3>
              </div>
              <div className=" category-card-btn modifier-buttons-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setOpenEditCategoryModal(item);
                  }}
                >
                  {" "}
                  <EditIcon />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation;
                    setOpenDeleteCategoryModal(item);
                  }}
                >
                  {" "}
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
