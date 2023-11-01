// import React from "react";
// import { Spin } from "antd";
import "./ProductInformation.css";
import uploadImages from "../../../../assets/Icons/uploadedImages2.svg";
import { useState } from "react";
import { DatePicker, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import useFetch from "../../../../CustomHooks/useFetch";
import flags from "../../../../Utils/variables/flags";
import TextArea from "antd/es/input/TextArea";

const ProductInformation = () => {
  const { data: store } = useFetch("store/all?limit=1000");
  const [productlImage, setProductImage] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImageInput = (e) => {
    if (e.target.files && e.target.files[0])
      setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <section className="product-deal-information-main-contaner">
      <h1>Product deal information</h1>
      <form action="">
        <section className="product-deal-form-container">
          <div className="product-deal-form-container-left">
            <div className="produt-deal-information-img-upload-input-container">
              <p>Cover Image</p>
              <div className="product-deal-information-img-upload-input">
                <input
                  type="file"
                  name="photoURL"
                  id="photoURL"
                  onChange={handleImageInput}
                  // accept="image/*"
                />
                <label
                  htmlFor="photoURL"
                  className="product-deal-img-upload-lable"
                >
                  {productlImage ? (
                    <div className="product-deal-information-img-top">
                      <img src={productlImage} alt="" />
                    </div>
                  ) : (
                    <div className="product-deal-information-img-button">
                      <img src={uploadImages} alt="" />
                      <p>upload File</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            {/* select Brand name  */}

            <label>
              <p>Brand Name</p>

              <Select
                className="product-deal-information-brand-input"
                // style={{ width: "100%" }}
                showSearch
                required
                placeholder="Select Store"
                id="store-name"
                // value={formData.storeName}
                // onChange={(value) =>
                //   setFormData({ ...formData, storeName: value })
                // }
              >
                {store?.data?.map((item) => (
                  <Option key={item?.storeName} value={item?.storeName}>
                    {item?.storeName}
                  </Option>
                ))}
              </Select>
            </label>
            {/* Affiliate  link */}

            <label>
              <p className="all-ant-design-hight-control">Affillate Link</p>
              <Input
                required={formData?.postType === "deal"}
                type="url"
                id="externalLink"
                placeholder="https://"
                style={{ height: "50px", width: "100%" }}
                // value={formData.externalLink}
                // onChange={handleInputChange}
              />
            </label>
            {/* select country */}

            <label>
              <p>Country</p>

              <Select
                required
                mode="multiple"
                // style={{ width: "100%" }}
                className="product-deal-information-country-input"
                value={formData.country}
                placeholder={"Select One"}
                onChange={(value) =>
                  setFormData({ ...formData, country: value })
                }
              >
                {flags.map((flag) => (
                  <>
                    (
                    <Option
                      className="product-deal-information-country-input"
                      key={flag.countryName}
                      value={flag.countryName}
                    >
                      <img src={flag.flagUrl} alt="" />
                      {flag.countryName}
                    </Option>
                    ),
                  </>
                ))}
              </Select>
            </label>
          </div>
          <div className="product-deal-form-container-right">
            {/* Product title input */}
            <label>
              <p>Product Title</p>
              <Input
                required
                id="Type Post title"
                type="text"
                placeholder="Type post title"
                style={{ height: "50px", width: "100%" }}
                value={formData.postTitle}
                // onChange={handleInputChange}
              />
            </label>

            {/* select store name  */}

            <label>
              <p>Store Name</p>

              <Select
                className="product-deal-information-store-input"
                required
                showSearch
                placeholder="Select Store"
                id="store-name"
                value={formData.storeName}
                onChange={(value) =>
                  setFormData({ ...formData, storeName: value })
                }
              >
                {store?.data?.map((item) => (
                  <Option key={item?.storeName} value={item?.storeName}>
                    {item?.storeName}
                  </Option>
                ))}
              </Select>
            </label>
            {/* select Category  */}

            <label className="all-ant-design-hight-control">
              <p>Category</p>
              <Select
                required
                className="product-deal-information-category-input"
                id="post-type"
                defaultValue="Coupon"
                value={formData.postType}
                onChange={(value) =>
                  setFormData({ ...formData, postType: value })
                }
              >
                <Option value="coupon">Coupon</Option>
                <Option value="deal">Deal</Option>
              </Select>
            </label>

            {/* select date  */}

            <div className="date-picker all-ant-design-hight-control">
              <p>Expire Date</p>
              <DatePicker
                required
                style={{ width: "100%" }}
                id="expireDate"
                value={formData.expireDate}
                onChange={(value) =>
                  setFormData({ ...formData, expireDate: value })
                }
              ></DatePicker>
            </div>
            {/* select Campaingin name  */}

            <span>
              <p>Campaign</p>

              <Select
                className="product-deal-information-campaingn-input"
                required
                showSearch
                placeholder="Select One"
                id="store-name"
                value={formData.storeName}
                onChange={(value) =>
                  setFormData({ ...formData, storeName: value })
                }
              >
                {store?.data?.map((item) => (
                  <Option key={item?.storeName} value={item?.storeName}>
                    {item?.storeName}
                  </Option>
                ))}
              </Select>
            </span>
            <div className="product-deal-information-old-discount-input">
              {/* Old Price */}
              <label>
                <p>Old Price</p>
                <Input
                  required
                  id="oldprice"
                  type="text"
                  placeholder="Old price"
                  style={{ height: "50px", width: "100%" }}
                  value={formData.postTitle}
                  // onChange={handleInputChange}
                />
              </label>
              {/* Discounted Price */}
              <label>
                <p>Discounted Price or (%)</p>
                <Input
                  required
                  id="discountprice"
                  type="text"
                  placeholder="Discounted Price"
                  style={{ height: "50px", width: "100%" }}
                  value={formData.postTitle}
                  // onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
        </section>
        {/* post description */}

        <div className="product-deal-information-post-description">
          <p>Post Description</p>
          <TextArea
            id="postDescription"
            style={{
              height: "100px",
              resize: "none",
            }}
            placeholder="Type Here...."
            value={formData.postDescription}
            // onChange={handleInputChange}
          />
        </div>
        <div className="product-deal-information-add-button">
          <button className="Add-product-deal-btn" type="submit">
            Add Product Deal
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductInformation;
