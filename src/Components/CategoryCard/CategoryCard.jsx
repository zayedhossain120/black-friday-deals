// import React from 'react';

import { Checkbox } from "antd";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import EditIcon from "../IconsComponents/EditIcon";

// eslint-disable-next-line react/prop-types
const CategoryCard = ({
  setOpenDeleteCategoryModal,
  setOpenEditCategoryModal,
}) => {
  return (
    <section className="category-card-main-section">
      <h2>All Category</h2>
      <div className="category-card">
        <div className="category-card-container">
          <div className="category-card-item">
            <Checkbox className="category-card-item-child" />
            <div className="category-card-item-child">
              <h3>Home & Kitchen</h3>
            </div>
            <div className="category-card-item-child category-card-btn modifier-buttons-container">
              <button
                onClick={(e) => {
                  e.stopPropagation;
                  setOpenEditCategoryModal(true);
                }}
              >
                {" "}
                <EditIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation;
                  setOpenDeleteCategoryModal(true);
                }}
              >
                {" "}
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
