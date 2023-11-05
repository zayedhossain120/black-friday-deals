// import React from "react";
import "./ProductDealApiUrl.css";
import linkCopy from "../../../../assets/Icons/link.svg";
// import { useRef } from "react";

const ProductDealApiUrl = () => {
  // const inputRaf = useRef();

  // const clickForFocus = () => {
  //   inputRaf.current.focus();
  //   focus;
  // onClick={clickForFocus}
  // };
  return (
    <section className="product-deal-api-url-main-container">
      <div className="product-deal-api-url-header">
        <img src={linkCopy} alt="This is Link icon" />
        <p>Enter your API URL</p>
      </div>
      <label className="product-deal-update-api-url-input-lable">
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

export default ProductDealApiUrl;
