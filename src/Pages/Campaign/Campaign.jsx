import React, { useContext } from 'react';
import "./Campaign.css"
import { SelectedCountryContext } from '../../Contexts/CountryContext/CountryProviderContext';
import useFetchInfinite from '../../CustomHooks/useFetchInfinite';
import TopBar from '../../Components/TopBar/TopBar';
import CampaignsCardsContainer from '../../Components/CampaignsCardsContainer/CampaignsCardsContainer';


const Campaign = () => {
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
        <section className="campaign-main-container">
            <TopBar navigateTo='campaigns/create' pageTitle=" Campaigns" />
            
            <CampaignsCardsContainer
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

export default Campaign;