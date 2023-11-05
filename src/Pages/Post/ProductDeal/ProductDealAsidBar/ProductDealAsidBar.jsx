/* eslint-disable react/prop-types */
// import React from "react";
import "./ProductDealAsidBar.css";
import { useEffect, useState } from "react";
import notAvailable from "../../../../assets/nodataAvailable.png";
import flags from "../../../../Utils/variables/flags";
import googleicon from "../../../../assets/Icons/googleIcon.png";
import useFetch from "../../../../CustomHooks/useFetch";

const ProductDealAsidBar = ({ productlImage, formData }) => {
  const { data: brand } = useFetch("brand/?limit=1000");
  const [asidebar, setAsidebar] = useState(null);
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        setAsidebar(data);
      });
  }, []);
  console.log("this is Brand Name", brand);
  // console.log("this is formData", formData);
  // const dataTag = () => {
  //   const oldprice = formData.oldprice;
  //   const discountprice = formData.discountprice;
  //   const total = oldprice - discountprice;
  //   return total;
  // };
  return (
    <aside className="product-deal-aside-main-container">
      <h1>this is Aside bar page:</h1>
      {/* {/* {asidebar ? ( */}
      <section className="product-deal-asidebar-data-available-container">
        <div className="product-deal-asidebar-carousel-div">
          <label htmlFor="">Preview</label>
          <div>
            <img src={productlImage.url} alt="" />
          </div>
        </div>
        <div className="product-deal-asidebar-details-container">
          <h1>{formData.postTitle}</h1>
          <div className="product-deal-asidebar-details-product-price">
            <div className="product-deal-asidebar-product-price-dev">
              <h2>
                $ {formData.discountprice}{" "}
                <span className="prduct-deal-asidebar-product-price-delete-span">
                  {" "}
                  - <s>$ {formData.oldprice}</s>
                </span>{" "}
              </h2>
              <p> 75% OFF</p>
            </div>
            <p>
              Expire in{" "}
              <span className="product-deal-aside-details-product-price-expire-day">
                {/* {formData?.expireDate?.map((date) => {
                    <p>{date.expireDate}</p>;
                  })} */}
                14
              </span>{" "}
              days
            </p>
          </div>
          <div className="product-deal-asidebar-product-company-name">
            <div>
              <img src={googleicon} alt="" />
            </div>
            <p> {formData.brandName}</p>
          </div>
          <div className="product-deal-asidebar-product-country-flags">
            {formData.countries?.map((country) => {
              return (
                <div key={country}>
                  {" "}
                  <img
                    src={
                      flags.find((flag) => flag.countryName === country).flagUrl
                    }
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className="product-deal-asidebar-discraption">
          <h1>Discription</h1>
          <p>{formData.postDescription}</p>
        </div>
        <div className="product-deal-asidebar-footer">
          <div>
            <p>Available on</p>
            <img src={googleicon} alt="" />
          </div>
        </div>
      </section>
      ) : (
      <section className="product-deal-asidebar-no-data-available-container">
        <div className="product-deal-asidebar-no-data-available-child">
          <img src={notAvailable} alt="" />
          <h2>No Data Available</h2>
          <p>There is no data to show you right now</p>
        </div>
      </section>
      )
    </aside>
  );
};

export default ProductDealAsidBar;
