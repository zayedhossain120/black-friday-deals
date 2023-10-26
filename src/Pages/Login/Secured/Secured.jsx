import "./Secured.css";
import securedIcon from "../../../assets/Icons/secured.svg";
import qrIcon from "../../../assets/Icons/qrIcon.png";

const Secured = () => {
  return (
    <div className="secured-page-main-container">
      <div className="secured-parent">
        <div className="secured-title">
          <img src={securedIcon} alt="" />
          <h1>Panel is secured</h1>
        </div>

        <p className="inactiveuser-description">
          Very sad! Please contact with{" "}
          <a href="https://www.menacoupon.com">Mena Coupon</a> Administration to
          upgrade your account
        </p>
        <hr />
        <div>
          <h4>Scan QR to download app</h4>
          <img src={qrIcon} alt="" />
        </div>
        <a href="https://www.menacoupon.com">
          <h3>menacoupon.com</h3>
        </a>
      </div>
    </div>
  );
};

export default Secured;
