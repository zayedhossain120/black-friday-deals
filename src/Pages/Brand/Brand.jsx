import "./Brand.css"
import TopBar from "../../Components/TopBar/TopBar";
import { SelectedCountryContext } from "../../Contexts/CountryContext/CountryProviderContext";
import { useContext } from "react";
import useFetchInfinite from "../../CustomHooks/useFetchInfinite";
import BrandCardContainer from "../../Components/BrandCardContainer/BrandCardContainer";

const Brand = () => {
  const country = useContext(SelectedCountryContext);
  const {
    data: brandData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useFetchInfinite(
    `brand/all?country=${country.selectedCountry}&limit=20`,
    "store-page-stores",
    { country: country.selectedCountry }
  );
  return (
    <section className="store-main-container">
      <TopBar navigateTo="/store/create" pageTitle="Brand" />

      <BrandCardContainer
        brandData={brandData}
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
