// import React from 'react';
import TopBar from "../../Components/TopBar/TopBar";
import "./Category.css";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import CategoryDeleteModal from "../../Components/CategoryDeleteModal/CategoryDeleteModal";
import EditCategoryCustomModal from "../../Components/EditCategoryCustomModal/EditCategoryCustomModal";
import { useState } from "react";
import AddNewCategoryCustomModal from "../../Components/AddNewCategoryCustomModal/AddNewCategoryCustomModal";

const Category = () => {
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openAddNewCategoryModal, setOpenAddNewCategoryModal] = useState(false);

  return (
    <div className="category-main">
      <TopBar pageTitle="All Categories" />

      <button onClick={(e) => setOpenAddNewCategoryModal(true)}>
        Add New Category
      </button>

      <CategoryCard
        setOpenDeleteCategoryModal={setOpenDeleteCategoryModal}
        setOpenEditCategoryModal={setOpenEditCategoryModal}
      />

      {openDeleteCategoryModal && (
        <CategoryDeleteModal
          openDeleteCategoryModal={openDeleteCategoryModal}
          setOpenDeleteCategoryModal={setOpenDeleteCategoryModal}
        />
      )}
      {openEditCategoryModal && (
        <EditCategoryCustomModal
          openEditCategoryModal={openEditCategoryModal}
          setOpenEditCategoryModal={setOpenEditCategoryModal}
        />
      )}
      {openAddNewCategoryModal && (
        <AddNewCategoryCustomModal
          openAddNewCategoryModal={openAddNewCategoryModal}
          setOpenAddNewCategoryModal={setOpenAddNewCategoryModal}
        />
      )}
    </div>
  );
};

export default Category;
