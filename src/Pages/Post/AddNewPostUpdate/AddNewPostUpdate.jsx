// import React from 'react';
// import "./AddNewPost.css";
import "./AddNewPostUpdate.css";
import { useLayoutEffect, useState } from "react";
import { Checkbox, DatePicker, Input, Select, Spin } from "antd";

import TextArea from "antd/es/input/TextArea";
import flags from "../../../Utils/variables/flags";
import axios from "axios";
import useFetch from "../../../CustomHooks/useFetch";
// import { Option } from "antd/es/mentions";
import getToken from "../../../Utils/getToken";
import apiUrl from "../../../Utils/variables/apiUrl";
import { toast } from "react-toastify";
import TopBar from "../../../Components/TopBar/TopBar";
import usePostFetch from "../../../CustomHooks/usePostFetch";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const AddNewPostUpdate = () => {
  const { data: category } = useFetch("category/?limit=1000");
  const { data: network } = useFetch("network/?limit=1000");
  const { data: campaign } = useFetch("campaign/all?limit=1000");
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const { fetchPostById } = usePostFetch();
  const { data: store } = useFetch("store/all?limit=1000");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("this is form data", formData);

  useLayoutEffect(() => {
    const handlePromise = async () => {
      const storePreviousData = await fetchPostById(id);
      setFormData(storePreviousData?.data);
    };
    handlePromise();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  console.log("this is form data", formData);
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      setIsSubmitting(true);
      const { data } = await axios.patch(`${apiUrl}/post/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data?.success) {
        toast.success("New post Update");
        setFormData({});
      } else {
        toast.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the new post");
    } finally {
      setIsSubmitting(false);
      navigate("/post/");
    }
  };
  // for date initial value
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";
  return (
    <div className="add-new-post-update-main-container">
      <TopBar pageTitle={"Create New Post"} />
      <div className="add-new-post-update-container">
        <h1>Create New Coupon</h1>

        <div className="add-posts-items-update-container">
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleUpdatePost}>
              <div className="add-post-update-items-form-container">
                <div className="add-post-update-form-items-container-left">
                  {/* Post title input */}
                  <span>
                    <p>Post Title</p>
                    <Input
                      required
                      id="postTitle"
                      type="text"
                      placeholder="Type post title"
                      style={{ height: "50px", width: "100%" }}
                      value={formData?.postTitle}
                      onChange={handleInputChange}
                    />
                  </span>
                  {/* select post type  */}

                  <span>
                    <p>Post Type</p>
                    <Select
                      required
                      // style={{ width: "100%" }}
                      className="create-new-coupn-post-type-input"
                      id="post-type"
                      showSearch
                      defaultValue="Coupon"
                      value={formData?.postType}
                      onChange={(value) =>
                        setFormData({ ...formData, postType: value })
                      }
                    >
                      <Option value="Voucher">Voucher</Option>
                      <Option value="Coupon">Coupon</Option>
                    </Select>
                  </span>
                  {/* coupon input */}

                  <span>
                    <p className="ant-design-input-height-control-create-new-post">
                      Coupon Code
                    </p>
                    <Input
                      required={formData?.postType === "coupon"}
                      type="text"
                      placeholder="Input the coupon code"
                      style={{ height: "50px", width: "100%" }}
                      id="couponCode"
                      value={formData?.couponCode}
                      onChange={handleInputChange}
                    />
                  </span>
                  {/* select date  */}

                  <div className="date-picker">
                    <p>Expire Date</p>
                    <DatePicker
                      value={dayjs(formData?.expireDate, dateFormat)}
                      required
                      id="expireDate"
                      style={{ width: "100%" }}
                      // value={formData.expireDate}
                      onChange={(value) => {
                        const formattedDate = dayjs(value).format(dateFormat);
                        setFormData({ ...formData, expireDate: formattedDate });
                      }}
                    ></DatePicker>
                  </div>
                  {/* select Network */}

                  <span>
                    <p>Network</p>

                    <Select
                      // style={{ width: "100%" }}
                      className="add-new-post-country-network-input"
                      required
                      showSearch
                      placeholder="Select Store"
                      id="networkName"
                      value={formData?.network?.networkName}
                      // defaultValue={formData.network?.networkName}
                      onChange={(value) =>
                        setFormData({ ...formData, networkName: value })
                      }
                    >
                      {network?.data?.map((item) => (
                        <Option
                          key={item?.networkName}
                          value={item?.networkName}
                        >
                          {item?.networkName}
                        </Option>
                      ))}
                    </Select>
                  </span>
                </div>
                <div className="add-post-update-form-items-container-right">
                  {/* select store name  */}

                  <span>
                    <p>Store Name</p>

                    <Select
                      // style={{ width: "100%" }}
                      className="add-new-post-country-stores-input"
                      required
                      showSearcha
                      placeholder="Select Store"
                      id="storeName"
                      value={formData?.store?.storeName}
                      onChange={(value) => {
                        const { store, ...reset } = formData;
                        setFormData({
                          storeName: value,
                          ...reset,
                        });
                      }}
                    >
                      {store?.data?.map((item) => (
                        <Option key={item?.storeName} value={item?.storeName}>
                          {item?.storeName}
                        </Option>
                      ))}
                    </Select>
                  </span>
                  {/* select category name  */}

                  <span>
                    <p className="ant-design-input-height-control-create-new-post">
                      Category
                    </p>

                    <Select
                      // style={{ width: "100%" }}
                      className="add-new-post-country-category-input"
                      required
                      showSearch
                      placeholder="Select Store"
                      id="store-name"
                      value={formData?.category?.categoryName}
                      onChange={(value) =>
                        setFormData({ ...formData, categoryName: value })
                      }
                    >
                      {category?.data?.map((item) => (
                        <Option
                          key={item?.categoryName}
                          value={item?.categoryName}
                        >
                          {item?.categoryName}
                        </Option>
                      ))}
                    </Select>
                  </span>
                  {/* set deal link */}

                  <span>
                    <p className="ant-design-input-height-control-create-new-post">
                      Link
                    </p>
                    <Input
                      required={formData?.postType === "dealLink"}
                      type="url"
                      id="dealLink"
                      placeholder="https://"
                      style={{ height: "50px", width: "100%" }}
                      value={formData?.dealLink}
                      onChange={handleInputChange}
                    />
                  </span>
                  {/* select campain  */}

                  <span>
                    <p>Campaign</p>

                    <Select
                      className="add-new-post-country-Campaign-input"
                      required
                      showSearch
                      placeholder="Select Store"
                      id="store-name"
                      value={formData?.campaign?.campaignName}
                      onChange={(value) =>
                        setFormData({ ...formData, campaignName: value })
                      }
                    >
                      {campaign?.data?.map((item) => (
                        <Option
                          key={item?.campaignName}
                          value={item?.campaignName}
                        >
                          {item?.campaignName}
                        </Option>
                      ))}
                    </Select>
                  </span>
                  {/* select country */}
                  <div className="add-new-post-country-select">
                    <p className="ant-design-input-height-control-create-new-post">
                      Country
                    </p>

                    <Select
                      required
                      mode="multiple"
                      className="add-new-post-country-input"
                      // style={{ width: "388px", height: "20%" }}
                      value={formData?.countries}
                      placeholder={"countries"}
                      onChange={(value) =>
                        setFormData({ ...formData, countries: value })
                      }
                    >
                      {flags.map((flag) => (
                        <Option key={flag.countryName} value={flag.countryName}>
                          <img src={flag.flagUrl} alt="" />
                          {flag.countryName}
                          {}
                        </Option>
                      ))}
                    </Select>

                    {/* verify checker */}

                    <div className="code-verify-container">
                      <label htmlFor="isVerified" className="code-verify">
                        Is This Code Verified ?
                      </label>
                      <Checkbox
                        id="isVerified"
                        checked={formData?.isVerified}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isVerified: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* post description */}

              <div className="post-description">
                <p>Post Description</p>
                <TextArea
                  id="postDescription"
                  style={{
                    height: "100px",
                    resize: "none",
                  }}
                  placeholder="Type Here...."
                  value={formData?.postDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="create-new-coupon-btn">
                <button className="add-new-btn" type="submit">
                  Add New Post
                </button>
              </div>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AddNewPostUpdate;
