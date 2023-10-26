import "./Login.css";
import welcoleIcon from "../../assets/Icons/welcoleIcon.svg";
import googleIcon from "../../assets/Icons/googleIcon.png";
import warningIcon from "../../assets/Icons/warning.svg";
import qrIcon from "../../assets/Icons/qrIcon.png";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../Utils/variables/apiUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { checkAuthorization } from "../../Utils/checkAuthorization";

const Login = () => {
  const [country, setCountry] = useState("Bangladesh");
  const [error, setError] = useState(null);
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://ip-api.com/json")
      .then(({ data }) => setCountry(data.country));

    const googleAccessToken = user?.user?.accessToken;

    if (googleAccessToken) {
      axios
        .post(`${apiUrl}/user/login`, {
          country,
          accessToken: googleAccessToken,
        })
        .then(({ data }) => {
          Cookies.set("refreshToken", data?.refreshToken);
          localStorage.setItem("accessToken", data?.data?.accessToken);

          checkAuthorization(data?.data?.accessToken).then((data) => {
            if (data?.data?.email && data?.data?.role !== "inactive") {
              navigate("/");
            } else if (data?.data?.email) {
              navigate("/inactive");
            } else {
              navigate("/secured");
            }
          });
        });
    }
  }, [user?.user?.accessToken, navigate, country]);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <div className="login-page-main-container">
      <div className="frame-parent">
        <div className="login-title">
          <img src={welcoleIcon} alt="" />
          <h1>Welcome Boss</h1>
        </div>

        <p className="login-description">
          Are you from Menacoupon management team? if not please don’t try to
          sign in.
        </p>
        <button
          className="Login-btn-section"
          onClick={() => signInWithGoogle()}
        >
          <img src={googleIcon} alt="" /> Sign in by Google
        </button>
        <span className="Login-warning">
          <img src={warningIcon} alt="" /> Unauthorized email not allowed.
        </span>

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

export default Login;
