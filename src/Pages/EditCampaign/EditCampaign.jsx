import React, { useEffect, useState } from "react";
import "./EditCampaign.css";
import TopBar from "../../Components/TopBar/TopBar";
import { DatePicker, Input, Select, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import flags from "../../Utils/variables/flags";
import placeholder from "../../assets/Icons/uploadImgIcon.svg";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import axios from "axios";
import { toast } from "react-toastify";

const EditCampaign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [store, setStore] = useState({});
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(false);
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = getToken();

    axios
      .get(`${apiUrl}/campaign/${id}`, {
        headersA: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setStore(data);
        setFormData({
          campaignName: data?.data?.campaignName || "",
          startDate: data?.data?.startDate || "",
          endDate: data?.data?.endDate || "",
          country: data?.data?.country || [],
          description: data?.data?.description || "",
        });
        setImageShow(data?.data?.photoURL || "");
      })
      .catch((error) => {
        toast.error(`Error: ${error?.response?.data?.message}`);
      });
  }, [id]);

  const submitUpdatedData = (payload) => {
    axios
      .put(`${apiUrl}/campaign/${store?.data?._id}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(({ data }) => {
        console.log(data);
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
          const { photoURL, ...rest } = formData;
          submitUpdatedData({
            photoURL: url,
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
      <TopBar pageTitle="Edit Campaign" />
      <main>
        <section className="edit-campaign-main3">
          <div className="edit-campaign-header">
            <h3>Edit Campaign</h3>
          </div>
          <div>
            <Spin spinning={submitting}>
              <form onSubmit={handleSubmit}>
                <section className="edit-campaign-details">
                  <div className="edit-campaign-logo">
                    <label htmlFor="photoURL" className="uploaded">
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
                      value={formData.photoURL}
                      required
                      style={{ width: "100%" }}
                      type="file"
                      id="photoURL"
                      name="photoURL"
                      onChange={(e) =>
                        setImageShow({
                          files: e.target.files[0],
                          url: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                    />
                  </div>

                  <div className="edit-campaign-form">
                    {/* <p>Progress {progress}%</p> */}
                    <div>
                      <label htmlFor="campaignName">Campaign Name</label>
                      <Input
                        required
                        id="campaignName"
                        name="campaignName"
                        style={{ width: "100%" }}
                      />
                    </div>

                    <div className="datepicker-container">
                      <div className="start-period">
                        <label htmlFor="start-date">Period Start Date</label>
                        <DatePicker
                          name="startDate"
                          id="start-date"
                          placeholder="Start Date"
                        />
                      </div>
                      <div className="end-period">
                        <label htmlFor="end-date">Period End Date</label>
                        <DatePicker
                          name="endDate"
                          id="end-date"
                          placeholder="End Date"
                        />
                      </div>
                    </div>

                    <div className="">
                      <label htmlFor="country">Country</label>
                      <Select
                        id="country"
                        className="create-campaign-ant-input1"
                        name="country"
                        mode="multiple"
                        placeholder="Select Country"
                        onChange={(value) => setSelectedCountries(value)}
                        options={flags.map((flag) => {
                          return {
                            label: flag.shortForm,
                            value: flag.countryName,
                          };
                        })}
                      />
                    </div>
                  </div>
                </section>
                <div className="form-submit-btn-main">
                  {" "}
                  <button className="form-submit-btn" type="submit">
                    Update Campaign
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

export default EditCampaign;
