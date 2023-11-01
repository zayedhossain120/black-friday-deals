// import React from "react";
import "./ProductDealAsidBar.css";
import { useEffect, useState } from "react";
import notAvailable from "../../../../assets/nodataAvailable.png";
import motorcaicle from "../../../../assets/Icons/motorcaicle.jpg";

const ProductDealAsidBar = () => {
  const [asidebar, setAsidebar] = useState(null);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        setAsidebar(data);
      });
  }, []);
  // console.log(thisis);
  // const handleImageInput = (e) => {
  //   if (e.target.files && e.target.files[0])
  //     setAsidebar(URL.createObjectURL(e.target.files[0]));
  // };

  return (
    <aside className="product-deal-aside-main-container">
      <h1>this is Aside bar page:</h1>
      {asidebar ? (
        <div className="product-deal-asidebar-data-available-container">
          <div>
            <label htmlFor="">
              <p>Preview</p>
              <img src={motorcaicle} alt="" />
            </label>
          </div>
        </div>
      ) : (
        <section className="product-deal-asidebar-no-data-available-container">
          <div className="product-deal-asidebar-no-data-available-child">
            <img src={notAvailable} alt="" />
            <h2>No Data Available</h2>
            <p>There is no data to show you right now</p>
          </div>
        </section>
      )}
    </aside>
  );
};

export default ProductDealAsidBar;
