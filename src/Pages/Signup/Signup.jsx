import "./Signup.css";

import welcoleIcon from "../../assets/Icons/welcoleIcon.svg";
import googleIcon from "../../assets/Icons/googleIcon.png";
import qrIcon from "../../assets/Icons/qrIcon.png";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import auth from "../../../firebase.init";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../Utils/variables/apiUrl";
import axios from "axios";

const Signup = () => {
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const user = {};
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  // access token setup to the localStorage
  useEffect(() => {
    // get country
    axios
      .get("http://ip-api.com/json")
      .then(({ data }) => setCountry(data.country));
    console.log(user);

    const email = user?.user?.email;
    const displayName = user?.user?.displayName;
    const phoneNumber = user?.user?.phoneNumber;
    const photoURL = user?.user?.photoURL;
    const accessToken = user?.user?.accessToken;
    if (accessToken) {
      axios
        .post(`${apiUrl}/user/signup`, {
          body: {
            name: displayName,
            email,
            country,
            phoneNumber,
            photoURL,
            accessToken,
          },
        })
        .then((res) => console.log(res));
      navigate("/");
    }
  }, [user?.user?.accessToken, navigate, country]);

  return (
    <div className="">
      <div className="frame-parent">
        <div className="login-title">
          <img src={welcoleIcon} alt="" />
          <h1>Welcome Boss</h1>
        </div>

        <p className="login-description">
          Are you from Menacoupon management team?
          <br />
          if not please don’t try to sign in.
        </p>
        <button
          className="Login-btn-section"
          onClick={() => signInWithGoogle()}
        >
          <img src={googleIcon} alt="" /> Signup by Google
        </button>

        <hr />
        <div>
          <h4>Scan QR to download app</h4>
          <img src={qrIcon} alt="" />
        </div>
        <h3>menacoupon.com</h3>
      </div>
    </div>
  );
};

export default Signup;
