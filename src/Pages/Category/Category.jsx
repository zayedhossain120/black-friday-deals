// import React from 'react';
import { Checkbox } from "antd";
import TopBar from "../../Components/TopBar/TopBar";
import "./Category.css";
import EditIcon from "../../Components/IconsComponents/EditIcon";
import DeleteIcon from "../../Components/IconsComponents/DeleteIcon";
import { useEffect, useState } from "react";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Item from "antd/es/list/Item";
import CategoryDeleteModal from "../../Components/CategoryDeleteModal/CategoryDeleteModal";
import EditCategoryCustomModal from "../../Components/EditCategoryCustomModal/EditCategoryCustomModal";

const Category = () => {
  const [selectMultipleItem, setSelectMultipleItem] = useState([]);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);

  useEffect(() => {
    setSelectMultipleItem([]);
  }, []);
  return (
    <div className="category-main">
      <TopBar pageTitle="All Categories" />
      <CategoryCard
        setOpenDeleteCategoryModal={setOpenDeleteCategoryModal}
        setOpenEditCategoryModal={setOpenEditCategoryModal}
      />

      {selectMultipleItem.length ? <button>Delete all category</button> : ""}

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
    </div>
  );
};

export default Category;
