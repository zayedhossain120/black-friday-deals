// import React from "react";
import { useState } from "react";
import okIcon from "../../assets/Icons/okIcon.svg";
import "./CreateStore.css";
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

const CreateStore = () => {
  const navigate = useNavigate();
  const [imageShow, setImageShow] = useState("");
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.photoURL?.files[0];
    const name = e.target.name;
    const link = e.target.link;
    const storeDescription = e.target.storeDescription;

    setIsLoading(true);

    const accessToken = getToken();
    postPhotoAtFirebase(file)
      .then((url) => {
        axios
          .post(
            `${apiUrl}/store/add`,
            {
              storePhotoURL: url,
              storeName: name.value,
              storeLink: link.value,
              storeDescription: storeDescription.value,
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
      <TopBar pageTitle={"Create New Store"} />
      <main>
        <section className="edit-store-main3">
          <div className="edit-store-header">
            <h3>Add New Store</h3>
            <div className="edit-store-img">
              <div className="edit-store-img-green">
                <img src={okIcon} alt="Edit store proccessing" />
                <p>New store details</p>
              </div>
              <div></div>
              <div className="edit-store-img-gray">
                <img src={okIcon} alt="Edit store proccessing" />
                <p>How to use</p>
              </div>
            </div>
          </div>
          <div>
            <Spin spinning={isLoading}>
              <form onSubmit={handleSubmit}>
                <section className="edit-store-details">
                  <div className="edit-store-logo">
                    <label htmlFor="photoURL" className="uploaded">
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
                      id="photoURL"
                      name="photoURL"
                      onChange={(e) =>
                        setImageShow(URL.createObjectURL(e.target.files[0]))
                      }
                    />
                  </div>
                  <div className="edit-store-form">
                    {/* <p>Progress {progress}%</p> */}
                    <div className="store-name-link">
                      <div className="store-name">
                        <label htmlFor="name">Store Name</label>
                        <Input
                          required
                          id="name"
                          name="name"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="link-div">
                        {" "}
                        <label htmlFor="link">Link*</label>
                        <Input
                          required
                          id="link"
                          placeholder="https://"
                          style={{ width: "100%" }}
                          name="link"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="storeDescription">Description</label>
                      <TextArea
                        id="storeDescription"
                        name="storeDescription"
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

export default CreateStore;
