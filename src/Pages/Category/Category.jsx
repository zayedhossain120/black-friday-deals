// import React from 'react';
import { Checkbox } from "antd";
import TopBar from "../../Components/TopBar/TopBar";
import "./Category.css";
import EditIcon from "../../Components/IconsComponents/EditIcon";
import DeleteIcon from "../../Components/IconsComponents/DeleteIcon";

const Category = () => {
  return (
    <div className="category-main">
      <TopBar pageTitle="All Categories" />
      <>
        <section className="category-card-main-section">
          <h2>All Category</h2>
          <div className="category-card">
            <div className="category-card-container">
              <div className="category-card-item">
                <Checkbox />
                <div>
                  <h3>Home & Kitchen</h3>
                </div>
                <div className="category-card-btn modifier-buttons-container">
                  <button>
                    {" "}
                    <EditIcon />
                  </button>
                  <button>
                    {" "}
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Category;
