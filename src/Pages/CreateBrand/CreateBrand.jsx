// import React from "react";
import { useState } from "react";
import okIcon from "../../assets/Icons/okIcon.svg";
import "./CreateBrand.css";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import { Input, Select, Spin } from "antd";
import flags from "../../Utils/variables/flags";
import axios from "axios";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import placeholder from "../../assets/Icons/uploadImgIcon.svg";
import TopBar from "../../Components/TopBar/TopBar";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const navigate = useNavigate();
  const [imageShow, setImageShow] = useState("");
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target?.brandPhotoURL?.files[0];
    const name = e.target?.brandName;
    const link = e.target?.brandLink;
    const brandDescription = e.target.brandDescription;

    setIsLoading(true);

    const accessToken = getToken();
    postPhotoAtFirebase(file)
      .then((url) => {
        axios
          .post(
            `${apiUrl}/brand/add`,
            {
              brandPhotoURL: url,
              brandName: name?.value,
              brandLink: link?.value,
              brandDescription: brandDescription?.value,
            },
            {
              headers: {
                Authorization: `bearer ${accessToken}`,
              },
            }
          )
          .then(({ data }) => {
            navigate(`howtouse/${data?.data?._id}`);
          })
          .catch((e) => {
            console.log(e);
            toast.error(e.response.data.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <TopBar pageTitle={"Create New Brand"} />
      <main>
        <section className="edit-store-main3">
          <div className="edit-store-header">
            <h3>Add New Brand</h3>
            <div className="edit-store-img">
              <div className="edit-store-img-green">
                <img src={okIcon} alt="Edit store processing" />
                <p>New brand details</p>
              </div>
              <div></div>
              <div className="edit-store-img-gray">
                <img src={okIcon} alt="Edit store processing" />
                <p>How to use</p>
              </div>
            </div>
          </div>
          <div>
            <Spin spinning={isLoading}>
              <form onSubmit={handleSubmit}>
                <section className="edit-store-details">
                  <div className="edit-store-logo">
                    <label htmlFor="brandPhotoURL" className="uploaded">
                      {imageShow ? (
                        <img src={imageShow} alt="" />
                      ) : (
                        <img
                          className="placeholder-for-howtouse"
                          src={placeholder}
                          alt=""
                        />
                      )}
                    </label>
                    <input
                      required
                      style={{ width: "100%" }}
                      type="file"
                      id="brandPhotoURL"
                      name="brandPhotoURL"
                      onChange={(e) =>
                        setImageShow(URL.createObjectURL(e?.target?.files[0]))
                      }
                    />
                  </div>
                  <div className="edit-store-form">
                    {/* <p>Progress {progress}%</p> */}
                    <div className="store-name-link">
                      <div className="store-name">
                        <label htmlFor="brandName">Brand Name</label>
                        <Input
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
                          placeholder="https://"
                          style={{ width: "100%" }}
                          name="brandLink"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brandDescription">Description</label>
                      <TextArea
                        id="brandDescription"
                        name="brandDescription"
                        style={{
                          height: "138px",
                          resize: "none",
                        }}
                      />
                    </div>
                  </div>
                </section>
                <div className="form-submit-btn-main">
                  {" "}
                  <button className="form-submit-btn" type="submit">
                    Update & Next
                  </button>
                </div>
              </form>
            </Spin>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateBrand;
