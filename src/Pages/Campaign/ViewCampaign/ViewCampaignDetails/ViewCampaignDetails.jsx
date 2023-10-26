import React from 'react';
import "./ViewCampaignDetails.css"

const ViewCampaignDetails = () => {
    return (
        <div className="view-store-detail-container">
        <section className="view-store-section-container">
          <div className="view-store-left-container">
            <img src={store?.data?.photoURL} alt="" />
            <div className="view-store-name-country-flags">
              <div className="h1Container">
                <h1>{store?.data?.storeName}</h1>
              </div>
              <div className="view-store-country-flags">
                {store?.data?.country?.map((country) => (
                  <img
                    className="store-country-flags-image"
                    key={country}
                    src={
                      flags.find((flag) => flag.countryName === country).flagUrl
                    }
                    title={country}
                    alt={country}
                  />
                ))}
              </div>
            </div>
          </div>
          <hr className="view-store-hr" />
          <div className="view-store-button">
            <p className="shipping-cost-text">
              {store?.data?.description ? store.data.description : ""}
            </p>
            <div className="set-two-button">
              <button className="view-store-first-button">
                <Link
                  to={store?.data?.storeExternalLink.toString()}
                  target="_blank"
                  className="view-store-button-link"
                  rel="noopener noreferrer"
                >
                  <span className="button-text">Store Link</span>
                  <StoreLink />
                </Link>
              </button>
              <button
                className="view-store-second-button"
                onClick={() => navigate(`/store/edit/${id}`)}
              >
                {" "}
                <span className="button-text">Edit</span>
                <EditIconView />
              </button>
            </div>
          </div>
        </section>
      </div>
    );
};

export default ViewCampaignDetails;