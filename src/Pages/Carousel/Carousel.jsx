import "./Carousel.css";
import useFetch from "../../CustomHooks/useFetch";
import { Row } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
import addIcon from "../../assets/Icons/addIcon.svg";
import CarouselModal from "./CarouselModal/CarouselModal";
import { useState } from "react";
import CarouselNavFilter from "./CarouselNavFilter/CarouselNavFilter";
import carouselDelete from "../../assets/Icons/carouselDelete.svg";
import CarouselDeletebtn from "./CarouselDeletebtn/CarouselDeletebtn";
import TopBar from "../../Components/TopBar/TopBar";
// import useFetchInfinite from "../../CustomHooks/useFetchInfinite";
import MainLoading from "../../Components/MainLoading/MainLoading";

const Carousel = () => {
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [showCarouselDelete, setShowCarouselDelete] = useState(false);
  // const {
  //   data: allCarousel,
  //   error,
  //   // hasNextPage,
  //   // fetchNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   refetch,
  // } = useFetchInfinite(`carousel`, "carousel-page-carousels");
  const { data: allCarousel, isLoading, error } = useFetch("carousel");
  if (isLoading) {
    return <MainLoading />;
  }
  // if (!isFetchingNextPage && isFetching) {
  //   return <MainLoading />;
  // }
  if (error || allCarousel?.status === "failed") {
    return <p>{error?.message || allCarousel?.message}</p>;
  }

  return (
    <div>
      <TopBar pageTitle="Carousel" />
      <main>
        <CarouselNavFilter />
        {/* <div className="carousel-navfilter-sticky">
         
        </div> */}
        <div className="carousel-container">
          <Row gutter={[16, 16]} className="carousel-card">
            <>
              {allCarousel?.data?.carousel?.map((item) => (
                <div className="carouselDiv" key={item?._id}>
                  <div>
                    <img src={item?.photoURL} alt="" />
                    <h2>
                      560 <span>clicked</span>
                    </h2>
                  </div>
                  <div className="carousel-delete-btn">
                    <button onClick={() => setShowCarouselDelete(item?._id)}>
                      <img src={carouselDelete} alt="" />
                    </button>
                  </div>
                </div>
              ))}
              {!allCarousel?.data?.Carousel?.length < 4 && (
                <div className="carousel-upload-container">
                  <button
                    className="carousel-upload"
                    onClick={() => setShowCarouselModal(true)}
                  >
                    <div>
                      <img src={addIcon} alt="" />
                      <p>Add Carousel</p>
                    </div>
                  </button>
                  <CarouselModal
                    isVisible={showCarouselModal}
                    onClose={() => setShowCarouselModal(false)}
                  />
                </div>
              )}
            </>
          </Row>
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
