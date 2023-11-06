import React, { useState } from "react";
import "./CreateCampaign.css";
import TopBar from "../../Components/TopBar/TopBar";
import { DatePicker, Input, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import useSubmitPhotoAtFirebase from "../../Utils/useSubmitPhotoAtFirebase";
import flags from "../../Utils/variables/flags";
import placeholder from "../../assets/Icons/uploadImgIcon.svg";
import apiUrl from "../../Utils/variables/apiUrl";
import getToken from "../../Utils/getToken";
import axios from "axios";
import { toast } from "react-toastify";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [imageShow, setImageShow] = useState("");
  const [selectedCountries, setSelectedCountries] = useState(false);
  const { postPhotoAtFirebase } = useSubmitPhotoAtFirebase();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const file = form.photoURL?.files[0];
    const startPeriod = form.startPeriod.value;
    const endPeriod = form.endPeriod.value;
    const campaignName = form.campaignName.value;
    
    setIsLoading(true);

    const accessToken = getToken();
    postPhotoAtFirebase(file)
      .then((url) => {
        axios
          .post(
            `${apiUrl}/campaign/add`,
            {
              campaignPhotoURL: url,
              campaignName: campaignName.value,
              country: selectedCountries,
              endPeriod: endPeriod.value,

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
      <TopBar pageTitle="Create New Campaign" />
      <main>
        <section className="edit-campaign-main3">
          <div className="edit-campaign-header">
            <h3>Create New Campaign</h3>
          </div>
          <div>
            <Spin spinning={isLoading}>
              <form onSubmit={handleSubmit}>
                <section className="edit-campaign-details">
                  <div className="edit-campaign-logo">
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
                        <label htmlFor="startPeriod">Period Start Date</label>
                        <DatePicker format="DD/MM/YYYY" name="startPeriod" placeholder="Start Date" />
                      </div>
                      <div className="end-period">
                        <label htmlFor="endPeriod">Period End Date</label>
                        <DatePicker format="DD/MM/YYYY" name="endPeriod"  placeholder="End Date" />
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
                    Create new campaign
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

export default CreateCampaign;
