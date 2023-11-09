import "./Carousel.css";
import useFetch from "../../CustomHooks/useFetch";
import CarouselModal from "./CarouselModal/CarouselModal";
import { useState } from "react";
import CarouselNavFilter from "./CarouselNavFilter/CarouselNavFilter";
import carouselDelete from "../../assets/Icons/carouselDelete.svg";
import CarouselDeletebtn from "./CarouselDeletebtn/CarouselDeletebtn";
import TopBar from "../../Components/TopBar/TopBar";
import MainLoading from "../../Components/MainLoading/MainLoading";

const Carousel = () => {
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [showCarouselDelete, setShowCarouselDelete] = useState(false);

  const openAddNewCarouselModal = () => {
    setShowCarouselModal(true);
  };

  const { data: allCarousel, isLoading, error } = useFetch("carousel");

  if (isLoading) {
    return <MainLoading />;
  }

  if (error || allCarousel?.status === "failed") {
    return <p>{error?.message || allCarousel?.message}</p>;
  }

  return (
    <div>
      <TopBar
        openAddNewCarouselModal={openAddNewCarouselModal}
        pageTitle="Carousel"
      />
      <CarouselNavFilter />

      <div className="carousel-container">
        {allCarousel?.data?.map((countryData) => (
          <div className="carousel-country-section" key={countryData?._id}>
            <h3>{countryData?.country}</h3>
            <div className="carousel-card">
              {countryData?.items?.map((item) => (
                <div className="carouselDiv" key={item?._id}>
                  <div>
                    <img src={item?.photoURL} alt="" />
                    <h2>
                      560 <span>clicked</span>
                    </h2>
                  </div>
                  <div className="carousel-delete-btn modifier-buttons-container">
                    <button onClick={() => setShowCarouselDelete(item._id)}>
                      <img src={carouselDelete} alt="" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <CarouselModal
          isVisible={showCarouselModal}
          onClose={() => setShowCarouselModal(false)}
        />
      </div>
      <CarouselDeletebtn
        isVisible={showCarouselDelete}
        onClose={() => setShowCarouselDelete(false)}
        allCarousel={allCarousel}
      />
    </div>
  );
};

export default Carousel;
