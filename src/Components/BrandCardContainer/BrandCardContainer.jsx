/* eslint-disable react/prop-types */
import flags from "../../Utils/variables/flags"
import { useState } from "react";
import EditIcon from "../IconsComponents/EditIcon";
import DeleteIcon from "../IconsComponents/DeleteIcon";
import StoreDeleteModal from "../StoreDeleteModal/StoreDeleteModal";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import MainLoading from "../MainLoading/MainLoading";

const BrandCardContainer = ({
  brandData,
  error,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  refetch,
}) => {
  const navigate = useNavigate();
  const [openDeleteUserModal, setOpenStoreDeleteModal] = useState(false);

  if (!isFetchingNextPage && isFetching) {
    return <MainLoading />;
  }

  if (error || brandData?.status === "failed") {
    return <p>{error?.message || brandData?.message}</p>;
  }
  return (
    <div className="stores-sub-main-container">
      <div className="store-cards-container">
        {brandData?.map((page) =>
          page?.data
            ?.sort((a, b) => (a?.totalPosts > b?.totalPosts ? -1 : 1))
            ?.map((brand) => (

              console.log(brand, 'fkdjlslfdlfj'),
              <div
              key={brand?._id}
                className="individual-store-container"
                onClick={() => navigate(`${brand?._id}/`)}
              >
                <div className="store-image-container">
                  <img src={brand?.brandPhotoURL} alt="" />
                </div>

                <div className="modifier-buttons-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/brands/edit/${brand?._id}`);
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenStoreDeleteModal(brand);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <div className="store-info">
                  <h1>{brand?.brandName}</h1>
                  <div className="country-flags">
                    {brand?.countries?.map((country) => (
                      <img
                        key={country}
                        src={
                          flags.find((flag) => flag?.countryName === country)
                            .flagUrl
                        }
                        alt={country}
                      />
                    ))}
                  </div>
                  <p>offer available {brand?.totalPosts}</p>
                </div>
              </div>
            ))
        )}
      </div>
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
      {openDeleteUserModal && (
        <StoreDeleteModal
          openDeleteUserModal={openDeleteUserModal}
          setOpenStoreDeleteModal={setOpenStoreDeleteModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default BrandCardContainer;
