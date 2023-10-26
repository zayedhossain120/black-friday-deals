/* eslint-disable react/prop-types */
import { useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MainLoading from "../MainLoading/MainLoading";
import { getAccessTokenFromRefreshToken } from "../../Utils/getAccessTokenFromRefreshToken";
import { getAdministrator } from "../../Utils/getAdministrator";

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useLayoutEffect(() => {
    const checkAuthorization = async () => {
      const administrator = await getAdministrator();
      if (administrator?.data?.email) {
        setIsAuthorized(true);
      } else {
        const isNewAccessTokenSet = await getAccessTokenFromRefreshToken();
        if (isNewAccessTokenSet) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      }
    };

    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    return <MainLoading />;
    // return null;
  } else if (isAuthorized) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default PrivateRoute;
