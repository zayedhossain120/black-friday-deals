import React, { useEffect, useState } from "react";
import "./EditCampaign.css";
import TopBar from "../../Components/TopBar/TopBar";
import { DatePicker, Input, Select, Spin } from "antd";
import { useParams } from "react-router-dom";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import placeholder from "../../assets/Icons/uploadImgIcon.svg";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import axios from "axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const EditCampaign = () => {
  const { id } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [campaign, setCampaign] = useState({});
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";

  console.log(formData);

  // useEffect(() => {
  //   const accessToken = getToken();

  //   axios
  //     .get(`${apiUrl}/campaign/${id}`, {
  //       headersA: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(({ data }) => {
  //       setCampaign(data);
  //       setFormData();
  //       setImageShow(data?.data?.campaignPhotoURL || "");
  //     })
  //     .catch((error) => {
  //       toast.error(`Error: ${error?.response?.data?.message}`);
  //     });
  // }, [id]);

  // const submitUpdatedData = (e) => {
  //   e.preventDefault();

  //   axios
  //     .patch(`${apiUrl}/campaign/${campaign?.campaignName}`, formData, {
  //       headers: { Authorization: `Bearer ${getToken()}` },
  //     })
  //     .then(({ data }) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     })
  //     .finally(() => {
  //       setSubmitting(false);
  //     });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   if (imageShow?.files) {
  //     postPhotoAtFirebase(imageShow.files)
  //       .then((url) => {
  //         const { photoURL, ...rest } = formData;
  //         submitUpdatedData({
  //           photoURL: url,
  //           ...rest,
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error(`Error uploading image: ${error.message}`);
  //         setSubmitting(false);
  //       });
  //   } else {
  //     submitUpdatedData(formData);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

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
              <form onSubmit="">
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
                      value={formData.campaignPhotoURL}
                      required
                      style={{ width: "100%" }}
                      type="file"
                      id="campaignPhotoURL"
                      name="campaignPhotoURL"
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
                        value={formData?.campaignName}
                        required
                        id="campaignName"
                        name="campaignName"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="datepicker-container">
                      <div className="start-period">
                        <label htmlFor="start-date">Period Start Date</label>
                        <DatePicker
                          value={(formData?.startPeriod, dateFormat)}
                          name="startPeriod"
                          id="startPeriod"
                          placeholder="Start Date"
                          onChange={(value) => {
                            const formattedDate =
                              dayjs(value).format(dateFormat);
                            setFormData({
                              ...formData,
                              startPeriod: formattedDate,
                            });
                          }}
                        />
                      </div>
                      <div className="end-period">
                        <label htmlFor="end-date">Period End Date</label>
                        <DatePicker
                          value={(formData?.endPeriod, dateFormat)}
                          name="endPeriod"
                          id="endPeriod"
                          placeholder="End Date"
                          onChange={(value) => {
                            const formattedDate =
                              dayjs(value).format(dateFormat);
                            setFormData({
                              ...formData,
                              endPeriod: formattedDate,
                            });
                          }}
                        />
                      </div>
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
