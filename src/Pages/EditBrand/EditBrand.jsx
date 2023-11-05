import "./EditBrand.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import okIcon from "../../assets/Icons/okIcon.svg";
import flags from "../../Utils/variables/flags";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import TextArea from "antd/es/input/TextArea";
import "../../Pages/CreateStore/CreateStore";
import { Input, Select, Spin } from "antd";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import placeholder from "../../assets/placeholder.webp";
import TopBar from "../../Components/TopBar/TopBar";

const EditStore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageShow, setImageShow] = useState({});
  const [brand, setBrand] = useState({});
  const [formData, setFormData] = useState({});
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const accessToken = getToken();

    axios
      .get(`${apiUrl}/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setBrand(data);
        setFormData({
          brandName: data?.data?.brandName || "",
          // brandPhotoURL: data?.data?.brandPhotoURL || "",
          brandLink: data?.data?.brandLink || "",
          brandDescription: data?.data?.brandDescription || "",
        });
        setImageShow({ url: data?.data?.brandPhotoURL || "" });
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
      .patch(`${apiUrl}/brand/${brand?.data?._id}`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(({ data }) => {
        navigate(`/brands/edit/howtouse/${id}`);
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
          const { brandPhotoURL, ...rest } = formData;
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
            <h3>Edit Brand</h3>
            <div className="edit-store-imgs">
              <div className="edit-store-img-green5">
                <img src={okIcon} alt="Edit store processing" />
                <p>New brand details</p>
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
                  <label htmlFor="brandPhotoURL" className="uploaded">
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
                    value={formData.brandPhotoURL}
                    type="file"
                    id="brandPhotoURL"
                    name="brandPhotoURL"
                    onChange={(e) =>
                      setImageShow({
                        files: e.target.files[0],
                        url: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </div>
                <div className="edit-store-form">
                  {/* <p>Progress {progress}%</p> */}
                  <div className="store-name-link">
                    <div className="store-name">
                      <label htmlFor="brandName">Brand Name</label>
                      <Input
                        value={formData?.brandName}
                        required
                        id="brandName"
                        name="brandName"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="link-div">
                      {" "}
                      <label htmlFor="brandLink">Link*</label>
                      <Input
                        required
                        id="brandLink"
                        value={formData?.brandLink}
                        placeholder="https://"
                        style={{ width: "100%" }}
                        name="brandLink"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description">Description</label>
                    <TextArea
                      id="brandDescription"
                      name="brandDescription"
                      value={formData?.brandDescription}
                      style={{
                        height: "138px",
                        resize: "none",
                      }}
                    />
                  </div>
                </div>
              </section>
              <div className="form-submit-btn-main3">
                {" "}
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