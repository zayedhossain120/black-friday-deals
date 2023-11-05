import flags from "../../../../Utils/variables/flags";
import "./ViewBrandDetails.css";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";

// import editIcon from "../../../../assets/Icons/edit.svg";
import StoreLink from "../../../../Components/IconsComponents/StoreLink/StoreLink";
import EditIconView from "../../../../Components/IconsComponents/EditIconView";

const ViewBrandDetails = () => {
  const { id } = useParams();
  const brand = useLoaderData();
  console.log(brand, 'brand');
  const navigate = useNavigate();
  return (
    <div className="view-store-detail-container">
      <section className="view-store-section-container">
        <div className="view-store-left-container">
          <img src={brand?.data?.brandPhotoURL} alt="" />
          <div className="view-store-name-country-flags">
            <div className="h1Container">
              <h1>{brand?.data?.brandName}</h1>
            </div>
            <div className="view-store-country-flags">
              {brand?.data?.country?.map((country) => (
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
        {/* <hr className="view-store-hr" /> */}
        <div className="view-store-button">
          <p className="shipping-cost-text">
            {brand?.data?.description ? brand.data.description : "No descriptions"}
          </p>
          <div className="set-two-button">
            <button className="view-store-first-button">
              <Link
                to={brand?.data?.storeExternalLink?.toString()}
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
              onClick={() => navigate(`/brands/edit/${id}`)}
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

export default ViewBrandDetails;
