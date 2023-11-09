import "./AddNewPost.css";
import { useState } from "react";
import { Checkbox, DatePicker, Input, Select, Spin } from "antd";

import TextArea from "antd/es/input/TextArea";
import flags from "../../../Utils/variables/flags";
// import axios, { Axios, } from "axios";
import useFetch from "../../../CustomHooks/useFetch";
import { Option } from "antd/es/mentions";
import getToken from "../../../Utils/getToken";
import apiUrl from "../../../Utils/variables/apiUrl";
import { toast } from "react-toastify";
import TopBar from "../../../Components/TopBar/TopBar";
import axios from "axios";

const AddNewPost = () => {
  const { data: store } = useFetch("store/all?limit=1000");
  // const { data: brand } = useFetch("brand/?limit=1000");
  const { data: category } = useFetch("category/all?limit=1000");
  const { data: campaign } = useFetch("campaign/all?limit=1000");
  const { data: network } = useFetch("network/?limit=1000");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(formData);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleAddNewPost = async (e) => {
    e.preventDefault();

    const accessToken = getToken();
    console.log(formData);

    try {
      setIsSubmitting(true);
      const { data } = await axios.post(`${apiUrl}/post/add`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data?.success) {
        toast.success("New post added");
        setFormData({});
      } else {
        toast.error("Failed to add new post");
      }
    } catch (error) {
      // console.error("Error:", error);
      console.error("Error:", error);
      toast.error("An error occurred while adding the new post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-new-post-main-container">
      <TopBar pageTitle={"Create New Post"} />
      <div className="create-new-post-container">
        <h1>Create New Coupon</h1>

        <div className="create-posts-items-container">
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleAddNewPost}>
              <div className="create-new-post-items-container">
                <div className="create-new-post-items-container-left">
                  {/* Post title input */}
                  <span>
                    <p>Post Title</p>
                    <Input
                      required
                      id="postTitle"
                      type="text"
                      placeholder="Type post title"
                      style={{ height: "50px", width: "100%" }}
                      value={formData.postTitle}
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
                      placeholder="Select Type"
                      value={formData.postType}
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
                      value={formData.couponCode}
                      onChange={handleInputChange}
                    />
                  </span>
                  {/* select date  */}

                  <div className="date-picker">
                    <p>Expire Date</p>
                    <DatePicker
                      required
                      id="expireDate"
                      style={{ width: "100%" }}
                      value={formData.expireDate}
                      onChange={(value) =>
                        setFormData({ ...formData, expireDate: value })
                      }
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
                      id="store-name"
                      value={formData.networkName}
                      onChange={(value) =>
                        setFormData({ ...formData, networkName: value })
                      }
                    >
                      {network.data?.map((item) => (
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
                <div className="create-new-post-items-container-right">
                  {/* select store name  */}

                  <span>
                    <p>Store Name</p>

                    <Select
                      // style={{ width: "100%" }}
                      className="add-new-post-country-stores-input"
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
                      value={formData.categoryName}
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
                      required={formData?.postType === "Voucher"}
                      type="url"
                      id="dealLink"
                      placeholder="https://"
                      style={{ height: "50px", width: "100%" }}
                      value={formData.dealLink}
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
                      value={formData.campaignName}
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
                      value={formData.countries}
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
                        checked={formData.isVerified}
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
                  value={formData.postDescription}
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

export default AddNewPost;
