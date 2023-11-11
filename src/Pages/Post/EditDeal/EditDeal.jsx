// import React from 'react';
import "./ProductdealUpdate.css";
import { useState } from "react";
import TopBar from "../../../Components/TopBar/TopBar";
// import "../../Post/ProductDeal/ProductDeal.css";
import EiditDealInformationPage from "./EditDealInformationPage/EditDealInformationPage";
import ProductDealUpdateAsideBar from "./ProdcutDealUpdateAsideBar/ProductDealUpdateAsideBar";
import ProductDealUpdateApiUrlDev from "./ProductDealUpdateApiUrlDev/ProductDealUpdateApiUrlDev";

const EditDeal = () => {
  const [productlImage, setProductImage] = useState({});
  const [formData, setFormData] = useState({});
  const [discount, setDiscount] = useState(0);

  const remainderPrice = () => {
    const currentPrice = formData.oldprice;
    const discountPrice = formData.discountprice;
    const remainderPrice = parseInt(currentPrice) - parseInt(discountPrice);

    const discountAmount = ((remainderPrice * 100) / currentPrice).toFixed();
    // if (discountPrice === 0) {
    //   return;
    // }
    setDiscount(discountAmount);
  };
  return (
    <main className="product-deal-update-page-main-container">
      <TopBar pageTitle={"Add new product dea"} />
      <section className="product-deal-update-information-container">
        <div className="product-deal-update-information-container-grid">
          {/* <ProductDealApiUrl /> */}
          {/* <ProductDealInformationUpdate
            productlImage={productlImage}
            setProductImage={setProductImage}
            formData={formData}
            setFormData={setFormData}
          /> */}
          <ProductDealUpdateApiUrlDev />
          <EiditDealInformationPage
            productlImage={productlImage}
            setProductImage={setProductImage}
            formData={formData}
            setFormData={setFormData}
            remainderPrice={remainderPrice}
          />
        </div>
        <div className="product-deal-update-information-container-asidebar">
          <ProductDealUpdateAsideBar
            productlImage={productlImage}
            formData={formData}
            discount={discount}
          />
        </div>
      </section>
    </main>
  );
};

export default EditDeal;
