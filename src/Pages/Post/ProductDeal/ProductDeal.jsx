// import React from 'react';
import "../../Post/ProductDeal/ProductDeal.css";
import ProductDealApiUrl from "./ProductDealApiUrl/ProductDealApiUrl";
import ProductDealAsidBar from "./ProductDealAsidBar/ProductDealAsidBar";
import ProductInformation from "./ProductInformation/ProductInformation";

const ProductDeal = () => {
  return (
    <main className="product-deal-page-main-container">
      <h1 className="nizam">This is a Product Deal main page</h1>
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
