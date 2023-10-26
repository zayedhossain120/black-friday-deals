import apiUrl from "./variables/apiUrl";

const fetchStoreDataAtRouterLevel = (id) => {
  return fetch(`${apiUrl}/store/${id}`);
};

export default fetchStoreDataAtRouterLevel;
