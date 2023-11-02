import "./Carousel.css";
import useFetch from "../../CustomHooks/useFetch";
import { Row } from "antd";
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

  const groupedData = {};

  // Check if allCarousel.data is available before iterating
  if (allCarousel?.data) {
    allCarousel?.data?.forEach((item) => {
      const country = item.country;
      if (!groupedData[country]) {
        groupedData[country] = [];
      }
      groupedData[country].push(item);
    });
  }

  // console.log(groupedData);

  return (
    <div>
      <TopBar
        openAddNewCarouselModal={openAddNewCarouselModal}
        pageTitle="Carousel"
      />
      <main>
        <CarouselNavFilter />
        <div className="carousel-container">
          {Object.keys(groupedData).map((country) => (
            <div key={country}>
              <p>{country}</p>
              <Row gutter={[16, 16]} className="carousel-card">
                {groupedData?.country?.items?.map(
                  (item) => (
                    console.log(item, "here is the item"),
                    (
                      <div className="carouselDiv" key={item?._id}>
                        <div>
                          <img src={item?.photoURL} alt="" />
                          <h2>
                            560 <span>clicked</span>
                          </h2>
                        </div>
                        <div className="carousel-delete-btn">
                          <button
                            onClick={() => setShowCarouselDelete(item._id)}
                          >
                            <img src={carouselDelete} alt="" />
                          </button>
                        </div>
                      </div>
                    )
                  )
                )}
              </Row>
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
      </main>
    </div>
  );
};

export default Carousel;
