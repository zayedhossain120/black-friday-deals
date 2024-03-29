/* eslint-disable react/prop-types */
import "./CarouselModal.css";
import uploadImages from "../../../assets/Icons/uploadImages.svg";
import { useState } from "react";
import remove from "../../../assets/Icons/remove.svg";
import apiUrl from "../../../Utils/variables/apiUrl";
import axios from "axios";
import useSubmitPhotoAtFirebase from "../../../Utils/useSubmitPhotoAtFirebase";
import getToken from "../../../Utils/getToken";
import useFetch from "../../../CustomHooks/useFetch";
import { toast } from "react-toastify";
import { Spin } from "antd";

const CarouselModal = ({ isVisible, onClose }) => {
  const [carouselImage, setCarouselImage] = useState(null);
  const { postPhotoAtFirebase, progress } = useSubmitPhotoAtFirebase();
  const { data: allCarousel } = useFetch("carousel");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isVisible) return null;

  const handleImageInput = (e) => {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setCarouselImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = e.target.couponCode.value;
    const file = e.target.photoURL.files[0];
    const accessToken = getToken();

    try {
      setIsSubmitting(true);

      const url = await postPhotoAtFirebase(file);

      await axios.post(
        `${apiUrl}/carousel/add`,
        {
          carousel: [
            {
              photoURL: url,
              couponCode: couponCode,
            },
            ...allCarousel.data.carousel,
          ],
        },
        {
          headers: {
            Authorization: `bearer ${accessToken}`,
          },
        }
      );

      toast.success("Carousel Successfully Added");

      form.reset();
      setCarouselImage(null);
    } catch (error) {
      console.error("Error adding carousel:", error);
      toast.error("Failed to add carousel");
    } finally {
      onClose();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="Carosel-modal-container" onClick={() => onClose()}>
      <div className="modal-container">
        <div
          className="modal-content"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="carousel-cancel-btn">
            <p>Add Carousel</p>
            <button onClick={() => onClose()}>
              <img src={remove} alt="" />
            </button>
          </div>
          <div>
            <Spin spinning={isSubmitting}>
              <form onSubmit={handleSubmit}>
                <div className="carousel-image-input">
                  <input
                    accept="image/*"
                    type="file"
                    name="photoURL"
                    id="photoURL"
                    onChange={handleImageInput}
                  />
                  <label htmlFor="photoURL" className="uploaded">
                    {carouselImage ? (
                      <div className="uploadedImg">
                        <img src={carouselImage} alt="" />
                      </div>
                    ) : (
                      <div className="upload-file-other-img">
                        <img src={uploadImages} alt="" />
                        <p>upload File</p>
                      </div>
                    )}
                  </label>
                </div>
                <div className="carousel-coupon">
                  <div className="carousel-coupon1">
                    <label htmlFor="">Coupon Code ( If Any )</label>
                    <input name="couponCode" id="couponCode" type="text" />
                  </div>
                  <div className=" carousel-coupon1">
                    <label htmlFor="">External Link *</label>
                    <input required name="link" id="link" type="text" />
                  </div>
                  <div
                    className="carousel-add-coursel-btn"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <input
                      type="submit"
                      disabled={isSubmiting}
                      className={`disabled-btn $`}
                      value="Add Carousel"
                      id="input-submit"
                    />
                  </div>
                </div>
              </form>
            </Spin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselModal;
