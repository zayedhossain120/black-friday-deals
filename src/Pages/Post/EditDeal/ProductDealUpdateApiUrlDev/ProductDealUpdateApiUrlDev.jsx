// import React from 'react';
import "./ProductDealUpdateApiUrlDev.css";
import linkCopy from "../../../../assets/Icons/link.svg";

const ProductDealUpdateApiUrlDev = () => {
  return (
    <section className="product-deal-update-api-url-dev-main-container">
      <div className="product-deal-update-api-url-dev-header">
        <img src={linkCopy} alt="This is Link icon" />
        <p>Enter your API URL</p>
      </div>
      <label className="product-deal-api-url-input-lable">
        <img src={linkCopy} alt="This is Link icon" />
        <input
          // ref={inputRaf}
          type="url"
          name="url"
          id="url"
          placeholder="Paste URL here"
        />
        <button>Fetch Data</button>
      </label>
    </section>
  );
};

export default ProductDealUpdateApiUrlDev;
