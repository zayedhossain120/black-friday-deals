import { useEffect, useState } from "react";
import "./EditCampaign.css";
import TopBar from "../../Components/TopBar/TopBar";
import { DatePicker, Input, Spin } from "antd";
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
  console.log(campaign, "here comes the campaign");

  useEffect(() => {
    const accessToken = getToken();

    axios
      .get(`${apiUrl}/campaign/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setCampaign(data);
        const { campaignName, startPeriod, endPeriod, campaignPhotoURL } =
          data?.data || {};
        setFormData({
          campaignName: campaignName || "",
          startPeriod: startPeriod || "",
          endPeriod: endPeriod || "",
        });
        setImageShow({ url: campaignPhotoURL || "" });
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
      .patch(`${apiUrl}/campaign/${id}`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Campaign is successfully updated");
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
          const { campaignPhotoURL, ...rest } = formData;
          submitUpdatedData({
            campaignPhotoURL: url,
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

  // for date initial value
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY/MM/DD";

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
                  <div className="edit-store-logo">
                    <label htmlFor="campaignPhotoURL" className="uploaded">
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
                          value={dayjs(formData?.startPeriod, dateFormat)}
                          name="startPeriod"
                          id="startPeriod"
                          placeholder="Start Date"
                          onChange={(value) => {
                            const formattedDate =
                              dayjs(value).format(dateFormat);
                            setFormData({
                              ...formData,
                              expireDate: formattedDate,
                            });
                          }}
                        />
                      </div>
                      <div className="end-period">
                        <label htmlFor="end-date">Period End Date</label>
                        <DatePicker
                          value={dayjs(formData?.endPeriod, dateFormat)}
                          name="endPeriod"
                          id="endPeriod"
                          placeholder="End Date"
                          onChange={(value) => {
                            const formattedDate =
                              dayjs(value).format(dateFormat);
                            setFormData({
                              ...formData,
                              expireDate: formattedDate,
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
