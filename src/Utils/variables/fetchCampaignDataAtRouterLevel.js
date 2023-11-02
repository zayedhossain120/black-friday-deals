import apiUrl from "./apiUrl";

const fetchCampaignDataAtRouterLevel = (id) => {
  return fetch(`${apiUrl}/campaign/${id}`);
};

export default fetchCampaignDataAtRouterLevel;
