// import React from 'react';
import { useState } from "react";
import TopBar from "../../../Components/TopBar/TopBar";
import "../../Post/ProductDeal/ProductDeal.css";
import ProductDealApiUrl from "./ProductDealApiUrl/ProductDealApiUrl";
import ProductDealAsidBar from "./ProductDealAsidBar/ProductDealAsidBar";
import ProductInformation from "./ProductInformation/ProductInformation";

const ProductDeal = () => {
  const [productlImage, setProductImage] = useState({});
  const [formData, setFormData] = useState({});
  const [discount, setDiscount] = useState(0);
  const dataTag = () => {
    const oldprice = formData.oldprice;
    const discountprice = formData.discountprice;
    const total = Number(oldprice + discountprice);
    setDiscount(total);
  };
  return (
    <main className="product-deal-page-main-container">
      <TopBar pageTitle={"Add new product deal"} />
      <section className="product-deal-information-container">
        <div className="product-deal-information-container-grid">
          <ProductDealApiUrl />
          <ProductInformation
            productlImage={productlImage}
            setProductImage={setProductImage}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="product-deal-information-container-asidebar">
          <ProductDealAsidBar
            productlImage={productlImage}
            formData={formData}
            dataTag={dataTag}
            discount={discount}
          />
        </div>
      </section>
    </main>
  );
};

export default ProductDeal;
