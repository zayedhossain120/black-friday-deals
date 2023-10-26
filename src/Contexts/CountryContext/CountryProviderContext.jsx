/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SelectedCountryContext = createContext();

const CountryProviderContext = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  return (
    <SelectedCountryContext.Provider
      value={{ selectedCountry, setSelectedCountry }}
    >
      {children}
    </SelectedCountryContext.Provider>
  );
};

export default CountryProviderContext;
