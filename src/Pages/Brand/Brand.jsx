import './Brand.css'
import TopBar from "../../Components/TopBar/TopBar";
import { SelectedCountryContext } from "../../Contexts/CountryContext/CountryProviderContext";
import { useContext } from "react";
import useFetchInfinite from "../../CustomHooks/useFetchInfinite";
import BrandCardContainer from "../../Components/BrandCardContainer/BrandCardContainer";

const Brand = () => {
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
      <TopBar navigateTo="/store/create" pageTitle="Brand" />

      <BrandCardContainer
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

export default Brand;
