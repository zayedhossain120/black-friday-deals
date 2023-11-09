/* eslint-disable react/prop-types */
// import React from "react";
import "./ProductDealAsidBar.css";
import { useEffect, useState } from "react";
import notAvailable from "../../../../assets/nodataAvailable.png";
import flags from "../../../../Utils/variables/flags";

import { getExpireInAtDays } from "../../../../Utils/variables/formattedDates";
import apiUrl from "../../../../Utils/variables/apiUrl";

const ProductDealAsidBar = ({ productlImage, formData, dataTag, discount }) => {
  // const [asidebar, setAsidebar] = useState(null);
  // const [number1, setNumber1] = useState();
  // const [number2, setNumber2] = useState();
  // const discountedMoney = (oldPrice, discountedPrice) => {
  //   const oldPrices = formData.oldPrice;
  //   console.log("Wowo", oldPrices);
  //   return oldPrices;
  // };
  // useEffect(() => {
  //   fetch()
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAsidebar(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // setAsidebar(error);
  //     });
  // }, []);
  console.log("this is formDtata Name", formData);
  // console.log("this is formData", formData);
  return (
    <aside className="product-deal-aside-main-container">
      {Object.keys(formData).length || productlImage.url ? (
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
                <button onClick={dataTag()}></button>
                <p>{discount} OFF</p>
              </div>
              {/* validity section */}
              <div className="product-deal-aside-details-product-price-expire-day">
                {getExpireInAtDays(formData?.expireDate) < 1 ? (
                  <p>
                    Expire in <strong>0</strong> days
                  </p>
                ) : (
                  <p>
                    Expire in{" "}
                    <strong>{getExpireInAtDays(formData?.expireDate)}</strong>{" "}
                    days
                  </p>
                )}
                {/* {formData?.postType === "deal" && (
          <small className="tooltip display-only-on-mobile">Deal</small>
        )} */}
              </div>
              {/* <p>
              Expire in{" "}
              <span className="product-deal-aside-details-product-price-expire-day">
                14
              </span>{" "}
              days
            </p> */}
            </div>
            <div className="product-deal-asidebar-product-company-name">
              <div>
                {formData?.brand?.brandPhotoURL && (
                  <img src={formData?.brand?.brandPhotoURL} alt="" />
                )}
              </div>
              <p> {formData?.brand?.brandName}</p>
            </div>
            <div className="product-deal-asidebar-product-country-flags">
              {formData.countries?.map((country) => {
                return (
                  <div key={country}>
                    {" "}
                    <img
                      src={
                        flags.find((flag) => flag.countryName === country)
                          .flagUrl
                      }
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-deal-asidebar-discraption">
            <h1>Discription</h1>
            <p>{formData.postDescription}</p>
          </div>
          <div className="product-deal-asidebar-footer">
            <div>
              <p>Available </p>
              <img src={formData?.store?.storePhotoURL} alt="" />
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
      )}
    </aside>
  );
};

export default ProductDealAsidBar;
