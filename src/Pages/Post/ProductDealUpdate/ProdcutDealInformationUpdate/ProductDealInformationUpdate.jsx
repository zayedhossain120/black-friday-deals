// import React from 'react';
import "./ProductDealInformationUpdate.css";
/* eslint-disable react/prop-types */
// import React from "react";
// import { Spin } from "antd";

import uploadImages from "../../../../assets/Icons/uploadedImages2.svg";
import { DatePicker, Input, Select, Spin } from "antd";
import { Option } from "antd/es/mentions";
import useFetch from "../../../../CustomHooks/useFetch";
import flags from "../../../../Utils/variables/flags";
import TextArea from "antd/es/input/TextArea";
import apiUrl from "../../../../Utils/variables/apiUrl";
import { toast } from "react-toastify";
import getToken from "../../../../Utils/getToken";
import useSubmitPhotoAtFirebase from "../../../../Utils/useSubmitPhotoAtFirebase";
import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import usePostFetch from "../../../../CustomHooks/usePostFetch";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const ProductDealInformationUpdate = ({
  productlImage,
  setProductImage,
  formData,
  setFormData,
}) => {
  const { data: store } = useFetch("store/all?limit=1000");
  const { data: brand } = useFetch("brand/all?limit=1000");
  // const { data: category } = useFetch("category");
  const { data: category } = useFetch("category/?limit=1000");
  const { data: campaign } = useFetch("campaign/all?limit=1000");
  const { postPhotoAtFirebase, progress } = useSubmitPhotoAtFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //===================== update===================
  const { id } = useParams();
  const { Option } = Select;
  const navigate = useNavigate();
  const { fetchPostById } = usePostFetch();
  //===================== update===================
  useLayoutEffect(() => {
    const handlePromise = async () => {
      const storePreviousData = await fetchPostById(id);
      setFormData(storePreviousData?.data);
    };
    handlePromise();
  }, [id]);
  // const [error, setError] = useState(false);

  // console.log("this is store:", store);
  // console.log("this is campaign:", campaign);
  // console.log("this is category:", category);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  // console.log(formData);

  // console.log(formData);
  const handleImageInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = {
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };
      setProductImage(img);
    }
  };
  // console.log("this is productImage", productlImage);
  // handleProductDeal
  const handleProductDeal = (event) => {
    event.preventDefault();
    const accessToken = getToken();
    setIsSubmitting(true);
    if (!productlImage.file) {
      return;
    } else {
      postPhotoAtFirebase(productlImage.file).then((url) => {
        fetch(`${apiUrl}/post/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            postType: "Deal",
            postPhotoURL: url,
            storeName: formData?.store?.storeName,
            brandeName: formData?.brand?.brandName,
            ...formData,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("product deal data is done", data);
            if (data?.success) {
              toast.success(" product deal update success");
              setFormData({});
              setIsSubmitting(false);
              navigate("/post/deals");
            } else {
              toast.error("Failed to add new post");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            toast.error("An error occurred while adding the new post");
          })
          .finally();
      });
    }
  };
  // date ant design problem
  // for date initial value
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  return (
    <section className="product-deal-information-update-main-contaner">
      <Spin spinning={isSubmitting}>
        <h1>Product deal information</h1>
        <form onSubmit={handleProductDeal}>
          <section className="product-deal-form-udpate-container">
            <div className="product-deal-form-update-container-left">
              <div className="produt-deal-information-img-upload-input-update-container">
                <p>Cover Image</p>
                <div className="product-deal-update-information-img-upload-input">
                  <input
                    type="file"
                    // name="photoURL"
                    id="photoURL"
                    onChange={handleImageInput}
                    accept="image/*"
                    // value={formData.photoURL}
                  />
                  <label
                    htmlFor="photoURL"
                    className="product-deal-update-img-upload-lable "
                  >
                    {productlImage || formData?.postPhotoURL ? (
                      <div className="product-deal-update-information-img-top">
                        <img src={formData?.postPhotoURL} alt="" />
                      </div>
                    ) : (
                      <div className="product-deal-update-information-img-button">
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
                  className="product-deal-update-information-brand-input"
                  showSearch
                  required
                  placeholder="Select brand"
                  id="brandName"
                  value={formData?.brand?.brandName}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      brand: brand?.data?.find(
                        (brandData) => brandData.brandName === value
                      ),
                    })
                  }
                >
                  {brand.data?.map((item) => (
                    <Option key={item?.brandName} value={item?.brandName}>
                      {item?.brandName}
                    </Option>
                  ))}
                </Select>
              </label>
              {/* Affiliate  link */}

              <label>
                <p className="all-ant-design-hight-update-control">
                  Affillate Link
                </p>
                <Input
                  required={formData?.postType === "deal"}
                  type="url"
                  id="dealLink"
                  placeholder="https://"
                  style={{ height: "50px", width: "100%" }}
                  value={formData.dealLink}
                  onChange={handleInputChange}
                />
              </label>
              {/* select country */}

              <div>
                <p>Country</p>

                <Select
                  required
                  mode="multiple"
                  className="product-deal-information-update-country-input"
                  value={formData.countries}
                  placeholder={"Select One"}
                  onChange={(value) =>
                    setFormData({ ...formData, countries: value })
                  }
                >
                  {flags.map((flag) => (
                    <>
                      (
                      <Option
                        className="product-deal-information-update-country-input"
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
              </div>
            </div>
            <div className="product-deal-form-update-container-right">
              {/* Product title input */}
              <div>
                <p>Product Title</p>
                <Input
                  required
                  id="postTitle"
                  type="text"
                  placeholder="Type product title"
                  style={{ height: "50px", width: "100%" }}
                  value={formData.postTitle}
                  // onChange={(value) =>
                  //   setFormData({ ...formData, productTitle: value })
                  // }
                  onChange={handleInputChange}
                />
              </div>

              {/* select store name  */}

              <div>
                <p>Store Name</p>

                <Select
                  className="product-deal-information-update-store-input"
                  required
                  showSearch
                  placeholder="Select Store"
                  id="storeName"
                  value={formData?.store?.storeName}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      store: store?.data?.find(
                        (storeData) => storeData.storeName === value
                      ),
                    })
                  }
                >
                  {store?.data?.map((item) => (
                    <Option key={item?.storeName} value={item?.storeName}>
                      {item?.storeName}
                    </Option>
                  ))}
                </Select>
              </div>
              {/* select Category  */}

              <div className="all-ant-design-hight-update-control">
                <p>Category</p>
                <Select
                  required
                  className="product-deal-information-update-category-input"
                  id="post-type"
                  defaultValue="Coupon"
                  value={formData.categoryName}
                  onChange={(value) =>
                    setFormData({ ...formData, categoryName: value })
                  }
                >
                  {category.data?.map((item) => (
                    <Option key={item?.categoryName} value={item?.categoryName}>
                      {item?.categoryName}
                    </Option>
                  ))}
                  {/* <Option value="coupon">Coupon</Option>
            <Option value="deal">Deal</Option> */}
                </Select>
              </div>

              {/* select date  */}

              <div className="date-picker all-ant-design-hight-update-control">
                <p>Expire Date</p>
                <DatePicker
                  value={dayjs(formData?.expireDate, dateFormat)}
                  required
                  style={{ width: "100%" }}
                  id="expireDate"
                  // value={formData.expireDate}
                  onChange={(value) => {
                    const formattedDate = dayjs(value).format(dateFormat);
                    setFormData({ ...formData, expireDate: formattedDate });
                  }}
                ></DatePicker>
              </div>
              {/* select Campaingin name  */}

              <div>
                <p>Campaign</p>

                <Select
                  className="product-deal-information-update-campaingn-input"
                  required
                  showSearch
                  placeholder="Select One"
                  id="campain-name"
                  value={formData?.campaign?.campaignName}
                  onChange={(value) =>
                    setFormData({ ...formData, campaignName: value })
                  }
                >
                  {campaign?.data?.map((item) => (
                    <Option key={item?.campaignName} value={item?.campaignName}>
                      {item?.campaignName}
                    </Option>
                  ))}
                  {/* {campaign?.data?.map((item) => (
              <Option key={item?.campaignName} value={item?.campaignName}>
                {item?.campaignName}
              </Option>
            ))} */}
                </Select>
              </div>
              <div className="product-deal-information-update-old-discount-input">
                {/* Old Price */}
                <div>
                  <p>Old Price</p>
                  <Input
                    required
                    id="oldprice"
                    type="text"
                    placeholder="Old price"
                    style={{ height: "50px", width: "100%" }}
                    value={formData.oldPrice}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Discounted Price */}
                <div>
                  <p>Discounted Price or (%)</p>
                  <Input
                    required
                    id="discountprice"
                    type="text"
                    placeholder="Discounted Price"
                    style={{ height: "50px", width: "100%" }}
                    value={formData.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* post description */}

          <div className="product-deal-information-update-post-description">
            <p>Post Description</p>
            <TextArea
              id="postDescription"
              style={{
                height: "100px",
                resize: "none",
              }}
              placeholder="Type Here...."
              value={formData.postDescription}
              onChange={handleInputChange}
            />
          </div>
          <div className="product-deal-information-update-add-button">
            <button className="Add-product-deal-update-btn" type="submit">
              Add Product Deal
            </button>
          </div>
        </form>
      </Spin>
    </section>
  );
};

export default ProductDealInformationUpdate;
