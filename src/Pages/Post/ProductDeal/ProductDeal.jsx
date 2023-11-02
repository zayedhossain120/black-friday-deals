// import React from 'react';
import TopBar from "../../../Components/TopBar/TopBar";
import "../../Post/ProductDeal/ProductDeal.css";
import ProductDealApiUrl from "./ProductDealApiUrl/ProductDealApiUrl";
import ProductDealAsidBar from "./ProductDealAsidBar/ProductDealAsidBar";
import ProductInformation from "./ProductInformation/ProductInformation";

const ProductDeal = () => {
  return (
    <main className="product-deal-page-main-container">
      <TopBar pageTitle={"Add new product dea"} />
      <section className="product-deal-information-container">
        <div className="product-deal-information-container-grid">
          <ProductDealApiUrl />
          <ProductInformation />
        </div>
        <div className="product-deal-information-container-asidebar">
          <ProductDealAsidBar />
        </div>
      </section>
    </main>
  );
};

export default ProductDeal;
