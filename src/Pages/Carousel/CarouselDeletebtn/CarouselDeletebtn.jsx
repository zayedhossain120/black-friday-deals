/* eslint-disable react/prop-types */
import "./CarouselDeletebtn.css";
import modalDelete from "../../../assets/Icons/modalDelete.svg";
import apiUrl from "../../../Utils/variables/apiUrl";
import getToken from "../../../Utils/getToken";
import { toast } from "react-toastify";
// import deleteIcon from "../../../assets/Icons/modalDelete.svg";

const CarouselDeletebtn = ({ isVisible, onClose, allCarousel }) => {
  if (!isVisible) return null;
  // const [deleteId, setDeleteID] = useState("");
  const handleConfirmDelete = () => {
    const filteredCarousel = allCarousel?.data?.carousel?.filter(
      (carousel) => carousel._id !== isVisible
    );

    fetch(`${apiUrl}/carousel/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ carousel: filteredCarousel }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.warning("Carousel deleted successfully");
        } else {
          toast.error("Failed to delete carousel");
        }
      });
  };

  return (
    <div className="carousel-delete-main-container" onClick={() => onClose()}>
      <div
        className="carousel-delete-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="carousel-delete-content-container">
          <img src={modalDelete} alt="" />
          <p>Are you sure you want to delete the carousel post?</p>
          <div className="carousel-delete-button-container">
            <button className="carousel-delete-btn1 " onClick={() => onClose()}>
              Cancel
            </button>
            <button
              onClick={() => handleConfirmDelete() || onClose()}
              className="carousel-delete-btn2"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselDeletebtn;
