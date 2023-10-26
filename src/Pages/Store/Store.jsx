import "./Store.css";
import TopBar from "../../Components/TopBar/TopBar";
import StoreCardsContainer from "../../Components/StoreCardsContainer/StoreCardsContainer";
import { SelectedCountryContext } from "../../Contexts/CountryContext/CountryProviderContext";
import { useContext } from "react";
import useFetchInfinite from "../../CustomHooks/useFetchInfinite";

const Store = () => {
  const country = useContext(SelectedCountryContext);
  const {
    data: storesData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinite(
    `store/all?country=${country.selectedCountry}&limit=100`,
    "store-page-stores",
    { country: country.selectedCountry }
  );

  return (
    <section className="store-main-container">
      <TopBar navigateTo="/store/create" pageTitle="Stores" />

      <StoreCardsContainer
        storesData={storesData}
        error={error}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        refetch={refetch}
      />
    </section>
  );
};

export default Store;
