import { useLayoutEffect, useState } from "react";
import { Checkbox, DatePicker, Input, Select, Spin } from "antd";
import "../AddNewPost/AddNewPost.css";
import TextArea from "antd/es/input/TextArea";
import flags from "../../../Utils/variables/flags";
import axios from "axios";
import useFetch from "../../../CustomHooks/useFetch";
import getToken from "../../../Utils/getToken";
import apiUrl from "../../../Utils/variables/apiUrl";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import usePostFetch from "../../../CustomHooks/usePostFetch";
import { postTypes } from "../../../Utils/variables/postTypes";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TopBar from "../../../Components/TopBar/TopBar";

const EditPost = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const { fetchPostById } = usePostFetch();
  const { data: store } = useFetch("store/all?limit=1000");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const accessToken = getToken();

    try {
      setIsSubmitting(true);
      const { data } = await axios.put(`${apiUrl}/post/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (data?.status === "success") {
        console.log(data);
        toast.success("Post is updated");
      } else {
        toast.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the post");
    } finally {
      setIsSubmitting(false);
      navigate("/post/");
    }
  };

  // for date initial value
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";

  return (
    <div className="create-new-post-main-container">
      <TopBar pageTitle={"Edit Post"} />
      <div className="create-new-post-container">
        <h1>Edit Post</h1>

        <div className="create-posts-items-container">
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleUpdatePost}>
              <div className="create-post-items">
                {/* post title start */}
                <span>
                  <p>Post Title</p>
                  <Input
                    id="postTitle"
                    type="text"
                    placeholder="Type post title"
                    style={{ height: "50px", width: "100%" }}
                    value={formData.postTitle}
                    onChange={handleInputChange}
                  />
                </span>

                {/* store name start */}
                <span>
                  <p>Store Name</p>

                  <Select
                    placeholder="Select Store"
                    id="store-name"
                    value={formData?.store?.storeName}
                    style={{ width: "100%" }}
                    onChange={
                      (value) => {
                        const { store, ...rest } = formData;
                        setFormData({ store: value, ...rest });
                      }
                      // setFormData({ storeName: value, ...formData })
                    }
                  >
                    {store?.data?.map((item) => (
                      <Option key={item?.storeName} value={item?._id}>
                        {item?.storeName}
                      </Option>
                    ))}
                  </Select>
                </span>

                {/* post type start */}

                <span>
                  <p>Post Type</p>
                  <Select
                    className="add-new-post-type"
                    id="postType"
                    style={{ width: "100%" }}
                    value={formData?.postType}
                    onChange={(value) =>
                      setFormData({ ...formData, postType: value })
                    }
                  >
                    {postTypes.map((item) => (
                      <Option key={item?.value} value={item?.value}>
                        {item?.label}
                      </Option>
                    ))}
                  </Select>
                </span>

                {/* coupon code start */}

                <span>
                  <p>Coupon Code</p>
                  <Input
                    type="text"
                    placeholder="Input the coupon code"
                    style={{ height: "50px", width: "100%" }}
                    id="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                  />
                </span>

                {/* date picker start */}

                <div className="date-picker">
                  <p>Expire Date</p>

                  <DatePicker
                    value={dayjs(formData.expireDate, dateFormat)}
                    format={dateFormat}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      const formattedDate = dayjs(value).format(dateFormat);
                      setFormData({ ...formData, expireDate: formattedDate });
                    }}
                  />
                </div>

                {/* deal link start */}

                <span>
                  <p>ExternalLink</p>
                  <Input
                    required={formData?.postType === "deal"}
                    type="url"
                    id="externalLink"
                    placeholder="https://"
                    style={{ height: "50px", width: "100%" }}
                    value={formData.externalLink}
                    onChange={handleInputChange}
                  />
                </span>

                {/* post description start  */}

                <div className="post-description">
                  <label htmlFor="post-description">Post Description</label>
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
                {/* country selete start */}

                <div className="add-new-post-country-select">
                  <p>Country</p>
                  <Select
                    mode="multiple"
                    style={{ width: "400px" }}
                    value={formData.country}
                    onChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    {flags.map((flag) => (
                      <Option key={flag.countryName} value={flag.countryName}>
                        {flag.countryName}
                      </Option>
                    ))}
                  </Select>
                  {/* verify symble start */}

                  <div className="code-verify-container">
                    <label htmlFor="isVerified" className="code-verify">
                      Is This Code Verified ?
                    </label>
                    <Checkbox
                      id="isVerified"
                      checked={formData.isVerified}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData({ ...formData, isVerified: isChecked });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="create-new-coupon-btn">
                <button className="add-new-btn" type="submit">
                  Update Post
                </button>
              </div>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
