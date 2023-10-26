/* eslint-disable react/prop-types */
import { Button, Row, Spin } from "antd";
import { getExpireInAtDays } from "../../Utils/variables/formattedDates";
import { useContext } from "react";
import { SelectedCountryContext } from "../../Contexts/CountryContext/CountryProviderContext";
import useFetchInfinite from "../../CustomHooks/useFetchInfinite";
import MainLoading from "../MainLoading/MainLoading";
import EmptyData from "../EmptyData/EmptyData";
import { hasValidity } from "../../Utils/hasValidity";

const DashboardCard = ({
  sorting,
  selectedStore,
  selectedType,
  selectedDateRange,
}) => {
  const countryContext = useContext(SelectedCountryContext);
  const {
    data: allPost,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useFetchInfinite(
    `post/all?sortBy=${sorting.sortBy}&sortOrder=${sorting.sortOrder}&${
      selectedStore && `storeName=${selectedStore}`
    }&postType=${selectedType}&${selectedDateRange}&country=${
      countryContext?.selectedCountry
    }&${hasValidity()}&limit=20`,
    "dashboard-posts",
    {
      sortBy: sorting.sortBy,
      sortOrder: sorting.sortOrder,
      storeName: selectedStore,
      postType: selectedType,
      selectedDateRange,
      country: countryContext?.selectedCountry,
    }
  );
  if (!isFetchingNextPage && isFetching) {
    return <MainLoading />;
  }
  if (error || allPost?.status === "failed") {
    return <p>{error?.message || allPost?.message}</p>;
  }
  if (!allPost[0]?.data?.length) {
    return <EmptyData />;
  }

  if (error || allPost?.status === "failed") {
    return <p>{error?.message || allPost?.message}</p>;
  }
  return (
    <div className="dashboard-main-container">
      <Row gutter={[16, 16]} className="card-row">
        {allPost?.map((page) =>
          page?.data?.map((item) => (
            <div key={item?._id} className="card">
              <div className="card-head">
                <img className="card-img" src={item?.store?.photoURL} alt="" />

                <div className="card-title">
                  <h3>{item?.postTitle}</h3>
                  <h5>Days Left: {getExpireInAtDays(item?.expireDate)}</h5>
                </div>
              </div>
              <div className="time-clicked">
                Time Clicked <br /> <b>{item?.revealed}</b>
              </div>
            </div>
          ))
        )}
      </Row>
      {hasNextPage && (
        <Button
          style={{
            width: "fit-content",
            display: "block",
            margin: "10px auto",
          }}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage ? (
            <>
              {" "}
              <Spin style={{ marginRight: "10px" }} />
              Loading...
            </>
          ) : (
            <span>Load More</span>
          )}
        </Button>
      )}
    </div>
  );
};

export default DashboardCard;
