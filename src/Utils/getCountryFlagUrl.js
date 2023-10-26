import flags from "./variables/flags";

const getCountryFlagUrl = (countryName) => {
  const countryInfo = flags.find((flag) => flag.countryName === countryName);
  return countryInfo ? countryInfo.flagUrl : "";
};

export default getCountryFlagUrl;
