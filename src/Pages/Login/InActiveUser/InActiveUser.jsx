// import React from "react";
import "./InActiveUser.css";
import qrIcon from "../../../assets/Icons/qrIcon.png";
import warning from "../../../assets/Icons/warningIcon.svg";

const InActiveUser = () => {
  return (
    <div className="inactiveuser-page-main-container">
      <div className="inactiveuser-parent">
        <div className="inactiveuser-title">
          <img src={warning} alt="" />
          <h1>You are downgraded</h1>
        </div>

        <p className="inactiveuser-description">
          Very sad! Please contact with{" "}
          <a href="https://www.menacoupon.com">Mena Coupon</a> Administration to
          upgrade your account
        </p>
        {/* <button
          className="Login-btn-section"
          onClick={() => useSignInWithGoogle()}
        >
          <img src={googleIcon} alt="" /> Sign in by Google
        </button> */}
        {/* <span className="Login-warning">
          <img src={warningIcon} alt="" /> Unauthorized email not allowed.
        </span> */}

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

export default InActiveUser;
