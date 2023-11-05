import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import okIcon from "../../assets/Icons/okIcon.svg";
import placeholder from "../../assets/placeholder.webp";
import TopBar from "../../Components/TopBar/TopBar";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import { Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";

const EditStore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageShow, setImageShow] = useState({});
  const [formData, setFormData] = useState({});
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const accessToken = getToken();

    axios
      .get(`${apiUrl}/store/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        const { storeName, storeLink, storeDescription, storePhotoURL } =
          data?.data || {};
        setFormData({
          storeName: storeName || "",
          storeLink: storeLink || "",
          storeDescription: storeDescription || "",
        });
        setImageShow({ url: storePhotoURL || "" });
      })
      .catch((error) => {
        toast.error(`Error: ${error?.response?.data?.message}`);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitUpdatedData = (payload) => {
    axios
      .patch(`${apiUrl}/store/${id}`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(({ data }) => {
        navigate(`/store/edit/howtouse/${id}`);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (imageShow?.files) {
      postPhotoAtFirebase(imageShow.files)
        .then((url) => {
          const { storePhotoURL, ...rest } = formData;
          submitUpdatedData({
            storePhotoURL: url,
            ...rest,
          });
        })
        .catch((error) => {
          toast.error(`Error uploading image: ${error.message}`);
          setSubmitting(false);
        });
    } else {
      submitUpdatedData(formData);
    }
  };

  return (
    <div>
      <TopBar />
      <main>
        <section className="edit-store-main2">
          <div className="edit-store-headers">
            <h3>Edit Store</h3>
            <div className="edit-store-imgs">
              <div className="edit-store-img-green5">
                <img src={okIcon} alt="Edit store processing" />
                <p>New store details</p>
              </div>
              <div className="edit-store-img-gray">
                <img src={okIcon} alt="Edit store processing" />
                <p>How to use</p>
              </div>
            </div>
          </div>

          <Spin spinning={submitting}>
            <form onSubmit={handleSubmit}>
              <section className="edit-store-details2">
                <div className="edit-store-logo">
                  <label htmlFor="storePhotoURL" className="uploaded">
                    {imageShow.url ? (
                      <img src={imageShow.url} alt="" />
                    ) : (
                      <img
                        className="placeholder-for-howtouse"
                        src={placeholder}
                        alt=""
                      />
                    )}
                  </label>
                  <input
                    accept="image/*"
                    value={formData.storePhotoURL}
                    type="file"
                    id="storePhotoURL"
                    name="storePhotoURL"
                    onChange={(e) =>
                      setImageShow({
                        files: e.target.files[0],
                        url: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </div>
                <div className="edit-store-form">
                  <div className="store-name-link">
                    <div className="store-name">
                      <label htmlFor="storeName">Store Name</label>
                      <Input
                        value={formData.storeName}
                        required
                        id="storeName"
                        name="storeName"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="link-div">
                      <label htmlFor="storeLink">Link*</label>
                      <Input
                        required
                        id="storeLink"
                        value={formData.storeLink}
                        placeholder="https://"
                        style={{ width: "100%" }}
                        name="storeLink"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="storeDescription">Description</label>
                    <TextArea
                      id="storeDescription"
                      name="storeDescription"
                      value={formData.storeDescription}
                      style={{
                        height: "138px",
                        resize: "none",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>
              <div className="form-submit-btn-main3">
                <button className="form-submit-btn3" type="submit">
                  Update & Next
                </button>
              </div>
            </form>
          </Spin>
        </section>
      </main>
    </div>
  );
};

export default EditStore;
