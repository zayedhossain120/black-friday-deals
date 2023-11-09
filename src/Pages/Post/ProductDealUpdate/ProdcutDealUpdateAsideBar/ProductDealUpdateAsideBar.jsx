import "./ProductDealUpdateAsideBar.css";
/* eslint-disable react/prop-types */
import notAvailable from "../../../../assets/nodataAvailable.png";
import flags from "../../../../Utils/variables/flags";
import { getExpireInAtDays } from "../../../../Utils/variables/formattedDates";

const ProductDealUpdateAsideBar = ({ formData }) => {
  // const [asidebar, setAsidebar] = useState(null);
  // useEffect(() => {
  //   fetch(`https://restcountries.com/v3.1/all`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAsidebar(data);
  //     });
  // }, []);
  // console.log("this is formData", formData);
  // const dataTag = () => {
  //   const oldprice = formData.oldprice;
  //   const discountprice = formData.discountprice;
  //   const total = oldprice - discountprice;
  //   return total;
  // };
  console.log("this is formData", formData);
  return (
    <aside className="product-deal-update-aside-main-container">
      {/* <h1>this is Aside bar page:</h1> */}
      {formData ? (
        <section className="product-deal-asidebar-update-data-available-container">
          <div className="product-deal-asidebar-update-carousel-div">
            <label htmlFor="">Preview</label>
            <div>
              <img src={formData.postPhotoURL} alt="" />
            </div>
          </div>
          <div className="product-deal-asidebar-update-details-container">
            <h1>{formData.postTitle}</h1>
            <div className="product-deal-asidebar-update-details-product-price">
              <div className="product-deal-asidebar-update-product-price-dev">
                <h2>
                  $ {formData.discountprice}{" "}
                  <span className="prduct-deal-asidebar-update-product-price-delete-span">
                    {" "}
                    - <s>$ {formData.oldprice}</s>
                  </span>{" "}
                </h2>
                <p> 75% OFF</p>
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
            </div>
            <div className="product-deal-asidebar-update-product-company-name">
              <div>
                {formData?.brand?.brandPhotoURL && (
                  <img src={formData?.brand?.brandPhotoURL} alt="" />
                )}
              </div>
              <p> {formData?.brand?.brandName}</p>
            </div>
            <div className="product-deal-asidebar-update-product-country-flags">
              {formData?.countries?.map((country) => {
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
          <div className="product-deal-asidebar-update-discraption">
            <h1>Discription</h1>
            <p>{formData?.postDescription}</p>
          </div>
          <div className="product-deal-asidebar-update-footer">
            <div>
              <p>Available on</p>
              <img src={formData?.store?.storePhotoURL} alt="" />
            </div>
          </div>
        </section>
      ) : (
        <section className="product-deal-asidebar-update-no-data-available-container">
          <div className="product-deal-asidebar-update-no-data-available-child">
            <img src={notAvailable} alt="" />
            <h2>No Data Available</h2>
            <p>There is no data to show you right now</p>
          </div>
        </section>
      )}
    </aside>
  );
};

export default ProductDealUpdateAsideBar;
