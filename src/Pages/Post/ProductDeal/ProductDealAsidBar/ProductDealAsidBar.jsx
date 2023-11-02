// import React from "react";
import "./ProductDealAsidBar.css";
import { useEffect, useState } from "react";
import notAvailable from "../../../../assets/nodataAvailable.png";
import motorcaicle from "../../../../assets/Icons/motorcaicle.jpg";
import googleicon from "../../../../assets/Icons/googleIcon.png";
import bahrain from "../../../../assets/Flags/Canada.png";
import egypt from "../../../../assets/Flags/France.png";
import kuwait from "../../../../assets/Flags/Germany.png";
import oman from "../../../../assets/Flags/India.png";
import qatar from "../../../../assets/Flags/Italy.png";
import saudi from "../../../../assets/Flags/Netherlands.png";

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
      {/* <h1>this is Aside bar page:</h1> */}
      {asidebar ? (
        <section className="product-deal-asidebar-data-available-container">
          <div className="product-deal-asidebar-carousel-div">
            <label htmlFor="">Preview</label>
            <div>
              <img src={motorcaicle} alt="" />
            </div>
          </div>
          <div className="product-deal-asidebar-details-container">
            <h1>Nike Pink color Shoes</h1>
            <div className="product-deal-asidebar-details-product-price">
              <div className="product-deal-asidebar-product-price-dev">
                <h2>
                  $200{" "}
                  <span className="prduct-deal-asidebar-product-price-delete-span">
                    {" "}
                    - <s>$700</s>
                  </span>{" "}
                </h2>
                <p> 75% OFF</p>
              </div>
              <p>
                Expire in{" "}
                <span className="product-deal-aside-details-product-price-expire-day">
                  14
                </span>{" "}
                days
              </p>
            </div>
            <div className="product-deal-asidebar-product-company-name">
              <div>
                <img src={googleicon} alt="" />
              </div>
              <p> Nike</p>
            </div>
            <div className="product-deal-asidebar-product-country-flags">
              <img src={bahrain} alt="" />
              <img src={egypt} alt="" />
              <img src={qatar} alt="" />
              <img src={oman} alt="" />
              <img src={saudi} alt="" />
              <img src={kuwait} alt="" />
            </div>
          </div>
          <hr />
          <div className="product-deal-asidebar-discraption">
            <h1>Discription</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              et dolorum dolor consectetur sequi magni delectus incidunt
              distinctio, totam quo soluta provident eligendi reprehenderit in
              maxime at illum fugit accusantium quos architecto, nisi, ipsum eos
              consequatur? Consequuntur voluptate labore nobis repellat. Sunt,
              provident dolore in perspiciatis sequi sapiente porro dignissimos.
              Ex voluptates praesentium eius accusantium excepturi nobis
              cupiditate minus ducimus, rem dolore sint sunt saepe amet
              temporibus? Fugiat maiores numquam fugit officia totam, neque
              praesentium corporis ipsum obcaecati debitis tempora qui
              asperiores ut itaque laborum, aspernatur necessitatibus eos magni
              consequatur quae amet cum eius sapiente? Nemo obcaecati corporis
              numquam laboriosam. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aut inventore culpa ducimus, eum recusandae
              consequatur magnam laborum corporis veniam tenetur? Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Quo itaque quisquam
              possimus, hic corrupti nam assumenda, iure natus ullam perferendis
              saepe quam dolor reprehenderit voluptas molestiae aperiam iusto,
              beatae ducimus.
            </p>
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
      )}
    </aside>
  );
};

export default ProductDealAsidBar;
